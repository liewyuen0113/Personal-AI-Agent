import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors, Spacing, Radius } from '../../constants/theme';

function AnimatedDot({ delay }: { delay: number }) {
  // useState with initializer ensures the Animated.Value is stable
  // and never accessed as .current during render (satisfies react-hooks/refs)
  const [translateY] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(translateY, {
          toValue: -4,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(600 - delay),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [translateY, delay]);

  return (
    <Animated.View
      style={[styles.dot, { transform: [{ translateY }] }]}
    />
  );
}

export default function TypingIndicator() {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        {/* AI avatar — background color matches AI message bubbles */}
      </View>
      <View style={styles.bubble}>
        <AnimatedDot delay={0} />
        <AnimatedDot delay={200} />
        <AnimatedDot delay={400} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4338CA',
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.text3,
  },
});
