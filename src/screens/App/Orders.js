import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import constant from '../../constants/constant';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import {WCAPI} from '../../utils/apiRequest';
import {setLoader} from '../../redux/globalSlice';

const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {isLogin, userData} = useSelector(state => state.user);

  const [orders, setOrders] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const onRefresh = () => {
    setIsRefresh(true);
    getOrders();
    setIsRefresh(false);
  };

  useEffect(() => {
    dispatch(setLoader(true));
    getOrders();
  }, []);

  const getOrders = () => {
    WCAPI.get('orders', {customer: userData?.id, per_page: 55})
      .then(response => {
        setOrders(response);
        dispatch(setLoader(false));
      })
      .catch(error => {
        dispatch(setLoader(false));
        console.log(error.response.data);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        leftTitle="Orders"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {orders.length > 0 ? (
          <FlatList
            data={orders}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
            ListFooterComponent={() => (
              <View style={{height: heightPercentageToDP(10)}} />
            )}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('OrderDetail', {data: item})
                  }
                  activeOpacity={0.8}
                  style={styles.card}>
                  <View style={styles.wrapper}>
                    {item?.id && (
                      <Text style={styles.orderId}>
                        Order Id {item?.order_key}
                      </Text>
                    )}
                    {item?.total && (
                      <Text style={styles.totalPrice}>
                        {constant.currency}{' '}
                        {parseInt(item.total).toLocaleString('en-US')}
                      </Text>
                    )}
                    {item.date_created && (
                      <Text style={styles.time}>
                        {moment(item.date_created).format('MM-DD-YY hh:mm A')}
                      </Text>
                    )}
                    {item?.line_items?.length > 1 && (
                      <Text style={styles.more}>more item</Text>
                    )}
                  </View>
                  <View>
                    <Ionicons
                      name={'chevron-forward'}
                      size={RFPercentage(4)}
                      color={colors.textDark}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={styles.emptyComponent}>
            <Text style={styles.emptyTitle}>(0) orders</Text>
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
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  card: {
    width: '93%',
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(1),
    borderRadius: widthPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapper: {
    width: '85%',
  },
  orderId: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    color: colors.textDark,
    textTransform: 'uppercase',
  },
  totalPrice: {
    marginTop: heightPercentageToDP(0.5),
    fontSize: fontsSize.lg1,
    fontFamily: fontsFamily.semibold,
    color: colors.textDark,
  },
  time: {
    marginTop: heightPercentageToDP(1),
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.semibold,
    color: colors.textLight,
  },
  more: {
    marginTop: heightPercentageToDP(1),
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.regular,
    color: colors.textLight,
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
