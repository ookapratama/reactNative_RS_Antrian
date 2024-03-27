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
  const debounceHandler = debounce(nama, username, password, 500);

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

  const onSignUp = () => {
    setTimeout(async () => {
      // jika form kosong
      if (
        debounceHandler[0] == '' ||
        debounceHandler[1] == '' ||
        debounceHandler[2] == ''
      ) {
        Alert.alert('Warning', 'Form tidak boleh ada yang kosong');
        return;
      }
      const data = await SignUpService(debounceHandler);

      Alert.alert('Success', 'Berhasil register akun', [
        {
          text: 'OK',
          onPress: () => {
            navigate('Loading');
            setTimeout(() => {
              navigate('SignIn');
              return;
            }, 3000);
          },
        },
      ]);
      // console.log(data);
    }, 500);
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
        <Button
          appearance="outline"
          size="large"
          style={{marginHorizontal: 32, borderRadius: 12}}
          onPress={() => onSignUp()}>
          <Text>Register</Text>
        </Button>
        <Text style={{textAlign: 'center', marginTop: 22, letterSpacing: 0.5}}>
          Have an account?{'\t'}
          <Text
            status="primary"
            style={{fontWeight: 'bold'}}
            onPress={() => navigate('SignIn')}>
            Login
          </Text>
        </Text>
      </View>
    </Container>
  );
};

export default SignUp;
