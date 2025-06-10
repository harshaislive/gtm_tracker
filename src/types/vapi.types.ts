export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
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