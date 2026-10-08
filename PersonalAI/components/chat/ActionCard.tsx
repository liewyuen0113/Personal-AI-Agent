import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AgentAction, AgentActionType } from '../../types/index';
import { Colors, Spacing, Radius } from '../../constants/theme';

interface ActionCardProps {
  action: AgentAction;
}

const SUCCESS_TYPES: AgentActionType[] = [
  'commitment_created',
  'task_created',
  'routine_updated',
];

function getLeftBorderColor(type: AgentActionType): string {
  if (SUCCESS_TYPES.includes(type)) return Colors.success;
  return Colors.accent;
}

function getIconBg(type: AgentActionType): string {
  if (SUCCESS_TYPES.includes(type)) return Colors.successLight;
  return Colors.accentLight;
}

function getIconColor(type: AgentActionType): string {
  if (SUCCESS_TYPES.includes(type)) return Colors.success;
  return Colors.accent;
}

export default function ActionCard({ action }: ActionCardProps) {
  const borderColor = getLeftBorderColor(action.type);
  const iconBg = getIconBg(action.type);
  const iconColor = getIconColor(action.type);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.leftBorder, { backgroundColor: borderColor }]} />
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
            <Text style={[styles.iconText, { color: iconColor }]}>✓</Text>
          </View>
          <Text style={styles.title}>{action.title}</Text>
        </View>
        {action.subtitle && <Text style={styles.subtitle}>{action.subtitle}</Text>}
        {action.meta && <Text style={styles.meta}>{action.meta}</Text>}
        {action.linkText && <Text style={styles.link}>{action.linkText}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  leftBorder: {
    width: 3,
  },
  body: {
    flex: 1,
    padding: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  iconCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  iconText: {
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text1,
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text1,
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    color: Colors.text2,
    marginBottom: 2,
  },
  link: {
    fontSize: 12,
    color: Colors.accent,
    marginTop: 2,
  },
});
