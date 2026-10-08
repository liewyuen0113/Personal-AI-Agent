import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThings } from '../../hooks/useThings';
import {
  SectionHeader,
  CommitmentCard,
  TaskCard,
  EmptyState,
  LoadingState,
  ErrorState,
} from '../../components';
import { Colors, Spacing } from '../../constants/theme';

export default function ThingsScreen() {
  const { commitments, tasks, loading, error, toggleTask, refetch } = useThings();

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <LoadingState message="Loading your things…" />
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

  const isEmpty = commitments.length === 0 && tasks.length === 0;

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isEmpty && styles.contentEmpty]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>My Things</Text>

        {isEmpty ? (
          <EmptyState
            icon="🎉"
            title="All clear!"
            body="You have no commitments or tasks right now."
          />
        ) : (
          <>
            {commitments.length > 0 && (
              <View style={styles.section}>
                <SectionHeader title="Commitments" />
                {commitments.map((commitment) => (
                  <View key={commitment.id} style={styles.cardSpacing}>
                    <CommitmentCard commitment={commitment} />
                  </View>
                ))}
              </View>
            )}

            {tasks.length > 0 && (
              <View style={styles.section}>
                <SectionHeader title="Tasks" />
                {tasks.map((task) => (
                  <View key={task.id} style={styles.cardSpacing}>
                    <TaskCard
                      task={task}
                      onToggle={() => toggleTask(task.id)}
                    />
                  </View>
                ))}
              </View>
            )}

            <View style={styles.section}>
              <SectionHeader title="Upcoming" />
              <TouchableOpacity
                style={styles.upcomingRow}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel="Weekly planning"
              >
                <View style={styles.upcomingDot} />
                <View style={styles.upcomingInfo}>
                  <Text style={styles.upcomingTitle}>Weekly planning</Text>
                  <Text style={styles.upcomingMeta}>Every Sunday · Skill</Text>
                </View>
                <Text style={styles.upcomingChevron}>›</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  contentEmpty: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text1,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  cardSpacing: {
    marginBottom: Spacing.sm,
  },
  upcomingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  upcomingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.upcoming,
    marginRight: Spacing.md,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text1,
  },
  upcomingMeta: {
    fontSize: 12,
    color: Colors.text2,
    marginTop: 2,
  },
  upcomingChevron: {
    fontSize: 20,
    color: Colors.text3,
    marginLeft: Spacing.sm,
  },
});
