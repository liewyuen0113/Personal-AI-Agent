import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { Colors } from '../../constants/theme';

interface SectionHeaderProps {
  title: string;
  style?: TextStyle;
}

export default function SectionHeader({ title, style }: SectionHeaderProps) {
  return <Text style={[styles.text, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: Colors.text2,
    paddingVertical: 8,
  },
});
