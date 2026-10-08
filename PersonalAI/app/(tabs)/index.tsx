import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThings } from '../../hooks/useThings';
import { useRoutines } from '../../hooks/useRoutines';
import {
  SectionHeader,
  AttentionCard,
  InputBar,
  EmptyState,
} from '../../components';
import { Colors, Spacing } from '../../constants/theme';

export default function HomeScreen() {
  const { commitments } = useThings();
  const { routines } = useRoutines();
  const [inputValue, setInputValue] = React.useState('');

  const urgentItems = [
    ...commitments
      .filter((c) => c.status === 'overdue')
      .map((c) => ({
        id: c.id,
        title: c.title,
        meta: 'Overdue',
        chipVariant: 'urgent' as const,
        chipLabel: 'Overdue',
        borderColor: Colors.warning,
      })),
    ...routines
      .filter((r) => r.status === 'overdue')
      .map((r) => ({
        id: r.id,
        title: r.name,
        meta: `Every ${r.frequencyDays} days`,
        chipVariant: 'urgent' as const,
        chipLabel: 'Overdue',
        borderColor: Colors.danger,
      })),
  ];

  const upcomingItems = [
    ...commitments
      .filter((c) => c.status === 'active')
      .map((c) => ({
        id: c.id,
        title: c.title,
        meta: c.dueDate,
        chipVariant: 'upcoming' as const,
        chipLabel: 'Upcoming',
        borderColor: Colors.upcoming,
      })),
    ...routines
      .filter((r) => r.status === 'due_soon')
      .map((r) => ({
        id: r.id,
        title: r.name,
        meta: `Every ${r.frequencyDays} days`,
        chipVariant: 'today' as const,
        chipLabel: 'Due soon',
        borderColor: Colors.warning,
      })),
  ];

  const routineItems = routines
    .filter((r) => r.status === 'on_track')
    .map((r) => ({
      id: r.id,
      title: r.name,
      meta: `Every ${r.frequencyDays} days`,
      chipVariant: 'routine' as const,
      chipLabel: 'On track',
      borderColor: Colors.success,
    }));

  const allEmpty =
    urgentItems.length === 0 &&
    upcomingItems.length === 0 &&
    routineItems.length === 0;

  const handleChatPress = () => {
    router.push('/(tabs)/chat');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.subtitle}>Here&apos;s what needs your attention</Text>
        </View>

        {allEmpty ? (
          <EmptyState
            icon="✅"
            title="All clear!"
            body="No urgent items right now. You&apos;re on top of everything."
          />
        ) : (
          <>
            {urgentItems.length > 0 && (
              <View style={styles.section}>
                <SectionHeader title="Needs attention" />
                {urgentItems.map((item) => (
                  <View key={item.id} style={styles.cardSpacing}>
                    <AttentionCard
                      title={item.title}
                      meta={item.meta}
                      chipVariant={item.chipVariant}
                      chipLabel={item.chipLabel}
                      borderColor={item.borderColor}
                    />
                  </View>
                ))}
              </View>
            )}

            {upcomingItems.length > 0 && (
              <View style={styles.section}>
                <SectionHeader title="Upcoming" />
                {upcomingItems.map((item) => (
                  <View key={item.id} style={styles.cardSpacing}>
                    <AttentionCard
                      title={item.title}
                      meta={item.meta}
                      chipVariant={item.chipVariant}
                      chipLabel={item.chipLabel}
                      borderColor={item.borderColor}
                    />
                  </View>
                ))}
              </View>
            )}

            {routineItems.length > 0 && (
              <View style={styles.section}>
                <SectionHeader title="Routines" />
                {routineItems.map((item) => (
                  <View key={item.id} style={styles.cardSpacing}>
                    <AttentionCard
                      title={item.title}
                      meta={item.meta}
                      chipVariant={item.chipVariant}
                      chipLabel={item.chipLabel}
                      borderColor={item.borderColor}
                    />
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <InputBar
          value={inputValue}
          onChangeText={setInputValue}
          onSubmit={handleChatPress}
          placeholder="Ask me anything…"
          editable={false}
        />
      </View>
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
  header: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text2,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  cardSpacing: {
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
  },
});
