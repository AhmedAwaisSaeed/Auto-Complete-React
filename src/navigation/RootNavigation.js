import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
export default RootNavigation;
