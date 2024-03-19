import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ScreenStackList} from './initial-navigation';
import {navigationRef} from './RootNavigation';

// screens
import Splash from '../screens/Splash';
import SignIn from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Loading from '../screens/Loading';


enableScreens();

const Stack = createNativeStackNavigator<ScreenStackList>();

const AppContainer = () => {

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName={'Splash'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
