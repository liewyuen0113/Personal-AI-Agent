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
import { Colors, Spacing, Radius } from '../../constants/theme';

interface MoreRowProps {
  icon: string;
  title: string;
  onPress: () => void;
}

function MoreRow({ icon, title, onPress }: MoreRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.row}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.iconCircle}>
        <Text style={styles.rowIcon}>{icon}</Text>
      </View>
      <Text style={styles.rowTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.text3} />
    </TouchableOpacity>
  );
}

export default function MoreScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>More</Text>

        <View style={styles.list}>
          <MoreRow
            icon="🔄"
            title="Routines"
            onPress={() => router.push('/routines')}
          />
          <MoreRow
            icon="⚡"
            title="Skills"
            onPress={() => router.push('/skills')}
          />
          <MoreRow
            icon="🔗"
            title="Connected Tools"
            onPress={() => router.push('/connected-tools')}
          />
          <MoreRow
            icon="🔒"
            title="Permissions & Privacy"
            onPress={() => router.push('/permissions')}
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
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text1,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  list: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  rowIcon: {
    fontSize: 18,
  },
  rowTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text1,
  },
});
