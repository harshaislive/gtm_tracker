import React from 'react';
import { EvaluationState } from '../types/vapi.types';
import { User, Mail, MessageCircle, CheckCircle } from 'lucide-react';

interface QuestionDisplayProps {
  evaluationState: EvaluationState;
  isConnected: boolean;
  connectionStatus: 'idle' | 'connecting' | 'connected' | 'disconnected';
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  evaluationState,
  isConnected,
  connectionStatus,
}) => {
  const { currentQuestion, questionNumber, totalQuestions, evaluationStep, userName, userEmail } = evaluationState;

  const getStepIcon = () => {
    switch (evaluationStep) {
      case 'greeting':
        return <MessageCircle className="w-5 h-5 text-beforest-warm-yellow" />;
      case 'validation':
        return <User className="w-5 h-5 text-beforest-light-blue" />;
      case 'questions':
        return <MessageCircle className="w-5 h-5 text-beforest-soft-green" />;
      case 'summary':
        return <CheckCircle className="w-5 h-5 text-beforest-coral-orange" />;
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-beforest-soft-green" />;
      default:
        return <MessageCircle className="w-5 h-5 text-beforest-off-white" />;
    }
  };

  const getStepLabel = () => {
    switch (evaluationStep) {
      case 'greeting':
        return 'Welcome & Introduction';
      case 'validation':
        return 'User Validation';
      case 'questions':
        return `Evaluation Question ${questionNumber}`;
      case 'summary':
        return 'Evaluation Summary';
      case 'complete':
        return 'Evaluation Complete';
      default:
        return 'Evaluation';
    }
  };

  const progressPercentage = evaluationStep === 'complete' ? 100 : 
                            evaluationStep === 'summary' ? 90 :
                            evaluationStep === 'questions' ? 30 + (questionNumber / totalQuestions) * 50 :
                            evaluationStep === 'validation' ? 20 : 10;

  return (
    <div className="glass-morphism rounded-3xl p-6 w-full max-w-3xl mx-auto mb-6">
      {/* Header with Progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStepIcon()}
          <span className="text-beforest-off-white font-medium text-sm">
            {getStepLabel()}
          </span>
        </div>
        
        {/* Connection Status */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
          connectionStatus === 'connected' 
            ? 'bg-beforest-soft-green/20 text-beforest-soft-green border border-beforest-soft-green/30'
            : connectionStatus === 'connecting'
            ? 'bg-beforest-warm-yellow/20 text-beforest-warm-yellow border border-beforest-warm-yellow/30'
            : connectionStatus === 'disconnected'
            ? 'bg-beforest-coral-orange/20 text-beforest-coral-orange border border-beforest-coral-orange/30'
            : 'bg-beforest-light-blue/20 text-beforest-light-blue border border-beforest-light-blue/30'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            connectionStatus === 'connected' ? 'bg-beforest-soft-green animate-pulse' :
            connectionStatus === 'connecting' ? 'bg-beforest-warm-yellow animate-pulse' :
            connectionStatus === 'disconnected' ? 'bg-beforest-coral-orange' :
            'bg-beforest-light-blue'
          }`} />
          {connectionStatus === 'connected' ? 'Connected' :
           connectionStatus === 'connecting' ? 'Connecting...' :
           connectionStatus === 'disconnected' ? 'Disconnected' :
           'Ready'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-beforest-off-white/60 mb-2">
          <span>Evaluation Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-beforest-charcoal-gray/30 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-beforest-warm-yellow to-beforest-coral-orange h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* User Details */}
      {(userName || userEmail) && (
        <div className="flex flex-wrap gap-4 mb-6">
          {userName && (
            <div className="flex items-center gap-2 px-3 py-2 bg-beforest-deep-blue/20 rounded-full border border-beforest-light-blue/30">
              <User className="w-4 h-4 text-beforest-light-blue" />
              <span className="text-beforest-off-white text-sm">{userName}</span>
            </div>
          )}
          {userEmail && (
            <div className="flex items-center gap-2 px-3 py-2 bg-beforest-forest-green/20 rounded-full border border-beforest-soft-green/30">
              <Mail className="w-4 h-4 text-beforest-soft-green" />
              <span className="text-beforest-off-white text-sm">{userEmail}</span>
            </div>
          )}
        </div>
      )}

      {/* Current Question */}
      {currentQuestion && (
        <div className="brand-glass-accent rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-beforest-warm-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <MessageCircle className="w-4 h-4 text-beforest-warm-yellow" />
            </div>
            <div className="flex-1">
              <h3 className="text-beforest-off-white font-medium text-sm mb-2">
                Current Question:
              </h3>
              <p className="text-beforest-off-white/90 text-base leading-relaxed">
                {currentQuestion}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation Complete State */}
      {evaluationStep === 'complete' && (
        <div className="text-center py-4">
          <CheckCircle className="w-12 h-12 text-beforest-soft-green mx-auto mb-3" />
          <h3 className="text-beforest-off-white font-medium text-lg mb-2">
            Evaluation Complete!
          </h3>
          <p className="text-beforest-off-white/70 text-sm">
            Thank you for participating in the Bespoke Agent evaluation.
          </p>
        </div>
      )}

      {/* Ready State */}
      {!currentQuestion && evaluationStep === 'greeting' && (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full brand-glass-accent flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-beforest-warm-yellow" />
          </div>
          <h3 className="text-beforest-off-white font-medium text-lg mb-2">
            Bespoke Agent Evaluation
          </h3>
          <p className="text-beforest-off-white/70 text-sm max-w-md mx-auto leading-relaxed">
            Ready to evaluate your communication skills in guiding prospects towards Beforest membership.
          </p>
        </div>
      )}
    </div>
  );
}; 