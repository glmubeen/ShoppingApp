import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, {useMemo} from 'react';
import Toast from 'react-native-toast-message';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import Header from '../../components/Header';
import CartCard from '../../components/CartCard';
import SecondaryButton from '../../components/SecondaryButton';

const Cart = props => {
  const dispatch = useDispatch();
  let from = props.route.params?.from;
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart);
  const {isLogin, userData} = useSelector(state => state.user);

  const price = useMemo(() => {
    let amount = 0;
    let qty = 0;
    cartData.map(item => {
      amount += item.price * item.qty;
      qty += item.qty;
    });
    return {amount, qty};
  }, [cartData]);

  const gotoCheckout = () => {
    if (isLogin) {
      navigation.navigate('Checkout');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please login for placed your order',
      });
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <View style={styles.container}>
        {from && (
          <Header
            leftTitle="Cart"
            isBack
            isRightIcon={false}
            onLeftPress={() => navigation.goBack()}
          />
        )}
        {cartData && cartData.length > 0 ? (
          <FlatList
            data={cartData}
            initialNumToRender={10}
            keyExtractor={({_, index}) => index?.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View style={{height: heightPercentageToDP(30)}} />
            )}
            renderItem={({item}) => (
              <View style={styles.cardWrapper}>
                <CartCard
                  id={item.id}
                  title={item.name}
                  price={item.price}
                  qty={item.qty}
                  description={item.description}
                  attributes={item.attributes}
                  image={item?.images[0]?.src}
                />
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyComponent}>
            <MaterialCommunityIcons
              name={'cart-heart'}
              size={RFPercentage(16)}
              color={colors.textDark}
            />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyDesc}>
              Look like you have not added anything to you cart. Go ahead &
              explore top category
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.9}
              style={styles.exploreBtn}>
              <Text style={styles.exploreText}>Explore Now</Text>
              <Ionicons
                name={'chevron-forward'}
                size={RFPercentage(2)}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {cartData?.length > 0 && (
        <View style={styles.bottom(from)}>
          <View style={styles.bottomInner}>
            <View>
              <Text style={[styles.mediumText, {textAlign: 'left'}]}>
                Qty:{' '}
              </Text>
              <Text style={[styles.boldText, {textAlign: 'left'}]}>
                Total Amount:
              </Text>
            </View>
            <View>
              <Text style={[styles.mediumText, {textAlign: 'right'}]}>
                x{price.qty}
              </Text>
              <Text style={[styles.boldText, {textAlign: 'right'}]}>
                {constant.currency}.{' '}
                {parseInt(price.amount).toLocaleString('en-US')}
              </Text>
            </View>
          </View>

          <SecondaryButton
            text={'Address & Payment'}
            onPress={() => gotoCheckout()}
          />
        </View>
      )}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  cardWrapper: {
    width: '94%',
    alignSelf: 'center',
    marginTop: heightPercentageToDP(1.5),
  },
  bottom: from => ({
    paddingHorizontal: widthPercentageToDP(5),
    paddingTop: heightPercentageToDP(1),
    paddingBottom: from ? heightPercentageToDP(5) : 1,
    bottom: heightPercentageToDP(0),
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#eeeeee',
  }),
  bottomInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(2),
  },
  mediumText: {
    color: colors.textLight,
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.medium,
  },
  boldText: {
    color: colors.textDark,
    fontSize: fontsSize.lg1,
    fontFamily: fontsFamily.bold,
    marginTop: heightPercentageToDP(1),
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(2),
    borderRadius: widthPercentageToDP(2),
  },
  bottomButtonText: {
    marginLeft: widthPercentageToDP(1),
    fontSize: fontsSize.lg1,
    fontFamily: fontsFamily.bold,
    color: 'white',
  },
  emptyComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP(10),
  },
  emptyTitle: {
    fontSize: fontsSize.xxl1,
    fontFamily: fontsFamily.medium,
    marginTop: heightPercentageToDP(1),
    color: colors.textDark,
  },
  emptyDesc: {
    textAlign: 'center',
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    color: colors.textLight,
    marginTop: heightPercentageToDP(2),
  },
  exploreBtn: {
    backgroundColor: colors.primary,
    marginTop: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(1),
    borderRadius: widthPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exploreText: {
    textAlign: 'center',
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.bold,
    color: 'white',
  },
});
