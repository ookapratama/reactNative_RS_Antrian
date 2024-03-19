import React, {useEffect, useState} from 'react';
import {Container, VStack} from '../../components';
import {Button, Icon, Input, Text} from '@ui-kitten/components';
import {
  Alert,
  TouchableWithoutFeedback,
  View,
  useAnimatedValue,
} from 'react-native';
import {navigate} from '../../navigation/RootNavigation';
import {SignIn as SignInService} from '../../services/AuthService';

const debounce = (username, password, delay) => {
  const [debounceValue, setDebounceValue] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue([username, password]);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [username, password, delay]);
  return debounceValue;
};

const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const debounceHandler = debounce(username, password, 1500);

  const toggleSecurity = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecurity}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const onSignIn = () => {
    debounceHandler[0] == '' || debounceHandler[1] == ''
      ? Alert.alert('Warning', 'Form tidak boleh ada yang kosong', [
          {
            text: 'OK',
            onPress: () => {
              return;
            },
          },
        ])
      : SignInService(debounceHandler);
  };

  console.log(onSignIn());

  return (
    <Container level="1">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <VStack mh={20} mb={50} mt={-140}>
          <Text style={{fontSize: 64, marginBottom: 24}} category="h1">
            Welcome {'\n'}Back
          </Text>
          <Text style={{fontSize: 20}}>Sign in to continue</Text>
        </VStack>
        <VStack mh={20} mb={54}>
          <Input
            style={{marginBottom: 24}}
            size="large"
            placeholder="Username"
            value={username}
            onChangeText={v => setUsername(v)}
          />
          <Input
            style={{marginBottom: 54}}
            size="large"
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
            placeholder="Password"
            value={password}
            onChangeText={v => setPassword(v)}
          />
        </VStack>
        <Text
          style={{textAlign: 'center', marginBottom: 22, letterSpacing: 0.5}}>
          Create new one?{'\t'}
          <Text
            status="primary"
            style={{fontWeight: 'bold'}}
            onPress={() => navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
        <Button
          appearance="outline"
          size="large"
          style={{marginHorizontal: 32, borderRadius: 12}}
          onPress={() => onSignIn()}>
          <Text>Sign in</Text>
        </Button>
      </View>
    </Container>
  );
};

export default Login;
