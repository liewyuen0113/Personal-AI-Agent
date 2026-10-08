import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as permissionService from '../services/permissionService';
import { PermissionRow, LoadingState, ErrorState } from '../components';
import { Colors, Spacing } from '../constants/theme';
import { Permission } from '../types';

export default function PermissionsScreen() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    let cancelled = false;
    permissionService
      .getPermissions()
      .then((data) => {
        if (!cancelled) {
          setPermissions(data);
          setLoading(false);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load permissions');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return load();
  }, [load]);

  const handleToggle = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <LoadingState message="Loading permissions…" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ErrorState message={error} onRetry={load} />
      </SafeAreaView>
    );
  }

  // Group permissions by tool
  const tools = Array.from(new Set(permissions.map((p) => p.tool)));

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backRow}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text1} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>AI Permissions</Text>
        <Text style={styles.subtitle}>
          You control exactly what your AI can do.
        </Text>

        {tools.map((tool) => {
          const toolPerms = permissions.filter((p) => p.tool === tool);
          return (
            <View key={tool} style={styles.group}>
              <Text style={styles.groupTitle}>{tool}</Text>
              <View style={styles.groupCard}>
                {toolPerms.map((permission, index) => (
                  <View
                    key={permission.id}
                    style={[
                      styles.permRow,
                      index < toolPerms.length - 1 && styles.permRowBorder,
                    ]}
                  >
                    <PermissionRow
                      permission={permission}
                      onToggle={() => handleToggle(permission.id)}
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <Text style={styles.privacyNote}>
          Your data is never shared with third parties without your consent.
          Permissions can be revoked at any time.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.xxl,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xs,
  },
  backText: {
    fontSize: 16,
    color: Colors.text1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text1,
    marginBottom: 4,
    paddingHorizontal: Spacing.xl,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text2,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  group: {
    marginBottom: Spacing.md,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text2,
    paddingHorizontal: Spacing.xl,
    paddingTop: 12,
    paddingBottom: 4,
  },
  groupCard: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xl,
  },
  permRow: {},
  permRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  privacyNote: {
    fontSize: 12,
    color: Colors.text3,
    textAlign: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
    lineHeight: 18,
  },
});
