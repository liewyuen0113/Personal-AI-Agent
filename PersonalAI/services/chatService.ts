import { ChatMessage } from '../types';
import { mockChatMessages } from '../data/mockData';

// TODO: Replace with: return fetch(`${BASE_URL}/chat`, { method: 'POST', body: JSON.stringify({ content }), headers: { 'Content-Type': 'application/json' } })

export function getMessages(): Promise<ChatMessage[]> {
  return Promise.resolve([...mockChatMessages]);
}

export function sendMessage(content: string): Promise<ChatMessage> {
  const mockReply: ChatMessage = {
    id: `msg_${Date.now()}`,
    role: 'ai',
    content: "I've noted that. Is there anything else you'd like me to help you with?",
    timestamp: new Date().toISOString(),
  };

  return new Promise((resolve) => setTimeout(() => resolve(mockReply), 1500));
}
