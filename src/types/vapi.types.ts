export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  inputMethod?: 'voice' | 'text';
}

export interface VapiMessage {
  type: 'transcript' | 'function-call' | 'hang' | 'speech-start' | 'speech-end';
  role?: 'user' | 'assistant';
  transcript?: string;
  functionCall?: {
    name: string;
    parameters: Record<string, unknown>;
  };
}

export interface VapiConfig {
  apiKey: string;
  assistantId: string;
}

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected';
export type SpeechStatus = 'idle' | 'listening' | 'speaking' | 'processing';

// New types for evaluation system
export interface EvaluationState {
  currentQuestion: string | null;
  questionNumber: number;
  totalQuestions: number;
  evaluationStep: 'greeting' | 'validation' | 'questions' | 'summary' | 'complete';
  userName: string | null;
  userEmail: string | null;
}

export interface QuestionProgress {
  current: number;
  total: number;
  percentage: number;
} 