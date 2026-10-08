import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Spacing, Radius } from '../../constants/theme';

interface AISuggestionCardProps {
  text: string;
  onAccept: () => void;
  onDismiss: () => void;
}

export default function AISuggestionCard({ text, onAccept, onDismiss }: AISuggestionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.sparkle}>✨</Text>
        <Text style={styles.suggestion}>{text}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onAccept}
          style={styles.acceptButton}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Yes, track it"
        >
          <Text style={styles.acceptText}>Yes, track it</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.dismissButton}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Not now"
        >
          <Text style={styles.dismissText}>Not now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.accentLight,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  sparkle: {
    fontSize: 18,
    marginRight: Spacing.sm,
    lineHeight: 22,
  },
  suggestion: {
    flex: 1,
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.primary,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  acceptButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.sm,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.surface,
  },
  dismissButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.sm,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text2,
  },
});
