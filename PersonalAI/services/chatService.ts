import { ChatMessage, AgentAction, ToolExecution } from '../types';
import { BASE_URL } from './api';

export async function sendMessage(
  content: string,
  userId: string = 'demo-user'
): Promise<{ reply: string; action?: AgentAction; toolExecution?: ToolExecution }> {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: content, user_id: userId }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}
