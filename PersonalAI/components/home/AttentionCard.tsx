import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Chip, { ChipVariant } from '../ui/Chip';
import { Colors, Spacing, Radius, Shadows, MIN_TOUCH_TARGET } from '../../constants/theme';

interface AttentionCardProps {
  title: string;
  meta: string;
  chipVariant: ChipVariant;
  chipLabel: string;
  borderColor: string;
  onPress?: () => void;
}

export default function AttentionCard({
  title,
  meta,
  chipVariant,
  chipLabel,
  borderColor,
  onPress,
}: AttentionCardProps) {
  const inner = (
    <View style={styles.inner}>
      <View style={[styles.leftBorder, { backgroundColor: borderColor }]} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.meta} numberOfLines={1}>{meta}</Text>
      </View>
      <Chip label={chipLabel} variant={chipVariant} />
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
    paddingRight: Spacing.md,
  },
  leftBorder: {
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
});
