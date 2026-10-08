import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, Radius, MIN_TOUCH_TARGET } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  variant: ButtonVariant;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function Button({ label, variant, onPress, style, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: MIN_TOUCH_TARGET,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
  },
  primary: {
    backgroundColor: Colors.accent,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.surface,
  },
  secondaryText: {
    color: Colors.accent,
  },
  ghostText: {
    color: Colors.accent,
  },
});
