import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PPGScreen({ route }) {
  const { playername, ppg } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {playername}</Text>
      <Text style={styles.text}>PPG: {ppg.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});