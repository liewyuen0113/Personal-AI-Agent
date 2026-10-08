import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../../constants/theme';
import Button from '../ui/Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <View style={styles.retryWrapper}>
          <Button label="Retry" variant="secondary" onPress={onRetry} style={styles.retryButton} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxxl,
  },
  message: {
    fontSize: 14,
    color: Colors.danger,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  retryWrapper: {
    width: 160,
  },
  retryButton: {
    width: 160,
  },
});
