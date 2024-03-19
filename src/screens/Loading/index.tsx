import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Modal, Spinner, Text} from '@ui-kitten/components';
import {VStack} from '../../components';

const Loading = () => {
  return (
    <Modal visible backdropStyle={styles.backdrop}>
      <VStack itemsCenter>
        <Text style={{fontSize: 20, fontWeight: 600, marginBottom: 14}}>
          Loading . . .
        </Text>
        <Spinner size="giant" />
      </VStack>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});