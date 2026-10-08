import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors, Radius, Shadows, MIN_TOUCH_TARGET } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  leftAccentColor?: string;
}

export default function Card({ children, style, onPress, leftAccentColor }: CardProps) {
  const inner = (
    <View style={[styles.inner, leftAccentColor ? styles.row : undefined]}>
      {leftAccentColor && (
        <View style={[styles.leftAccent, { backgroundColor: leftAccentColor }]} />
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.75}
        style={[styles.card, style]}
        accessibilityRole="button"
      >
        {inner}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.card, style]}>{inner}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    ...Shadows.sm,
    overflow: 'hidden',
  },
  inner: {
    minHeight: MIN_TOUCH_TARGET,
  },
  row: {
    flexDirection: 'row',
  },
  leftAccent: {
    width: 3,
  },
  content: {
    flex: 1,
  },
});
