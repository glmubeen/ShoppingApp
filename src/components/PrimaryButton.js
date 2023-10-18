import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {fontsFamily, fontsSize} from '../constants/fonts';
import colors from '../constants/colors';

const PrimaryButton = ({text, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: heightPercentageToDP(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(4),
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.semibold,
    color: colors.onPrimary,
    textTransform: 'uppercase',
  },
});
