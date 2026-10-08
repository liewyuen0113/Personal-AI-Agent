import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Routine } from '../../types/index';
import { Colors, Spacing, Radius, Shadows } from '../../constants/theme';
import Chip, { ChipVariant } from '../ui/Chip';

interface RoutineCardProps {
  routine: Routine;
}

const STATUS_CHIP: Record<Routine['status'], { variant: ChipVariant; label: string }> = {
  on_track: { variant: 'routine', label: 'On track' },
  due_soon: { variant: 'warning', label: 'Due soon' },
  overdue: { variant: 'urgent', label: 'Overdue' },
};

const STATUS_BAR_COLOR: Record<Routine['status'], string> = {
  on_track: Colors.success,
  due_soon: Colors.warning,
  overdue: Colors.danger,
};

function getDaysSinceLast(lastCompletedAt: string): number {
  const last = new Date(lastCompletedAt);
  const now = new Date();
  const diff = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function RoutineCard({ routine }: RoutineCardProps) {
  const { variant, label } = STATUS_CHIP[routine.status];
  const barColor = STATUS_BAR_COLOR[routine.status];
  const daysSinceLast = getDaysSinceLast(routine.lastCompletedAt);
  const fillPercent = Math.min((daysSinceLast / routine.frequencyDays) * 100, 100);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{routine.name}</Text>
        <Chip label={label} variant={variant} />
      </View>
      <Text style={styles.meta}>
        Every {routine.frequencyDays} days · Last: {daysSinceLast} day{daysSinceLast !== 1 ? 's' : ''} ago
      </Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${fillPercent}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text1,
    flex: 1,
    marginRight: Spacing.sm,
  },
  meta: {
    fontSize: 12,
    color: Colors.text2,
    marginBottom: Spacing.sm,
  },
  progressTrack: {
    height: 4,
    borderRadius: 4,
    backgroundColor: Colors.divider,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 4,
  },
});
