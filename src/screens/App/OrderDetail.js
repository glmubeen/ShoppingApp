import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import React, {useMemo} from 'react';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import constant from '../../constants/constant';

const OrderDetail = props => {
  const navigation = useNavigation();
  const {data, fromCheckout} = props?.route?.params;

  const calculateQty = useMemo(() => {
    let qty = 0;
    data.line_items.map(x => {
      qty += x.quantity;
    });
    return qty;
  }, [data]);

  return (
    <View style={styles.container}>
      <Header
        leftTitle={'Order Detail'}
        isBack
        isRightIcon={false}
        onLeftPress={() => {
          if (fromCheckout) {
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTabStack'}],
            });
          } else {
            navigation.goBack();
          }
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Text style={styles.lightText}>Order Id</Text>
          <Text style={styles.boldText}>{data?.order_key}</Text>
          <Text style={styles.lightText}>Deliver to</Text>
          <Text style={styles.boldText}>{data?.shipping?.address_1}</Text>
          <Text style={styles.lightText}>Payment Type</Text>
          <Text style={styles.boldText}>{data?.payment_method_title}</Text>
          <Text style={styles.lightText}>Date & Time</Text>
          <Text style={styles.boldText}>
            {moment(data?.date_created).format('MM-DD-YY hh:mm A')}
          </Text>

          <FlatList
            data={data?.line_items}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            keyExtractor={({_, index}) => index?.toString()}
            ListFooterComponent={() => (
              <View style={{height: heightPercentageToDP(20)}} />
            )}
            renderItem={({item}) => {
              return (
                <View style={styles.cardWrapper}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('ImageView', {data: item?.image?.src})
                    }>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{uri: item?.image?.src}}
                    />
                  </TouchableOpacity>
                  <View style={{marginLeft: widthPercentageToDP(4)}}>
                    <Text style={styles.title}>{item?.name}</Text>
                    <Text numberOfLines={2} style={styles.description}>
                      {item?.description}
                    </Text>
                    <View style={{marginTop: heightPercentageToDP(0.5)}}>
                      {item.attributes &&
                        Object.entries(item.attributes).map(([key, value]) => {
                          return (
                            <Text style={styles.attributes}>
                              {key} - {value}
                            </Text>
                          );
                        })}
                    </View>
                    <View style={styles.bottom}>
                      <Text style={styles.price}>
                        {constant.currency}.{' '}
                        {parseInt(item?.price).toLocaleString('en-US')}
                        <Text style={styles.qty}>
                          {'  '}X{item?.quantity}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.footerWrapper}>
        <View style={styles.bottomInner}>
          <View>
            <Text style={[styles.mediumText, {textAlign: 'left'}]}>Qty: </Text>
            <Text style={[styles.boldText, {textAlign: 'left'}]}>
              Total Amount:
            </Text>
          </View>
          <View>
            <Text style={[styles.mediumText, {textAlign: 'right'}]}>
              x{calculateQty}
            </Text>
            <Text style={[styles.boldText, {textAlign: 'right'}]}>
              {constant.currency}
              {'. '}
              {parseInt(data?.total).toLocaleString('en-US')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  wrapper: {
    paddingHorizontal: widthPercentageToDP(4),
    marginTop: heightPercentageToDP(1),
  },
  lightText: {
    marginTop: heightPercentageToDP(2),
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.medium,
    color: colors.textLight,
  },

  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: heightPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(2),
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
  qty: {
    color: colors.lightText,
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.medium,
    textTransform: 'uppercase',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: heightPercentageToDP(1.5),
  },
  footerWrapper: {
    paddingHorizontal: widthPercentageToDP(5),
    paddingTop: heightPercentageToDP(1),
    paddingBottom: heightPercentageToDP(5),
    bottom: heightPercentageToDP(0),
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#eeeeee',
  },
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
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.semibold,
    marginTop: heightPercentageToDP(1),
  },
});
