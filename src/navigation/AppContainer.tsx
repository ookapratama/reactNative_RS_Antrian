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
import SignIn from '../screens/Login';
import SignUp from '../screens/SignUp';


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
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
