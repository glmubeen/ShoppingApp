import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import images from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';
import {fontsFamily, fontsSize} from '../constants/fonts';

const LoginWrapper = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={images.Logo} style={styles.logo} />
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Continue to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: widthPercentageToDP(40),
    height: widthPercentageToDP(40),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(6),
    borderRadius: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
  },
  text: {
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.semibold,
    color: colors.onPrimary,
    textTransform: 'uppercase',
  },
});
