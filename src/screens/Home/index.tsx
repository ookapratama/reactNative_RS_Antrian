import {View, Image} from 'react-native';
import React from 'react';
import {Container, HStack, NavigationAction} from '../../components';
import {Icon, IconElement, Text} from '@ui-kitten/components';

const Home = (): IconElement => {
  return (
    <Container level="1">
      <HStack>
        <Text category="h2">Home</Text>
        <NavigationAction status="primary"  />
      </HStack>
    </Container>
  );
};

export default Home;
