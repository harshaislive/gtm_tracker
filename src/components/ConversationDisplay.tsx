import React, { useEffect, useRef } from 'react';
import { Message } from '../types/vapi.types';
import { Mic, Type } from 'lucide-react';

interface ConversationDisplayProps {
  messages: Message[];
  isAssistantSpeaking: boolean;
}

interface MessageBubbleProps {
  message: Message;
  index: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, index }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'both'
      }}
    >
      <div className={isUser ? 'user-message' : 'assistant-message'}>
        {/* Input Method Indicator for User Messages */}
        {isUser && message.inputMethod && (
          <div className="flex items-center gap-1 mb-1 opacity-60">
            {message.inputMethod === 'voice' ? (
              <Mic className="w-3 h-3" />
            ) : (
              <Type className="w-3 h-3" />
            )}
            <span className="text-xs uppercase tracking-wide">
              {message.inputMethod}
            </span>
          </div>
        )}
        
        <p className="text-beforest-off-white text-xs leading-relaxed m-0">
          {message.content}
        </p>
        
        <span className="text-xs text-beforest-soft-gray/50 mt-1 block opacity-75">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-3">
      <div className="typing-indicator">
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export const ConversationDisplay: React.FC<ConversationDisplayProps> = ({ 
  messages, 
  isAssistantSpeaking 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isAssistantSpeaking]);

  return (
    <div className="glass-morphism rounded-3xl p-5 w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <h2 className="text-beforest-off-white text-lg font-medium text-center">
          Evaluation Conversation
        </h2>
        <p className="text-beforest-off-white/65 text-xs text-center mt-1">
          Voice & text conversation with the Bespoke Agent
        </p>
      </div>
      
      <div 
        ref={scrollRef}
        className="max-h-80 overflow-y-auto custom-scrollbar scrollbar-auto-hide pr-2"
      >
        {messages.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full brand-glass-accent flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-beforest-warm-yellow" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
            </div>
            <p className="text-beforest-off-white/60 text-xs">
              Ready to start your evaluation...
            </p>
            <p className="text-beforest-off-white/40 text-xs mt-1.5">
              <span className="text-beforest-warm-yellow/70">Use voice button or text input below</span>
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                index={index}
              />
            ))}
            {isAssistantSpeaking && <TypingIndicator />}
          </>
        )}
      </div>
    </div>
  );
}; 