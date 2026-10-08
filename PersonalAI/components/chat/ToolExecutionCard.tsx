import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ToolExecutionStep } from '../../types/index';
import { Colors, Spacing, Radius } from '../../constants/theme';

interface ToolExecutionCardProps {
  title: string;
  steps: ToolExecutionStep[];
}

export default function ToolExecutionCard({ title, steps }: ToolExecutionCardProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.leftBorder} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            {step.completed ? (
              <Ionicons name="checkmark-circle" size={14} color={Colors.success} style={styles.stepIcon} />
            ) : (
              <View style={styles.pendingDot} />
            )}
            <Text style={styles.stepLabel}>{step.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  leftBorder: {
    width: 3,
    backgroundColor: Colors.accent,
  },
  body: {
    flex: 1,
    padding: Spacing.md,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.accent,
    marginBottom: Spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepIcon: {
    marginRight: Spacing.sm,
  },
  pendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
    marginRight: Spacing.sm,
    marginLeft: 4,
  },
  stepLabel: {
    fontSize: 12,
    color: Colors.text2,
    flex: 1,
  },
});
