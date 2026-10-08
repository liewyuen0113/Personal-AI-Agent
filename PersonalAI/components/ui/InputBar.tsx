import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadows } from '../../constants/theme';

interface InputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  style?: ViewStyle;
  editable?: boolean;
}

export default function InputBar({
  value,
  onChangeText,
  onSubmit,
  placeholder,
  style,
  editable = true,
}: InputBarProps) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.text3}
        editable={editable}
        style={styles.input}
        returnKeyType="send"
        onSubmitEditing={onSubmit}
        accessibilityLabel={placeholder ?? 'Message input'}
      />
      <TouchableOpacity
        onPress={onSubmit}
        style={styles.sendButton}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Send message"
      >
        <Ionicons name="send" size={16} color={Colors.surface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 48,
    ...Shadows.md,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text1,
    paddingVertical: 0,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
