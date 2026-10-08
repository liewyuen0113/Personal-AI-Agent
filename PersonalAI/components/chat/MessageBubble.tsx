import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChatMessage } from '../../types/index';
import { Colors, Spacing, Radius } from '../../constants/theme';
import ActionCard from './ActionCard';
import ToolExecutionCard from './ToolExecutionCard';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  // Tool execution messages: no text bubble, just the tool card
  if (message.toolExecution) {
    return (
      <View style={[styles.row, styles.aiRow]}>
        <View style={styles.aiAvatar}>
          <Text style={styles.aiAvatarText}>AI</Text>
        </View>
        <View style={styles.aiContent}>
          <ToolExecutionCard
            title={message.toolExecution.title}
            steps={message.toolExecution.steps}
          />
        </View>
      </View>
    );
  }

  if (isUser) {
    return (
      <View style={[styles.row, styles.userRow]}>
        <View style={[styles.bubble, styles.userBubble]}>
          <Text style={styles.userText}>{message.content}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.row, styles.aiRow]}>
      <View style={styles.aiAvatar}>
        <Text style={styles.aiAvatarText}>AI</Text>
      </View>
      <View style={styles.aiContent}>
        <View style={[styles.bubble, styles.aiBubble]}>
          <Text style={styles.aiText}>{message.content}</Text>
        </View>
        {message.action && <ActionCard action={message.action} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: Radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '78%',
  },
  userBubble: {
    backgroundColor: Colors.accent,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  userText: {
    fontSize: 15,
    color: Colors.surface,
    lineHeight: 22,
  },
  aiText: {
    fontSize: 15,
    color: Colors.text1,
    lineHeight: 22,
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4338CA', // indigo-700 per design
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  aiAvatarText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.surface,
  },
  aiContent: {
    flex: 1,
    maxWidth: '85%',
  },
});
