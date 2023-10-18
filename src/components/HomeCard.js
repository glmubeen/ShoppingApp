import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {fontsFamily, fontsSize} from '../constants/fonts';
import colors from '../constants/colors';
import constant from '../constants/constant';
import images from '../assets/images';

const HomeCard = ({title, description, price, image, onPress, addToCart}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}>
      {image ? (
        <Image
          resizeMode="stretch"
          source={{uri: image}}
          style={{width: '100%', height: heightPercentageToDP(20)}}
        />
      ) : (
        <Image
          source={images.Dummy}
          style={{
            width: '100%',
            height: heightPercentageToDP(20),
          }}
        />
      )}
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        {description && (
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        )}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.price}>{`${constant.currency}. ${price}`}</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={addToCart}>
            <Text style={styles.cartText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: widthPercentageToDP(1),
    overflow: 'hidden',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textContainer: {
    padding: widthPercentageToDP(3),
  },
  title: {
    fontFamily: fontsFamily.semibold,
    width: '90%',
    height: heightPercentageToDP(5),
    color: colors.textDark,
    fontSize: fontsSize.md1,
    textTransform: 'uppercase',
  },
  description: {
    width: '90%',
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
    color: colors.textLight,
    height: heightPercentageToDP(5),
    textTransform: 'uppercase',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: heightPercentageToDP(1),
  },
  price: {
    color: colors.textDark,
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    textTransform: 'uppercase',
    width: '80%',
  },
  cartText: {
    color: colors.blue,
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.sm2,
    textTransform: 'uppercase',
  },
});
