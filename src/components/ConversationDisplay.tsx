import React, { useEffect, useRef } from 'react';
import { Message } from '../types/vapi.types';

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
          GTM Command Center
        </h2>
        <p className="text-beforest-off-white/65 text-xs text-center mt-1">
          Speak your Trello commands and GTM tasks
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <p className="text-beforest-off-white/60 text-xs">
              Ready for GTM commands...
            </p>
            <p className="text-beforest-off-white/40 text-xs mt-1.5 space-x-1">
              <span className="text-beforest-warm-yellow/70">Try:</span>
              <span>"Add task"</span>
              <span>•</span>
              <span>"Update status"</span>
              <span>•</span>
              <span>"Show progress"</span>
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