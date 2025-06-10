import { useState, useEffect, useCallback, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Message, VapiMessage, VapiConfig, ConnectionStatus, SpeechStatus } from '../types/vapi.types';

export const useVapi = (config: VapiConfig) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>('idle');
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageIdRef = useRef(0);

  const generateMessageId = useCallback(() => {
    return `msg-${Date.now()}-${++messageIdRef.current}`;
  }, []);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: generateMessageId(),
      role,
      content,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, newMessage]);
  }, [generateMessageId]);

  useEffect(() => {
    if (!config.apiKey) {
      setError('VAPI API key is required');
      return;
    }

    const vapiInstance = new Vapi(config.apiKey);
    setVapi(vapiInstance);

    // Call lifecycle events
    vapiInstance.on('call-start', () => {
      console.log('📞 Call started');
      setConnectionStatus('connected');
      setSpeechStatus('listening');
      setError(null);
    });

    vapiInstance.on('call-end', () => {
      console.log('📞 Call ended');
      setConnectionStatus('disconnected');
      setSpeechStatus('idle');
      setIsAssistantSpeaking(false);
    });

    // Speech events
    vapiInstance.on('speech-start', () => {
      console.log('🎤 User started speaking');
      setSpeechStatus('listening');
    });

    vapiInstance.on('speech-end', () => {
      console.log('🎤 User stopped speaking');
      setSpeechStatus('processing');
    });

    // Message events
    vapiInstance.on('message', (message: VapiMessage) => {
      console.log('📨 Message received:', message);
      
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

    // Error handling
    vapiInstance.on('error', (error: Error) => {
      console.error('❌ VAPI error:', error);
      setError(error.message || 'An error occurred with the voice assistant');
      setConnectionStatus('disconnected');
      setSpeechStatus('idle');
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [config.apiKey, addMessage]);

  const startCall = useCallback(async () => {
    if (!vapi || !config.assistantId) {
      setError('VAPI instance or Assistant ID not available');
      return;
    }

    try {
      setConnectionStatus('connecting');
      setError(null);
      await vapi.start(config.assistantId);
    } catch (err) {
      console.error('Failed to start call:', err);
      setError('Failed to start voice call');
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
  }, []);

  return {
    messages,
    connectionStatus,
    speechStatus,
    isAssistantSpeaking,
    error,
    startCall,
    endCall,
    clearMessages,
    isConnected: connectionStatus === 'connected',
    isConnecting: connectionStatus === 'connecting',
  };
}; 