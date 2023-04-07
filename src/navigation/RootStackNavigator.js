import React from 'react';
import {Home} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const RootStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
