import React, { useState, useRef, useEffect } from 'react';
import { Send, Type } from 'lucide-react';

interface TextInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  isConnected: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type your response...",
  isConnected,
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && isConnected) {
      console.log('🔤 TextInput: Sending message:', message.trim());
      console.log('🔤 Connection status:', isConnected);
      console.log('🔤 Disabled status:', disabled);
      onSendMessage(message.trim());
      setMessage('');
    } else {
      console.log('🔤 TextInput: Cannot send message', {
        hasMessage: !!message.trim(),
        disabled,
        isConnected
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-focus when connected
  useEffect(() => {
    if (isConnected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isConnected]);

  const canSend = message.trim() && !disabled && isConnected;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Simplified - removed the "alternative" label */}

      {/* Input Container */}
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          glass-morphism rounded-2xl p-3 transition-all duration-300 ease-out
          ${isFocused ? 'ring-2 ring-beforest-light-blue/60 shadow-lg shadow-beforest-light-blue/20' : ''}
          ${!isConnected ? 'opacity-60 pointer-events-none' : ''}
        `}>
          <div className="flex items-center gap-3">
            {/* Input Icon */}
            <Type className={`w-4 h-4 transition-colors ${
              isFocused ? 'text-beforest-light-blue' : 'text-beforest-off-white/60'
            }`} />
            
            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isConnected ? placeholder : "Connect first to enable text input..."}
              disabled={disabled || !isConnected}
              className={`
                flex-1 bg-transparent text-beforest-off-white 
                placeholder:text-beforest-off-white/70 placeholder:font-medium
                border-none outline-none text-sm leading-relaxed
                ${disabled || !isConnected ? 'cursor-not-allowed' : ''}
              `}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!canSend}
              className={`
                flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200
                ${canSend 
                  ? 'bg-beforest-light-blue/30 hover:bg-beforest-light-blue/40 text-beforest-light-blue hover:scale-105 cursor-pointer shadow-sm' 
                  : 'bg-beforest-charcoal-gray/30 text-beforest-charcoal-gray/60 cursor-not-allowed'
                }
              `}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Enhanced Status Bar */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-beforest-off-white/10">
            <div className="flex items-center gap-3">
              {/* Connection Status */}
              <div className={`flex items-center gap-1.5 text-xs ${
                isConnected ? 'text-beforest-soft-green' : 'text-beforest-coral-orange'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  isConnected ? 'bg-beforest-soft-green animate-pulse' : 'bg-beforest-coral-orange'
                }`} />
                <span className="font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              {/* Input Status */}
              {isConnected && (
                <span className={`text-xs ${
                  disabled ? 'text-beforest-warm-yellow' : 'text-beforest-off-white/50'
                }`}>
                  {disabled ? '• Voice active' : '• Ready to type'}
                </span>
              )}
            </div>
            
            {/* Character Count */}
            <span className={`text-xs font-medium ${
              message.length > 400 ? 'text-beforest-coral-orange' : 
              message.length > 200 ? 'text-beforest-warm-yellow' : 
              'text-beforest-off-white/40'
            }`}>
              {message.length}/500
            </span>
          </div>
        </div>

        {/* Simplified Helper Text */}
        {isConnected && !disabled && (
          <p className="text-center text-xs text-beforest-off-white/40 mt-2">
            <kbd className="px-1.5 py-0.5 bg-beforest-off-white/10 rounded text-xs">Enter</kbd> to send
          </p>
        )}
      </form>
    </div>
  );
}; 