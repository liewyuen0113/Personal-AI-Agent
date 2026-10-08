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
import * as skillService from '../services/skillService';
import { SkillCard, Button, LoadingState, ErrorState } from '../components';
import { Colors, Spacing } from '../constants/theme';
import { Skill } from '../types';

export default function SkillsScreen() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    let cancelled = false;
    skillService
      .getSkills()
      .then((data) => {
        if (!cancelled) {
          setSkills(data);
          setLoading(false);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load skills');
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
        <LoadingState message="Loading skills…" />
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

        <Text style={styles.title}>Skills</Text>
        <Text style={styles.subtitle}>Reusable workflows your AI can run.</Text>

        {skills.map((skill) => (
          <View key={skill.id} style={styles.cardSpacing}>
            <SkillCard skill={skill} />
          </View>
        ))}

        <View style={styles.addButtonWrapper}>
          <Button
            label="+ Create skill"
            variant="secondary"
            onPress={() => {
              /* no-op — future backend integration */
            }}
          />
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
  cardSpacing: {
    marginBottom: Spacing.sm,
  },
  addButtonWrapper: {
    marginTop: Spacing.lg,
  },
});
