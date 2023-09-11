import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ppgscreen({ route }) {
  const { playername, ppg } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('home'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {playername}</Text>
      <Text style={styles.text}>PPG: {ppg.toFixed(2)}</Text>
      <Button
      title="Go Back to Home"
      onPress={handleGoBack} 
    />

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