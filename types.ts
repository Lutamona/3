
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}
