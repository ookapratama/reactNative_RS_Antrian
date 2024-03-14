import React, {useState} from 'react';
import {Container, VStack} from '../../components';
import {Input, Text} from '@ui-kitten/components';
import { Icons } from '../../assets';

const Login = () => {
  
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const iconMap = {
    hidden_eye: Icons.hidden_eye,
    show_eye: Icons.show_eye,
  };

  return (
    <Container level="2">
      <VStack mh={20}>
        <Text category="h1">Welcome {'\n'}Back</Text>
        <Text>Sign in to continue</Text>
        <Input
          style={{marginVertical: 24}}
          size="large"
          placeholder="Username"
        />
        <Input
          style={{marginBottom: 24}}
          size="large"
          secureTextEntry={secureTextEntry}
          accessoryRight={iconMap['show_eye']}
          placeholder="Password"
          inputMode="password"
        />
      </VStack>
    </Container>
  );
};

export default Login;
