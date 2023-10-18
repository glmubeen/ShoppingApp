import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, {useRef} from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch} from 'react-redux';
import {decreaseCartQty, increaseCartQty, removeItem} from '../redux/cartSlice';
import constant from '../constants/constant';
import colors from '../constants/colors';
import {fontsFamily, fontsSize} from '../constants/fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {setLoader} from '../redux/globalSlice';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const CartCard = ({id, title, price, qty, image, attributes, description}) => {
  const navigation = useNavigation();
  const swipeableRef = useRef();
  const dispatch = useDispatch();

  const renderRightActions = item => {
    return (
      <Pressable
        onPress={() => deleteCartItem(item.id)}
        style={styles.renderRightActionsStyle}>
        <FontAwesome
          name={'trash'}
          size={RFPercentage(3)}
          color={'#ff0000a8'}
        />
      </Pressable>
    );
  };
  const deleteCartItem = () => {
    dispatch(setLoader(true));
    setTimeout(() => {
      dispatch(removeItem(id));
      dispatch(setLoader(false));
    }, 1000);
  };
  return (
    <Swipeable
      ref={swipeableRef}
      rightThreshold={200}
      renderRightActions={renderRightActions}
      containerStyle={{
        backgroundColor: '#ff000042',
        borderRadius: widthPercentageToDP(2),
      }}
      onSwipeableOpen={() => deleteCartItem(id)}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ImageView', {data: image})}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{uri: image}}
          />
        </TouchableOpacity>
        <View style={{marginLeft: widthPercentageToDP(4)}}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
          <View style={{marginTop: heightPercentageToDP(0.5)}}>
            {!!attributes &&
              Object.entries(attributes).map(([key, value]) => {
                return (
                  <Text style={styles.attributes}>
                    {key} - {value}
                  </Text>
                );
              })}
          </View>
          <View style={styles.bottom}>
            <Text style={styles.price}>
              {constant.currency}. {price}
            </Text>
            <View style={styles.qty}>
              <Pressable
                onPress={() => {
                  dispatch(decreaseCartQty(id));
                  if (qty < 2) {
                    dispatch(removeItem(id));
                  }
                }}
                style={styles.qtyButton}>
                <FontAwesome5
                  name={qty > 1 ? 'minus' : 'trash'}
                  size={RFPercentage(2)}
                  color={colors.onPrimary}
                />
              </Pressable>
              <Text style={styles.qtyText}>{qty}</Text>
              <Pressable
                onPress={() => {
                  dispatch(increaseCartQty(id));
                }}
                style={styles.qtyButton}>
                <FontAwesome5
                  name={'plus'}
                  size={RFPercentage(2)}
                  color={colors.onPrimary}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: widthPercentageToDP(2),
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qty: {
    width: '50%',
    marginTop: heightPercentageToDP(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    borderRadius: widthPercentageToDP(1),
    width: widthPercentageToDP(25),
    height: widthPercentageToDP(25),
  },
  title: {
    color: colors.textDark,
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.semibold,
    textTransform: 'uppercase',
  },
  description: {
    color: colors.textLight,
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.medium,
    textTransform: 'uppercase',
    width: widthPercentageToDP(50),
    marginTop: heightPercentageToDP(1),
  },
  attributes: {
    color: colors.textDark,
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.medium,
    textTransform: 'uppercase',
    width: widthPercentageToDP(50),
    marginTop: heightPercentageToDP(0.5),
  },
  price: {
    color: colors.textDark,
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.semibold,
    textTransform: 'uppercase',
  },
  qtyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: widthPercentageToDP(8),
    height: widthPercentageToDP(8),
    borderRadius: widthPercentageToDP(1),
  },
  qtyText: {
    marginLeft: widthPercentageToDP(1),
    marginRight: widthPercentageToDP(1),
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.bold,
    color: colors.textDark,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: heightPercentageToDP(1.5),
  },
  renderRightActionsStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(20),
  },
});
