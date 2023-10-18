import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {fontsFamily, fontsSize} from '../constants/fonts';
import {useSelector} from 'react-redux';

const Badge = ({top = -1, right = -1.5}) => {
  const cartData = useSelector(state => state.cart);
  return (
    <Animatable.View animation={'rotate'} style={styles.badgeCount(top, right)}>
      <Text style={styles.count}>{cartData?.length}</Text>
    </Animatable.View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badgeCount: (top, right) => ({
    backgroundColor: 'red',
    width: widthPercentageToDP(4.5),
    height: widthPercentageToDP(4.5),
    position: 'absolute',
    zIndex: 1000,
    top: heightPercentageToDP(top),
    right: widthPercentageToDP(right),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  count: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.sm1,
    color: 'white',
  },
});
