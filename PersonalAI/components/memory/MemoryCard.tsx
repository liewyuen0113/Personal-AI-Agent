import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Memory, MemoryCategory } from '../../types/index';
import { Colors, Spacing, Radius, Shadows } from '../../constants/theme';
import Chip from '../ui/Chip';

const CATEGORY_LABELS: Record<MemoryCategory, string> = {
  about_me: 'About Me',
  preferences: 'Preferences',
  projects: 'Projects',
  people: 'People',
};

interface MemoryCardProps {
  memory: Memory;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MemoryCard({ memory, onEdit, onDelete }: MemoryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.text}>{memory.text}</Text>
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity
              onPress={onEdit}
              style={styles.actionBtn}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Edit memory"
            >
              <Ionicons name="pencil" size={16} color={Colors.text3} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              style={styles.actionBtn}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Delete memory"
            >
              <Ionicons name="trash" size={16} color={Colors.text3} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.chipRow}>
        <Chip label={CATEGORY_LABELS[memory.category]} variant="neutral" />
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
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: Colors.text1,
    lineHeight: 20,
    paddingRight: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionBtn: {
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
  },
});
