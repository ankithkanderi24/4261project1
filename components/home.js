import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import {doc, setDoc, getDoc, collection, addDoc, getDocs} from "firebase/firestore"; 
import {db} from './config';

export default function Home() {
    const [playername, setName] = useState('');
    const [points, setPoints] = useState('');
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [ppg, setppg] = useState(null);
    const [calculatingPPG, setCalculatingPPG] = useState(false);

    const navigation = useNavigation();
  
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
          setCalculatingPPG(true); 
          const docs = await getDocs(pointsCollectionRef);
      
          let totalPoints = 0;
          let numGames = 0;
      
          docs.forEach((doc) => {
            const pointEntry = doc.data();
            totalPoints += pointEntry.value;
            numGames++;
          });
      
          const calculatedPPG = numGames > 0 ? totalPoints / numGames : 0;
          setppg(calculatedPPG);
        } catch (error) {
          console.error("Error calculating PPG:", error);
        } finally {
          setCalculatingPPG(false); // Calculation is complete
        }
      }
      
      useEffect(() => {
        if (dataSubmitted) {
          calculatePPG();
        }
        
        if (ppg !== null) {
          navigation.navigate('ppgscreen', { playername, ppg });
        }
      }, [dataSubmitted, ppg]);

      useFocusEffect(
        React.useCallback(() => {
          setName('');
          setPoints('');
          setDataSubmitted(false);
          setppg(null);
        }, [])
      );
      
    
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>Type your name below!</Text>
        <TextInput style = {styles.input}
          value={playername}
          onChangeText={text => setName(text)}
          placeholder="Name"
        />
        <Text style = {styles.text}>Type how many points you scored below!</Text>
        <TextInput style = {styles.input}
          value={points}
          onChangeText={text => setPoints(text)}
          placeholder="PPG"
        />
        <Button title="Submit Data" onPress = {handleSubmit} disabled={calculatingPPG}/>
        {calculatingPPG && (
        <Text>Calculating PPG...</Text>
      )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'blue',
      marginBottom: 20,
    },
    input: {
      width: '80%',
      fontSize: 18,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: 'blue',
      borderWidth: 1,
      marginBottom: 20,
      borderRadius: 5,
    },
  });
  
  
  
  
  
  