import React from 'react';
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
import { useRoutines } from '../hooks/useRoutines';
import {
  RoutineCard,
  AISuggestionCard,
  Button,
  LoadingState,
  ErrorState,
} from '../components';
import { Colors, Spacing } from '../constants/theme';

const AI_SUGGESTION =
  "I noticed you usually clean your apartment every two weeks. Want me to keep track of it?";

export default function RoutinesScreen() {
  const {
    routines,
    loading,
    error,
    showSuggestion,
    dismissSuggestion,
    addRoutine,
    refetch,
  } = useRoutines();

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <LoadingState message="Loading routines…" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ErrorState message={error} onRetry={refetch} />
      </SafeAreaView>
    );
  }

  const handleAcceptSuggestion = () => {
    addRoutine({
      name: 'Apartment cleaning',
      frequencyDays: 14,
      lastCompletedAt: new Date().toISOString(),
      status: 'on_track',
    });
  };

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

        <Text style={styles.title}>Routines</Text>

        {showSuggestion && (
          <View style={styles.suggestionSpacing}>
            <AISuggestionCard
              text={AI_SUGGESTION}
              onAccept={handleAcceptSuggestion}
              onDismiss={dismissSuggestion}
            />
          </View>
        )}

        {routines.map((routine) => (
          <View key={routine.id} style={styles.cardSpacing}>
            <RoutineCard routine={routine} />
          </View>
        ))}

        <View style={styles.addButtonWrapper}>
          <Button
            label="+ Add routine"
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
    paddingBottom: Spacing.lg,
  },
  suggestionSpacing: {
    marginBottom: Spacing.md,
  },
  cardSpacing: {
    marginBottom: Spacing.sm,
  },
  addButtonWrapper: {
    marginTop: Spacing.lg,
  },
});
