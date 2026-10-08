import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Permission } from '../../types/index';
import { Colors, Spacing, MIN_TOUCH_TARGET } from '../../constants/theme';

interface PermissionRowProps {
  permission: Permission;
  onToggle: () => void;
}

export default function PermissionRow({ permission, onToggle }: PermissionRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{permission.action}</Text>
      <Switch
        value={permission.enabled}
        onValueChange={onToggle}
        trackColor={{ false: Colors.border, true: Colors.accent }}
        thumbColor={Colors.surface}
        accessibilityLabel={`${permission.action} for ${permission.tool}`}
        accessibilityRole="switch"
        accessibilityState={{ checked: permission.enabled }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
    paddingVertical: Spacing.sm,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: Colors.text1,
    marginRight: Spacing.md,
  },
});
