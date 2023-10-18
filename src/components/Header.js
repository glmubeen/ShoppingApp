import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import colors from '../constants/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {fontsFamily, fontsSize} from '../constants/fonts';
import {useSelector} from 'react-redux';
import Badge from './Badge';

const Header = ({
  title,
  onLeftPress,
  onRightPress,
  onFilter,
  isCart = false,
  isBack = false,
  isRightIcon = true,
  isLeftIcon = true,
  leftTitle = false,
  isFilter = false,
}) => {
  const cartData = useSelector(state => state.cart);
  return (
    <View style={styles.container}>
      {isLeftIcon && (
        <Pressable onPress={onLeftPress} style={styles.left}>
          {!isBack ? (
            <SimpleLineIcons
              name={'menu'}
              size={RFPercentage(2.5)}
              color={'grey'}
            />
          ) : (
            <MaterialIcons
              name={'arrow-back-ios'}
              size={RFPercentage(2.5)}
              color={'grey'}
            />
          )}
          {leftTitle && <Text style={styles.leftTitle}>{leftTitle}</Text>}
        </Pressable>
      )}
      <View style={styles.selfSixty}>
        {title && (
          <Animatable.Text
            animation={'fadeIn'}
            duration={1000}
            numberOfLines={1}
            style={styles.title}>
            {title}
          </Animatable.Text>
        )}
      </View>
      {isRightIcon && !isFilter && (
        <Pressable onPress={onRightPress} style={{width: '20%'}}>
          {isCart && cartData.length > 0 && <Badge />}
          {!isCart ? (
            <View style={{alignSelf: 'flex-end'}}>
              <Feather name="search" size={RFPercentage(2.5)} color={'grey'} />
            </View>
          ) : (
            <View style={{alignSelf: 'flex-end'}}>
              <MaterialCommunityIcons
                name="cart"
                size={RFPercentage(2.5)}
                color={'grey'}
              />
            </View>
          )}
        </Pressable>
      )}
      {isRightIcon && isFilter && (
        <View style={styles.selfEnd}>
          <View style={styles.rowDirectionEnd}>
            <Pressable onPress={onFilter}>
              <MaterialCommunityIcons
                name="filter"
                size={RFPercentage(2.5)}
                color={'grey'}
              />
            </Pressable>
            <Pressable onPress={onRightPress} style={styles.searchIc}>
              <Feather name="search" size={RFPercentage(2.5)} color={'grey'} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: widthPercentageToDP(3),
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '20%',
  },
  title: {
    textAlign: 'center',
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md2,
    color: colors.primary,
  },
  leftTitle: {
    textAlign: 'left',
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.lg2,
    width: widthPercentageToDP(70),
    color: 'grey',
  },
  selfEnd: {
    width: '20%',
    alignSelf: 'flex-end',
  },
  rowDirectionEnd: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  searchIc: {
    marginLeft: widthPercentageToDP(2),
    alignSelf: 'flex-end',
  },
  selfSixty: {
    alignSelf: 'center',
    width: '60%',
  },
});
