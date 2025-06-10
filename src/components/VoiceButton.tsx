import React from 'react';
import { Mic, MicOff, Phone } from 'lucide-react';
import { ConnectionStatus, SpeechStatus } from '../types/vapi.types';

interface VoiceButtonProps {
  connectionStatus: ConnectionStatus;
  speechStatus: SpeechStatus;
  onStartCall: () => void;
  onEndCall: () => void;
  isAssistantSpeaking: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  connectionStatus,
  speechStatus,
  onStartCall,
  onEndCall,
  isAssistantSpeaking,
}) => {
  const isConnected = connectionStatus === 'connected';
  const isConnecting = connectionStatus === 'connecting';
  const isListening = speechStatus === 'listening';
  const isSpeaking = speechStatus === 'speaking';
  
  const getButtonColor = () => {
    if (isConnecting) return 'bg-beforest-warm-yellow/20 border-beforest-warm-yellow/40';
    if (isConnected && isSpeaking) return 'bg-beforest-rich-red/20 border-beforest-coral-orange/40';
    if (isConnected && isListening) return 'bg-beforest-forest-green/20 border-beforest-soft-green/40';
    if (isConnected) return 'bg-beforest-deep-blue/20 border-beforest-light-blue/40';
    return 'bg-beforest-dark-earth/20 border-beforest-off-white/40';
  };

  const getIconColor = () => {
    if (isConnecting) return 'text-beforest-warm-yellow';
    if (isConnected && isSpeaking) return 'text-beforest-coral-orange';
    if (isConnected && isListening) return 'text-beforest-soft-green';
    if (isConnected) return 'text-beforest-light-blue';
    return 'text-beforest-off-white';
  };



  const renderIcon = () => {
    if (isConnecting) {
      return <Phone className="w-8 h-8" />;
    }
    
    if (isConnected) {
      if (isSpeaking || isAssistantSpeaking) {
        return <MicOff className="w-8 h-8" />;
      }
      return <Mic className="w-8 h-8" />;
    }
    
    return <Mic className="w-8 h-8" />;
  };

  const handleClick = () => {
    if (isConnected) {
      onEndCall();
    } else if (!isConnecting) {
      onStartCall();
    }
  };

  return (
    <div className="relative">
      {/* Ripple Effects */}
      {isListening && (
        <>
          <div 
            className="voice-ripple" 
            style={{ 
              animationDelay: '0s',
              borderColor: 'rgba(52, 71, 54, 0.4)'
            }} 
          />
          <div 
            className="voice-ripple" 
            style={{ 
              animationDelay: '0.5s',
              borderColor: 'rgba(52, 71, 54, 0.3)'
            }} 
          />
          <div 
            className="voice-ripple" 
            style={{ 
              animationDelay: '1s',
              borderColor: 'rgba(52, 71, 54, 0.2)'
            }} 
          />
        </>
      )}
      
      {/* Main Button */}
      <button
        onClick={handleClick}
        disabled={isConnecting}
        className={`
          relative glass-button rounded-full p-6 
          ${getButtonColor()}
          ${getIconColor()}
          ${isConnecting ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
          ${isListening ? 'animate-pulse-slow' : ''}
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          disabled:hover:scale-100 disabled:active:scale-100
        `}
      >
        <div className={`transition-all duration-200 ${isConnecting ? 'animate-spin' : ''}`}>
          {renderIcon()}
        </div>
        
        {/* Status indicator dot */}
        <div 
          className={`
            absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-beforest-off-white/50
            ${isConnected ? 'bg-beforest-soft-green' : isConnecting ? 'bg-beforest-warm-yellow' : 'bg-beforest-charcoal-gray'}
            ${isConnected || isConnecting ? 'animate-pulse' : ''}
          `}
        />
      </button>
      
      {/* Status Text */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className="text-beforest-off-white/80 text-sm font-medium">
          {isConnecting && 'Connecting...'}
          {isConnected && isSpeaking && 'Assistant Speaking'}
          {isConnected && isListening && 'Listening...'}
          {isConnected && speechStatus === 'processing' && 'Processing...'}
          {!isConnected && !isConnecting && 'Tap to Talk'}
        </span>
      </div>
    </div>
  );
}; 