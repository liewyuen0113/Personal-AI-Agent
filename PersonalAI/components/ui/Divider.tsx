import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/theme';

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
});
