import React, {memo, useEffect, useState} from 'react';
import {Container, HStack, VStack} from '../../components';
import {Button, Icon, Input, Spinner, Text} from '@ui-kitten/components';
import {
  Alert,
  TouchableWithoutFeedback,
  View,
  useAnimatedValue,
} from 'react-native';
import {navigate} from '../../navigation/RootNavigation';
import {SignIn as SignInService} from '../../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const debounceHandler = debounce(username, password, 500);

  // Toggle icon password
  const toggleSecurity = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  // show icon password
  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecurity}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  // Sign in handler
  const onSignIn = () => {
    setTimeout(async () => {
      // jika form kosong
      if (debounceHandler[0] == '' || debounceHandler[1] == '') {
        Alert.alert('Warning', 'Form tidak boleh ada yang kosong');
        return;
      }

      const data = await SignInService(debounceHandler);

      // jika value form tidak sesuai
      if (data.message != 'berhasil login') {
        Alert.alert('Warning', 'Periksa kembali username dan passowrd anda');
        return;
      }

      navigate('Loading');
      setTimeout(async () => {
        await AsyncStorage.setItem('nama', data.data.nama);
        await AsyncStorage.setItem('username', data.data.username);
        await AsyncStorage.setItem('level', data.data.level);
        await AsyncStorage.setItem('no_rm', data.data?.no_rm ?? '');
        await AsyncStorage.setItem('user_id', data.data.id);
        await AsyncStorage.setItem('status', JSON.stringify(true));

        navigate('Home');
      }, 4000);
    }, 500);
  };

  // jika sudah/belum login sebelumnya
  useEffect(() => {
    const checkUserInfo = async () => {
      const status = await AsyncStorage.getItem('status');
      console.log(status);
      if (status) {
        navigate('Home');
        console.log('sudah login');
      } else {
        navigate('SignIn');
        console.log('belum login');
      }
    };
    setUsername('');
    setPassword('');
    checkUserInfo();
  }, []);

  return (
    <Container level="1">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <VStack justify="center" itemsCenter mh={20}  mt={-140}>
          <Text
            style={{fontSize: 52, marginBottom: 24, textAlign: 'center'}}
            category="h1">
            Puskesmas {'\n'}Antang Perumnas
          </Text>
        </VStack>
        <HStack mh={20} mb={50}>
          <Text style={{fontSize: 20}}>Silahkan login untuk lanjut</Text>
        </HStack>
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

        <Button
          appearance="outline"
          size="large"
          style={{marginHorizontal: 32, borderRadius: 12}}
          onPress={() => onSignIn()}>
          <Text>Login</Text>
        </Button>
        <Text style={{textAlign: 'center', marginTop: 22, letterSpacing: 0.5}}>
          Create new one?{'\t'}
          <Text
            status="primary"
            style={{fontWeight: 'bold'}}
            onPress={() => navigate('SignUp')}>
            Register
          </Text>
        </Text>
      </View>
    </Container>
  );
};

export default memo(Login);
