import {Alert, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, VStack} from '../../components';
import {Button, Icon, Input, Text} from '@ui-kitten/components';
import {navigate} from '../../navigation/RootNavigation';
import {SignUp as SignUpService} from '../../services/AuthService';

const debounce = (nama, username, password, delay) => {
  const [debounceValue, setDebounceValue] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue([nama, username, password]);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [nama, username, password, delay]);
  return debounceValue;
};

const SignUp = () => {
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const debounceHandler = debounce(nama, username, password, 1000);

  // Toggle icon password
  const toggleSecurity = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  // show icon password
  const renderIcon = (props: any): any => (
    <TouchableWithoutFeedback onPress={toggleSecurity}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const onSignUp = data => {
    data[0] == '' || data[1] == '' || data[2] == ''
      ? Alert.alert('Warning', 'Form tidak boleh ada yang kosong', [
          {
            text: 'OK',
            onPress: () => {
              return;
            },
          },
        ])
      : SignUpService(data);
  };

  return (
    <Container level="1">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <VStack mh={20} mb={50} mt={-140}>
          <Text style={{fontSize: 64, marginBottom: 24}} category="h1">
            Welcome {'\n'}user
          </Text>
          <Text style={{fontSize: 20}}>Sign up to join</Text>
        </VStack>
        <VStack mh={20} mb={54}>
          <Input
            style={{marginBottom: 24}}
            size="large"
            placeholder="Nama Lengkap"
            value={nama}
            onChangeText={v => setNama(v)}
          />
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
          Have an account?{'\t'}
          <Text
            status="primary"
            style={{fontWeight: 'bold'}}
            onPress={() => navigate('SignIn')}>
            Sign in
          </Text>
        </Text>
        <Button
          appearance="outline"
          size="large"
          style={{marginHorizontal: 32, borderRadius: 12}}
          onPress={() => onSignUp(debounceHandler)}>
          <Text>Sign up</Text>
        </Button>
      </View>
    </Container>
  );
};

export default SignUp;
