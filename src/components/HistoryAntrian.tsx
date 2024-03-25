import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import {Container, Content, HStack, VStack} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHistory} from '../services/PasienService';

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(18).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const rightItem = () => {
  <Text>12-21-2023</Text>;
};

const renderListItem = ({item, index}: {item: IListItem; index: number}) => {
  <ListItem
    title={`${item.title} ${index + 1}`}
    description={`${item.description} ${index + 1}`}
    accessoryRight={rightItem}
  />;
};

const HistoryAntrian = () => {
  const [history, setHistory] = useState([]);
  const [isHistory, setIsHistory] = useState(false);
  const [formatDate, setFormatData] = useState('');

  const dataHistory = async () => {
    try {
      const no_rm = await AsyncStorage.getItem('no_rm');

      const res = await getHistory(no_rm);
      console.log(res);

      setHistory(res);
      res.message === 'data tidak di temukan'
        ? setIsHistory(false)
        : setIsHistory(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    dataHistory();
  }, []);

  return (
    <>
      <HStack level="4">
        <Text category="h4" style={{margin: 12}}>
          Riwayat Antrian
        </Text>
      </HStack>
      {isHistory ? (
        <ScrollView>
          <FlatList
            data={history.data}
            renderItem={({item}) => (
              <>
                <Card
                  status="basic"
                  style={{marginHorizontal: 12, marginVertical: 6}}>
                  <HStack>
                    <Text category="h5">{item.no_rekam_medis}</Text>
                    <Text category="h6"> 23-04-2002</Text>
                  </HStack>
                  <Text category="s1">Antrian : {item.no_antrian}</Text>
                </Card>
                <Divider />
              </>
            )}
          />
        </ScrollView>
      ) : (
        <HStack justify="center" mt={24}>
          <Text category="h6">Riwayat Antrian tidak ada</Text>
        </HStack>
      )}
    </>
  );
};

export default HistoryAntrian;

const styles = StyleSheet.create({});
