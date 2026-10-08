import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../../types/index';
import { Colors, Spacing, Radius, Shadows, MIN_TOUCH_TARGET } from '../../constants/theme';

interface TaskCardProps {
  task: Task;
  onToggle?: () => void;
  onPress?: () => void;
}

export default function TaskCard({ task, onToggle, onPress }: TaskCardProps) {
  const isDueTomorrow = useMemo(() => {
    if (!task.dueDate) return false;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(task.dueDate).toDateString() === tomorrow.toDateString();
  }, [task.dueDate]);

  const inner = (
    <View style={styles.inner}>
      <TouchableOpacity
        onPress={onToggle}
        style={styles.checkArea}
        activeOpacity={0.75}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={`Toggle ${task.title}`}
      >
        <View style={[styles.circle, task.completed && styles.circleChecked]}>
          {task.completed && (
            <Ionicons name="checkmark" size={12} color={Colors.surface} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text
          style={[styles.title, task.completed && styles.titleCompleted]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        {task.dueDate && (
          <Text style={[styles.due, isDueTomorrow && styles.dueTomorrow]}>
            {isDueTomorrow ? 'Due tomorrow' : task.dueDate}
          </Text>
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
    paddingRight: Spacing.md,
  },
  checkArea: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleChecked: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text1,
    marginBottom: 2,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.text3,
  },
  due: {
    fontSize: 12,
    color: Colors.text2,
  },
  dueTomorrow: {
    color: Colors.warning,
  },
  chevron: {
    marginLeft: Spacing.sm,
  },
});
