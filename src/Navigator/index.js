import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, AuthHome, LoginSignup} from '../Screens';

const Stack = createStackNavigator();

export const AuthenticatedStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const UnauthenticatedStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="Login" component={LoginSignup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
