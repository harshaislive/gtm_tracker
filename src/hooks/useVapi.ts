import { useState, useEffect, useCallback, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Message, VapiMessage, VapiConfig, ConnectionStatus, SpeechStatus, EvaluationState } from '../types/vapi.types';

export const useVapi = (config: VapiConfig) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>('idle');
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluationState, setEvaluationState] = useState<EvaluationState>({
    currentQuestion: null,
    questionNumber: 0,
    totalQuestions: 5, // Based on the evaluation process
    evaluationStep: 'greeting',
    userName: null,
    userEmail: null,
  });
  const messageIdRef = useRef(0);

  const generateMessageId = useCallback(() => {
    return `msg-${Date.now()}-${++messageIdRef.current}`;
  }, []);

  // Parse evaluation state from assistant messages
  const parseEvaluationState = useCallback((content: string) => {
    const lowerContent = content.toLowerCase();
    
    // Check for questions (usually end with ?)
    if (content.includes('?') && !lowerContent.includes('are you done')) {
      const questionMatch = content.match(/([^.!]*\?)/g);
      if (questionMatch) {
        const currentQuestion = questionMatch[questionMatch.length - 1].trim();
        
        setEvaluationState(prev => ({
          ...prev,
          currentQuestion,
          questionNumber: lowerContent.includes('scenario') ? prev.questionNumber + 1 : prev.questionNumber,
          evaluationStep: lowerContent.includes('scenario') ? 'questions' : 
                         lowerContent.includes('name') || lowerContent.includes('email') ? 'validation' :
                         lowerContent.includes('summary') || lowerContent.includes('feedback') ? 'summary' :
                         prev.evaluationStep,
        }));
      }
    }
    
    // Check for greeting
    if (lowerContent.includes('hello') || lowerContent.includes('welcome') || lowerContent.includes('bespoke agent')) {
      setEvaluationState(prev => ({
        ...prev,
        evaluationStep: 'greeting',
        currentQuestion: 'Ready to begin your evaluation?',
      }));
    }
    
    // Check for completion
    if (lowerContent.includes('thank you') && lowerContent.includes('completion')) {
      setEvaluationState(prev => ({
        ...prev,
        evaluationStep: 'complete',
        currentQuestion: null,
      }));
    }
  }, []);

  // Parse user details from messages
  const parseUserDetails = useCallback((content: string, role: 'user' | 'assistant') => {
    if (role === 'user') {
      // Extract email
      const emailMatch = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
      if (emailMatch) {
        const email = emailMatch[0];
        if (email.includes('@beforest.co') || email.includes('@bewild.life')) {
          setEvaluationState(prev => ({
            ...prev,
            userEmail: email,
          }));
        }
      }
      
      // Extract name (simple heuristic)
      if (content.length < 50 && !content.includes('@') && !content.includes('yes') && !content.includes('no')) {
        const possibleName = content.trim();
        if (possibleName.split(' ').length <= 3 && possibleName.length > 2) {
          setEvaluationState(prev => ({
            ...prev,
            userName: possibleName,
          }));
        }
      }
    }
  }, []);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string, inputMethod?: 'voice' | 'text') => {
    const newMessage: Message = {
      id: generateMessageId(),
      role,
      content,
      timestamp: Date.now(),
      inputMethod: inputMethod || (role === 'assistant' ? undefined : 'voice'), // Default to voice for user messages
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Parse evaluation state from assistant messages
    if (role === 'assistant') {
      parseEvaluationState(content);
    }
    
    // Parse user details
    parseUserDetails(content, role);
  }, [generateMessageId, parseEvaluationState, parseUserDetails]);

  // Send text message directly (without voice)
  const sendTextMessage = useCallback(async (textContent: string) => {
    console.log('📤 sendTextMessage called with:', textContent);
    console.log('📤 VAPI instance exists:', !!vapi);
    console.log('📤 Connection status:', connectionStatus);
    
    if (!vapi || connectionStatus !== 'connected') {
      console.log('❌ Cannot send: not connected or no VAPI instance');
      setError('Not connected to voice assistant');
      return;
    }

    try {
      // Add user message to conversation with text input method
      addMessage('user', textContent, 'text');
      
      // Send text message through VAPI 
      // Method 1: Try the send method if available
      if (vapi && typeof (vapi as any).send === 'function') {
        console.log('✅ Using VAPI send method');
        await (vapi as any).send({
          type: 'add-message',
          message: {
            role: 'user',
            content: textContent,
          },
        });
      }
      // Method 2: Try manual message injection
      else if (vapi && typeof (vapi as any).injectMessage === 'function') {
        console.log('✅ Using VAPI injectMessage method');
        await (vapi as any).injectMessage({
          role: 'user',
          content: textContent,
        });
      }
      // Method 3: Try using setUserMessage if available
      else if (vapi && typeof (vapi as any).setUserMessage === 'function') {
        console.log('✅ Using VAPI setUserMessage method');
        (vapi as any).setUserMessage(textContent);
      }
      // Method 4: Try directly calling the assistant API
      else if (vapi && typeof (vapi as any).sendAssistantMessage === 'function') {
        console.log('✅ Using VAPI sendAssistantMessage method');
        (vapi as any).sendAssistantMessage(textContent);
      }
      // Method 5: Fallback - simulate voice transcript
      else {
        console.log('⚠️ Using fallback message simulation');
        
        // Create a simulated transcript message that VAPI can process
        const simulatedMessage = {
          type: 'transcript',
          transcript: textContent,
          role: 'user' as const,
          transcriptType: 'final', // Mark as complete transcript
        };
        
        // Try to emit the message event
        if (vapi && typeof (vapi as any).emit === 'function') {
          (vapi as any).emit('message', simulatedMessage);
        } else {
          // Ultimate fallback: just log and show it in UI
          console.log('🔄 Simulating assistant response to text input');
          // We could add a setTimeout here to simulate an assistant response
          setTimeout(() => {
            addMessage('assistant', `I received your message: "${textContent}". However, text input to VAPI may not be fully supported in this configuration.`, undefined);
          }, 1000);
        }
      }
      
      // Parse user details from text input
      parseUserDetails(textContent, 'user');
      
    } catch (err) {
      console.error('Failed to send text message:', err);
      setError(`Failed to send text message: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [vapi, connectionStatus, addMessage, parseUserDetails]);

  useEffect(() => {
    if (!config.apiKey) {
      setError('VAPI API key is required');
      return;
    }

    if (!config.assistantId) {
      setError('VAPI Assistant ID is required');
      return;
    }

    let vapiInstance: Vapi;
    
    try {
      vapiInstance = new Vapi(config.apiKey);
      setVapi(vapiInstance);
      
      // Debug: Log available methods on VAPI instance
      console.log('🔧 VAPI Instance Methods:', Object.getOwnPropertyNames(vapiInstance));
      console.log('🔧 VAPI Instance Prototype Methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(vapiInstance)));
    } catch (err) {
      console.error('❌ Failed to create VAPI instance:', err);
      setError(`Failed to initialize VAPI: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return;
    }

    // Call lifecycle events
    vapiInstance.on('call-start', () => {
      setConnectionStatus('connected');
      setSpeechStatus('listening');
      setError(null);
    });

    vapiInstance.on('call-end', () => {
      setConnectionStatus('disconnected');
      setSpeechStatus('idle');
      setIsAssistantSpeaking(false);
    });

    vapiInstance.on('error', (error: any) => {
      console.error('❌ VAPI Error:', error);
      setError(`VAPI Error: ${error.message || error}`);
      setConnectionStatus('disconnected');
    });

    // Speech events
    vapiInstance.on('speech-start', () => {
      setSpeechStatus('listening');
    });

    vapiInstance.on('speech-end', () => {
      setSpeechStatus('processing');
    });

    // Message events
    vapiInstance.on('message', (message: VapiMessage) => {
      if (message.type === 'transcript' && message.transcript && message.role) {
        // Only add completed transcripts, not partial ones
        if (message.transcript.trim()) {
          addMessage(message.role, message.transcript);
          
          if (message.role === 'assistant') {
            setIsAssistantSpeaking(true);
            setSpeechStatus('speaking');
            
            // Set a timeout to reset speaking status
            setTimeout(() => {
              setIsAssistantSpeaking(false);
              setSpeechStatus('listening');
            }, 2000);
          }
        }
      }
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [config.apiKey, addMessage]);

  const startCall = useCallback(async () => {
    if (!vapi) {
      setError('VAPI instance not available');
      return;
    }

    if (!config.assistantId) {
      setError('Assistant ID not available');
      return;
    }

    try {
      setConnectionStatus('connecting');
      setError(null);
      await vapi.start(config.assistantId);
    } catch (err) {
      console.error('❌ Failed to start call:', err);
      setError(`Failed to start voice call: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setConnectionStatus('idle');
    }
  }, [vapi, config.assistantId]);

  const endCall = useCallback(() => {
    if (vapi) {
      vapi.stop();
      setConnectionStatus('idle');
      setSpeechStatus('idle');
      setIsAssistantSpeaking(false);
    }
  }, [vapi]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setEvaluationState({
      currentQuestion: null,
      questionNumber: 0,
      totalQuestions: 5,
      evaluationStep: 'greeting',
      userName: null,
      userEmail: null,
    });
  }, []);

  return {
    messages,
    connectionStatus,
    speechStatus,
    isAssistantSpeaking,
    error,
    evaluationState,
    startCall,
    endCall,
    clearMessages,
    sendTextMessage,
    isConnected: connectionStatus === 'connected',
    isConnecting: connectionStatus === 'connecting',
  };
}; 