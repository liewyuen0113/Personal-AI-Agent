import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConnectedTool } from '../../types/index';
import { Colors, Spacing, Radius, MIN_TOUCH_TARGET } from '../../constants/theme';

interface ToolRowProps {
  tool: ConnectedTool;
  onPress: () => void;
}

export default function ToolRow({ tool, onPress }: ToolRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.row}
      accessibilityRole="button"
      accessibilityLabel={tool.connected ? `Manage ${tool.name}` : `Connect ${tool.name}`}
    >
      <View style={[styles.iconCircle, { backgroundColor: tool.iconBg ?? Colors.divider }]}>
        <Text style={styles.iconEmoji}>{tool.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{tool.name}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: tool.connected ? Colors.success : Colors.text3 }]} />
          <Text style={styles.statusText}>
            {tool.connected ? 'Connected' : 'Not connected'}
          </Text>
        </View>
      </View>
      <Text style={styles.action}>{tool.connected ? 'Manage' : 'Connect'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
    paddingVertical: Spacing.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  iconEmoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text1,
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    color: Colors.text2,
  },
  action: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.accent,
    marginLeft: Spacing.sm,
  },
});
