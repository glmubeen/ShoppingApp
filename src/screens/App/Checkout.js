import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import SecondaryButton from '../../components/SecondaryButton';
import {setLoader} from '../../redux/globalSlice';
import SimpleModal from '../../components/SimpleModal';
import Alert from '../../components/Alert';
import {WCAPI} from '../../utils/apiRequest';
import {emptyCart} from '../../redux/cartSlice';
import AddressCard from '../../components/AddressCard';

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart);
  const {isLogin, userData} = useSelector(state => state.user);

  const [contactNo, setContactNo] = useState(
    isLogin ? userData?.billing?.phone : '',
  );
  const [isCod, setIsCod] = useState(true);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);
  const [payload, setPayload] = useState({});

  const price = useMemo(() => {
    let amount = 0;
    let qty = 0;
    cartData.map(item => {
      amount += item.price * item.qty;
      qty += item.qty;
    });
    return {amount, qty};
  }, [cartData]);

  const checkout = () => {
    dispatch(setLoader(true));
    let cartMapped = cartData.map(item => ({
      product_id: item.id,
      quantity: item.qty,
    }));
    if (userData?.shipping?.address_1 && contactNo) {
      let payload = {
        payment_method: isCod ? 'cash on Delivery' : 'online',
        payment_method_title: isCod ? 'cash on Delivery' : 'online',
        customer_id: userData?.id,
        set_paid: true,
        billing: {...userData?.billing, phone: contactNo},
        shipping: userData?.shipping,
        line_items: cartMapped,
      };
      WCAPI.post('orders', payload)
        .then(response => {
          setPayload(response);
          setIsCheckoutModal(true);
          dispatch(setLoader(false));
          dispatch(emptyCart());
        })
        .catch(error => {
          console.log(error.response.data);
          dispatch(setLoader(false));
          Toast.show({
            type: 'error',
            text1: 'Oops order placed some issues please try again later',
          });
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please fill the field',
      });
      dispatch(setLoader(false));
    }
  };

  const gotoOrderDetail = () => {
    setIsCheckoutModal(false);
    navigation.navigate('OrderDetail', {data: payload, fromCheckout: true});
  };

  return (
    <View style={styles.container}>
      <Header
        leftTitle="Checkout"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.child}>
          <AddressCard
            address={userData?.shipping?.address_1}
            city={userData?.shipping?.city}
            country={userData?.shipping?.country}
            postcode={userData?.shipping?.postcode}
            onPress={() => navigation.navigate('Address')}
          />
          <Input
            title={'contact number'}
            placeholderText={'+971 XXX-XXXX'}
            value={contactNo}
            handleOnChangeTxt={text => setContactNo(text)}
            marginTop={heightPercentageToDP(3)}
            keyboardType={'numeric'}
          />
          <View>
            <Text style={styles.paymentTitle}>Payment Type</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsCod(true)}
              style={[
                styles.payment,
                {
                  borderWidth: isCod ? 0.5 : 0,
                  borderColor: isCod ? colors.primary : 'grey',
                },
              ]}>
              <Ionicons
                name={
                  isCod
                    ? 'ios-radio-button-on-outline'
                    : 'md-radio-button-off-sharp'
                }
                size={RFPercentage(2.2)}
                color={isCod ? colors.primary : colors.textLight}
              />
              <Text style={styles.paymentText(isCod)}>Cash On Deliver</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsCod(false)}
              style={[
                styles.payment,
                {
                  borderWidth: !isCod ? 0.5 : 0,
                  borderColor: !isCod ? colors.primary : 'grey',
                  marginTop: heightPercentageToDP(1),
                },
              ]}>
              <Ionicons
                name={
                  !isCod
                    ? 'ios-radio-button-on-outline'
                    : 'md-radio-button-off-sharp'
                }
                size={RFPercentage(2.2)}
                color={!isCod ? colors.primary : colors.textLight}
              />
              <Text style={styles.paymentText(!isCod)}>Online Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <SecondaryButton
          text={`Pay Now ( Rs.${price.amount.toLocaleString('en-US')} )`}
          onPress={() => checkout()}
        />
      </View>
      <SimpleModal
        type={'success'}
        isVisible={isCheckoutModal}
        onClose={() => setIsCheckoutModal(false)}>
        <Alert
          heading={'Success'}
          message={`Your order has been successfully placed if you check the order history then touch the view order button and now see your order history`}
          buttonText={'View Order History'}
          onPress={() => gotoOrderDetail()}
        />
      </SimpleModal>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  child: {
    width: '90%',
    alignSelf: 'center',
  },
  payment: {
    backgroundColor: 'white',
    borderRadius: widthPercentageToDP(2),
    alignItems: 'center',
    flexDirection: 'row',
    height: heightPercentageToDP(6),
    paddingHorizontal: widthPercentageToDP(3),
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentText: isCod => ({
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.semibold,
    marginLeft: widthPercentageToDP(2),
    color: isCod ? colors.primary : colors.textLight,
  }),
  paymentTitle: {
    fontSize: fontsSize.md1,
    textTransform: 'uppercase',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: widthPercentageToDP(2),
    marginBottom: heightPercentageToDP(1.5),
    marginTop: heightPercentageToDP(3),
    color: '#3b3b3b',
    fontFamily: fontsFamily.bold,
  },
  bottom: {
    paddingHorizontal: widthPercentageToDP(5),
    paddingTop: heightPercentageToDP(1),
    paddingBottom: heightPercentageToDP(5),
    position: 'absolute',
    bottom: heightPercentageToDP(0),
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#eeeeee',
  },
  bottomInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  selectedAddress: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP(1.2),
  },
  addressText: {
    color: colors.textLight,
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    marginLeft: widthPercentageToDP(2),
  },
});
