import React, { useRef, useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChat } from '../../hooks/useChat';
import {
  MessageBubble,
  TypingIndicator,
  InputBar,
  EmptyState,
} from '../../components';
import { Colors, Spacing } from '../../constants/theme';
import { ChatMessage } from '../../types';

const SUGGESTION_CHIPS = [
  'What do I have today?',
  'Remind me to call Mom',
  'How are my routines?',
  'What did I ask you last week?',
];

export default function ChatScreen() {
  const { messages, isTyping, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    sendMessage(text);
  };

  const handleChipPress = (chip: string) => {
    sendMessage(chip);
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <MessageBubble message={item} />
  );

  const renderListEmpty = () => (
    <View style={styles.emptyContainer}>
      <EmptyState
        icon="☀️"
        title="Good morning, Yu En."
        body="I'm here to help you stay on top of your day."
        chips={SUGGESTION_CHIPS.map((label) => ({
          label,
          onPress: () => handleChipPress(label),
        }))}
      />
    </View>
  );

  const renderListFooter = () => {
    if (!isTyping) return null;
    return <TypingIndicator />;
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>AI</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Personal AI</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Always on</Text>
          </View>
        </View>
      </View>

      {/* Messages + Input */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmpty}
          ListFooterComponent={renderListFooter}
          contentContainerStyle={
            messages.length === 0 ? styles.emptyList : styles.messageList
          }
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputContainer}>
          <InputBar
            value={inputValue}
            onChangeText={setInputValue}
            onSubmit={handleSend}
            placeholder="Message your AI…"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.surface,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.success,
  },
  statusText: {
    fontSize: 12,
    color: Colors.text2,
  },
  messageList: {
    paddingVertical: Spacing.md,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
  },
});
