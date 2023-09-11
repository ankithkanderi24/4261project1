import React, { useState } from 'react'; 
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

export default function App() {
  const [playername, setName] = useState('');
  const [ppg, setPpg] = useState('');
  const [dataSubmitted, setDataSubmitted] = useState(false);

  const handleSubmit = () => {
    setDataSubmitted(true);
  }
  
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>Type your name below!</Text>
      <TextInput style = {styles.textinput}
        value={playername}
        onChangeText={text => setName(text)}
        placeholder="Name"
      />
      <Text style = {styles.text}>Type how many points you scored below!</Text>
      <TextInput style = {styles.textinput}
        value={ppg}
        onChangeText={text => setPpg(text)}
        placeholder="PPG"
      />
      <Button title="Submit Data" onPress = {handleSubmit}/>
      {dataSubmitted && (
        <View>
          <Text style={styles.resultText}>Name: {playername}</Text>
          <Text style={styles.resultText}>PPG: {ppg}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  textinput: {
    fontSize: 20,
  },
  resultText: {
    fontSize: 20
  }
});




