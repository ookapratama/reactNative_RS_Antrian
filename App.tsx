import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import AppContainer from './src/navigation/AppContainer';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light} >
            <AppContainer />
        </ApplicationProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
