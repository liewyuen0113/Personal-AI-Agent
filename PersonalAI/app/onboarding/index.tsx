import React, { useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Colors, Spacing, Radius, Shadows } from '../../constants/theme';

interface OnboardingPage {
  emoji: string;
  title: string;
  body: string;
  previewComponent?: React.ReactNode;
}

function CommitmentPreview() {
  return (
    <View style={previewStyles.card}>
      <Text style={previewStyles.header}>✓ Commitment created</Text>
      <Text style={previewStyles.cardTitle}>Doctor appointment</Text>
      <Text style={previewStyles.cardMeta}>November 3 · Reminder October 31</Text>
    </View>
  );
}

function PermissionsPreview() {
  return (
    <View style={previewStyles.card}>
      <View style={previewStyles.switchRow}>
        <Text style={previewStyles.switchLabel}>Calendar</Text>
        <Switch
          value
          trackColor={{ false: Colors.border, true: Colors.accent }}
          thumbColor={Colors.surface}
          disabled
        />
      </View>
      <View style={previewStyles.switchRowDivider} />
      <View style={previewStyles.switchRow}>
        <Text style={previewStyles.switchLabel}>Tasks</Text>
        <Switch
          value
          trackColor={{ false: Colors.border, true: Colors.accent }}
          thumbColor={Colors.surface}
          disabled
        />
      </View>
      <View style={previewStyles.switchRowDivider} />
      <View style={previewStyles.switchRow}>
        <Text style={previewStyles.switchLabel}>Messages</Text>
        <Switch
          value={false}
          trackColor={{ false: Colors.border, true: Colors.accent }}
          thumbColor={Colors.surface}
          disabled
        />
      </View>
    </View>
  );
}

const previewStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    width: '100%',
    ...Shadows.sm,
  },
  header: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.success,
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text1,
    marginBottom: 2,
  },
  cardMeta: {
    fontSize: 12,
    color: Colors.text2,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  switchRowDivider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  switchLabel: {
    fontSize: 14,
    color: Colors.text1,
  },
});

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages: OnboardingPage[] = [
    {
      emoji: '🤖',
      title: 'Your personal AI',
      body: 'Meet your AI assistant — always available, always learning, always working for you.',
    },
    {
      emoji: '📋',
      title: 'Track your commitments',
      body: 'Tell your AI about your appointments, promises, and deadlines. It will keep track so you don\'t have to.',
      previewComponent: <CommitmentPreview />,
    },
    {
      emoji: '🔒',
      title: 'You\'re in control',
      body: 'Choose exactly what your AI can access. Permissions are always yours to manage.',
      previewComponent: <PermissionsPreview />,
    },
  ];

  const isLastPage = currentPage === pages.length - 1;
  const page = pages[currentPage];

  const handleComplete = async () => {
    await AsyncStorage.setItem('onboarding_complete', 'true');
    router.replace('/(tabs)');
  };

  const handleContinue = () => {
    if (isLastPage) {
      handleComplete();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Illustration */}
        <View style={styles.illustrationCircle}>
          <Text style={styles.emoji}>{page.emoji}</Text>
        </View>

        {/* Text content */}
        <Text style={styles.title}>{page.title}</Text>
        <Text style={styles.body}>{page.body}</Text>

        {/* Preview component if present */}
        {page.previewComponent && (
          <View style={styles.previewWrapper}>{page.previewComponent}</View>
        )}

        {/* Pagination dots */}
        <View style={styles.dotsRow}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.primaryButton}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={isLastPage ? 'Get started' : 'Continue'}
        >
          <Text style={styles.primaryButtonText}>
            {isLastPage ? 'Get started' : 'Continue'}
          </Text>
        </TouchableOpacity>

        {/* Skip intro — only on page 0 */}
        {currentPage === 0 && (
          <TouchableOpacity
            onPress={handleSkip}
            style={styles.skipButton}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Skip intro"
          >
            <Text style={styles.skipText}>Skip intro</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text1,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  body: {
    fontSize: 15,
    color: Colors.text2,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xxl,
  },
  previewWrapper: {
    width: '100%',
    marginBottom: Spacing.xxl,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.accent,
  },
  dotInactive: {
    width: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: 'transparent',
  },
  primaryButton: {
    width: '100%',
    minHeight: 44,
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.surface,
  },
  skipButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 15,
    color: Colors.text2,
  },
});
