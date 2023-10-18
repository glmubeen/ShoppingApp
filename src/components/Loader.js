import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const Loader = () => {
  const isLoader = useSelector(state => state.globalState.isLoader);
  if (isLoader) {
    return (
      <Modal transparent>
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color="#fff" />
        </View>
      </Modal>
    );
  }
  return null;
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
