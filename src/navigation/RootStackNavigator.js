import React from 'react';
import {SearchAddress, Map} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const RootStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Search Address'}>
      <Stack.Screen name="Search Address" component={SearchAddress} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
