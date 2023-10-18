import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../constants/colors';

const SimpleModal = ({isVisible, onClose, children, type}) => {
  return (
    <Modal animationType="fade" visible={isVisible} transparent>
      <View style={styles.container}>
        <View style={styles.childrenWarpper}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeBtn}
            activeOpacity={0.8}>
            <AntDesign
              name={'closesquare'}
              size={RFPercentage(3.5)}
              color={colors.textLight}
            />
          </TouchableOpacity>
          {type && type !== '' && type === 'success' ? (
            <Animatable.View
              style={styles.selfCenter}
              animation={'bounceIn'}
              duration={2000}>
              <Ionicons
                name={'checkmark-done-circle-outline'}
                size={RFPercentage(10)}
                color={colors.success}
              />
            </Animatable.View>
          ) : type && type !== '' && type === 'error' ? (
            <Animatable.View
              style={styles.selfCenter}
              animation={'bounceIn'}
              duration={2000}>
              <MaterialIcons
                name={'error-outline'}
                size={RFPercentage(10)}
                color={colors.danger}
              />
            </Animatable.View>
          ) : null}

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default SimpleModal;

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
  childrenWarpper: {
    width: '90%',
    overflow: 'hidden',
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: heightPercentageToDP(2),
    borderRadius: widthPercentageToDP(2),
    maxHeight: heightPercentageToDP(80),
    minHeight: heightPercentageToDP(15),
    backgroundColor: 'white',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  selfCenter: {
    alignSelf: 'center',
  },
});
