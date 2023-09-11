import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './components/home'; 
import ppgscreen from './components/ppgscreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={home} />
        <Stack.Screen name="ppgscreen" component={ppgscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



