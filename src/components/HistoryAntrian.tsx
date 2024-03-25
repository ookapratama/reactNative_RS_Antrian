import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {ListItem, Text} from '@ui-kitten/components';

interface IListItem {
  title: string;
  description: string;
}

const HistoryAntrian = () => {
  const renderListItem = ({item, index}: {item: IListItem; index: number}) => {
    <ListItem />;
  };

  return (
    <View>
      <Text category="h4">HistoryAntrian</Text>
      <ScrollView>
        <Text>List</Text>
      </ScrollView>
    </View>
  );
};

export default HistoryAntrian;

const styles = StyleSheet.create({});
