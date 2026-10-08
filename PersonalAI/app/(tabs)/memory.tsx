import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemory } from '../../hooks/useMemory';
import {
  MemoryCard,
  LoadingState,
  ErrorState,
} from '../../components';
import { Colors, Spacing } from '../../constants/theme';
import { MemoryCategory } from '../../types';

type CategoryFilter = MemoryCategory | 'all';

const CATEGORY_TABS: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'about_me', label: 'About Me' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'projects', label: 'Projects' },
  { key: 'people', label: 'People' },
];

export default function MemoryScreen() {
  const {
    memories,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    deleteMemory,
    updateMemory,
    refetch,
  } = useMemory();

  if (loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <LoadingState message="Loading memories…" />
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

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Memory</Text>
        <Text style={styles.subtitle}>What your AI knows about you</Text>
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContent}
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveCategory(tab.key)}
              style={[styles.tab, isActive && styles.tabActive]}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Memory list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {memories.length === 0 ? (
          <View style={styles.emptyWrapper}>
            <Text style={styles.emptyText}>No memories in this category yet.</Text>
          </View>
        ) : (
          memories.map((memory) => (
            <View key={memory.id} style={styles.cardSpacing}>
              <MemoryCard
                memory={memory}
                onEdit={() => updateMemory(memory.id, memory.text)}
                onDelete={() => deleteMemory(memory.id)}
              />
            </View>
          ))
        )}

        <Text style={styles.footerNote}>
          Memories are stored securely and only accessible by you.
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
  headerContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
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
  },
  tabsScroll: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabsContent: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    position: 'relative',
  },
  tabActive: {},
  tabText: {
    fontSize: 14,
    color: Colors.text2,
    fontWeight: '500',
  },
  tabTextActive: {
    color: Colors.accent,
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.md,
    right: Spacing.md,
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  cardSpacing: {
    marginBottom: Spacing.sm,
  },
  emptyWrapper: {
    paddingTop: Spacing.huge,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.text2,
    textAlign: 'center',
  },
  footerNote: {
    fontSize: 12,
    color: Colors.text3,
    textAlign: 'center',
    marginTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
});
