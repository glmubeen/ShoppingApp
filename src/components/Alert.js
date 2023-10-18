import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import colors from '../constants/colors';
import {fontsFamily, fontsSize} from '../constants/fonts';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import PrimaryButton from './PrimaryButton';

const Alert = ({heading, message, icon, buttonText, onPress}) => {
  return (
    <View style={styles.container}>
      <Animatable.View animation={'bounceIn'} duration={2000}>
        {icon}
      </Animatable.View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.message}>{message}</Text>
      <PrimaryButton text={buttonText} onPress={onPress} />
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.lg2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: heightPercentageToDP(1),
    color: colors.textDark,
  },
  message: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
    textAlign: 'center',
    marginTop: heightPercentageToDP(1),
    color: colors.textLight,
  },
});
