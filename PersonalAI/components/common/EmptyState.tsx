import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Spacing, Radius } from '../../constants/theme';

interface ChipAction {
  label: string;
  onPress: () => void;
}

interface EmptyStateProps {
  icon: string;
  title: string;
  body: string;
  chips?: ChipAction[];
}

export default function EmptyState({ icon, title, body, chips }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {chips && chips.length > 0 && (
        <View style={styles.chipsRow}>
          {chips.map((chip) => (
            <TouchableOpacity
              key={chip.label}
              onPress={chip.onPress}
              style={styles.chip}
              activeOpacity={0.75}
              accessibilityRole="button"
            >
              <Text style={styles.chipLabel}>{chip.label}</Text>
            </TouchableOpacity>
          ))}
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
  icon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  body: {
    fontSize: 14,
    color: Colors.text2,
    textAlign: 'center',
    lineHeight: 20,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  chip: {
    backgroundColor: Colors.accentLight,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.accent,
  },
});
