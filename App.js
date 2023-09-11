import React, { useState, useEffect} from 'react'; 
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { doc, setDoc, getDoc, collection, addDoc, getDocs} from "firebase/firestore"; 
import {db} from './components/config';

export default function App() {
  const [playername, setName] = useState('');
  const [points, setPoints] = useState('');
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [ppg, setppg] = useState(null);

  useEffect(() => {
    if (dataSubmitted) {
      calculatePPG();
    }
  }, [dataSubmitted]);

  const handleSubmit = async () => {
    setDataSubmitted(true);
    await create();
  }

  async function create () {  
    const playerDocRef = doc(db, "userppg", playername);
    const pointsCollectionRef = collection(playerDocRef, "points");

    try {
      await addDoc(pointsCollectionRef, {
        value: Number(points)
      });
    } catch (error) {
      console.error("Error adding point entry:", error);
    }
  }

  async function calculatePPG() {
    const playerDocRef = doc(db, "userppg", playername);
    const pointsCollectionRef = collection(playerDocRef, "points");

    try {
      const docs = await getDocs(pointsCollectionRef);

      let totalPoints = 0;
      let numGames = 0;

      docs.forEach((doc) => {
        const pointEntry = doc.data();
        totalPoints += pointEntry.value;
        numGames++;
      });

      const calculatedPPG = totalPoints / numGames;
      setppg(calculatedPPG);
    } catch (error) {
      console.error("Error calculating PPG:", error);
    }
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
        value={points}
        onChangeText={text => setPoints(text)}
        placeholder="PPG"
      />
      <Button title="Submit Data" onPress = {handleSubmit}/>
      {dataSubmitted && ppg !== null && (
        <View>
        <Text style={styles.resultText}>Name: {playername}</Text>
        <Text style={styles.resultText}>PPG: {ppg.toFixed(2)}</Text>
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




