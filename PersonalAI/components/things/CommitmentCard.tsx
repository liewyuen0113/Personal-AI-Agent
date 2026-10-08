import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Commitment } from '../../types/index';
import { Colors, Spacing, Radius, Shadows, MIN_TOUCH_TARGET } from '../../constants/theme';

interface CommitmentCardProps {
  commitment: Commitment;
  onPress?: () => void;
}

export default function CommitmentCard({ commitment, onPress }: CommitmentCardProps) {
  const isOverdue = commitment.status === 'overdue';
  const barColor = isOverdue ? Colors.warning : Colors.accent;

  const inner = (
    <View style={styles.inner}>
      <View style={[styles.leftBar, { backgroundColor: barColor }]} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{commitment.title}</Text>
        {isOverdue ? (
          <Text style={[styles.meta, styles.overdueMeta]}>⚠ Due today</Text>
        ) : (
          <Text style={styles.meta}>{commitment.dueDate}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.text3} style={styles.chevron} />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.75}
        style={styles.card}
        accessibilityRole="button"
      >
        {inner}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{inner}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
  },
  leftBar: {
    width: 3,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text1,
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    color: Colors.text2,
  },
  overdueMeta: {
    color: Colors.warning,
  },
  chevron: {
    marginRight: Spacing.md,
  },
});
