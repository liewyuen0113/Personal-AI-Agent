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
import { ToolRow, LoadingState, ErrorState } from '../components';
import { Colors, Spacing } from '../constants/theme';
import { ConnectedTool } from '../types';

export default function ConnectedToolsScreen() {
  const [tools, setTools] = useState<ConnectedTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    let cancelled = false;
    permissionService
      .getConnectedTools()
      .then((data) => {
        if (!cancelled) {
          setTools(data);
          setLoading(false);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load tools');
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

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <LoadingState message="Loading connected tools…" />
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

        <Text style={styles.title}>Connected Tools</Text>
        <Text style={styles.subtitle}>Choose what your AI can access.</Text>

        <View style={styles.toolsList}>
          {tools.map((tool) => (
            <View key={tool.id} style={styles.toolDivider}>
              <ToolRow
                tool={tool}
                onPress={() => {
                  /* no-op — future backend integration */
                }}
              />
            </View>
          ))}
        </View>
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
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
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
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text2,
    marginBottom: Spacing.lg,
  },
  toolsList: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
  },
  toolDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
});
