import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {fontsFamily, fontsSize} from '../constants/fonts';
import colors from '../constants/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';

const SecondaryButton = ({text, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.bottomButton}>
      <Text style={styles.bottomButtonText}>{text}</Text>
      <Ionicons
        name={'chevron-forward'}
        size={RFPercentage(4)}
        color={'white'}
      />
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  bottomButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(2),
    borderRadius: widthPercentageToDP(2),
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomButtonText: {
    marginLeft: widthPercentageToDP(1),
    fontSize: fontsSize.lg1,
    fontFamily: fontsFamily.bold,
    color: colors.onPrimary,
  },
});
