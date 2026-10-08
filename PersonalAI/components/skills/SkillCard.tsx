import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Skill } from '../../types/index';
import { Colors, Spacing, Radius, Shadows } from '../../constants/theme';
import Chip from '../ui/Chip';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{skill.icon}</Text>
      <Text style={styles.name}>{skill.name}</Text>
      <Text style={styles.description}>{skill.description}</Text>
      <View style={styles.toolsRow}>
        {skill.tools.map((tool) => (
          <Chip key={tool} label={tool} variant="neutral" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  icon: {
    fontSize: 24,
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text1,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.text2,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  toolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
});
