import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {useTheme} from '@ui-kitten/components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ScreenStackList} from './initial-navigation';
import {navigationRef} from './RootNavigation';

// screens
import Splash from '../screens/Splash';


enableScreens();

const Stack = createNativeStackNavigator<ScreenStackList>();

const AppContainer = () => {
  const themes = useTheme();

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName={'Splash'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
