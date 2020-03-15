import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, AuthNavigator} from './src/Screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthNavigator />
  );
};

export default App;
