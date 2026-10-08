import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../constants/theme';

export type ChipVariant = 'urgent' | 'today' | 'upcoming' | 'routine' | 'warning' | 'neutral' | 'accent';

const variantStyles: Record<ChipVariant, { backgroundColor: string; color: string }> = {
  urgent: { backgroundColor: Colors.dangerLight, color: Colors.danger },
  today: { backgroundColor: Colors.accentLight, color: Colors.accent },
  upcoming: { backgroundColor: Colors.upcomingLight, color: Colors.upcomingText },
  routine: { backgroundColor: Colors.accentLight, color: Colors.accent },
  warning: { backgroundColor: Colors.warningLight, color: Colors.warning },
  neutral: { backgroundColor: Colors.divider, color: Colors.text2 },
  accent: { backgroundColor: Colors.accentLight, color: Colors.accent },
};

interface ChipProps {
  label: string;
  variant: ChipVariant;
}

export default function Chip({ label, variant }: ChipProps) {
  const { backgroundColor, color } = variantStyles[variant];
  return (
    <View style={[styles.chip, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
