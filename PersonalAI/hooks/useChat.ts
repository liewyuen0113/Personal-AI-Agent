import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';
import * as chatService from '../services/chatService';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    // Immediately append user message
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiReply = await chatService.sendMessage(text);
      setMessages((prev) => [...prev, aiReply]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isTyping, sendMessage, clearMessages };
}
