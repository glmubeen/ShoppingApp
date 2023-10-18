import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import Header from '../../components/Header';
import DividerHorizontal from '../../components/DividerHorizontal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Images from '../../assets/images/index';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import {setLoader} from '../../redux/globalSlice';
const {width, height} = Dimensions.get('window');

const ProductDetail = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = props.route.params;
  const [quantity, setQuantity] = useState(1);
  const [seletedAttributes, setSeletedAttributes] = useState({});
  const [titleHidden, setTitleHidden] = useState(false);

  useEffect(() => {
    if (!!data?.attributes) {
      let obj = {};
      data?.attributes?.map(item => {
        item.options.map((option, index) => {
          if (index === 0) {
            obj[item?.name] = option;
          }
        });
      });
      setSeletedAttributes(obj);
    }
  }, [data]);

  const selectOption = (value, option) => {
    let cloneObj = {...seletedAttributes};
    cloneObj[value] = option;
    setSeletedAttributes(cloneObj);
  };

  const onAddToCart = () => {
    dispatch(setLoader(true));
    dispatch(
      addToCart({
        ...data,
        qty: quantity,
        attributes: seletedAttributes ? seletedAttributes : {},
      }),
    );
    setTimeout(() => {
      dispatch(setLoader(false));
      navigation.goBack();
    }, 1000);
  };
  const plusQty = () => {
    setQuantity(quantity + 1);
  };
  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderBanner = useCallback(
    ({item}) => {
      return (
        <View style={styles.banner}>
          <Image
            resizeMode="stretch"
            style={styles.bannerImage}
            source={{uri: item}}
          />
        </View>
      );
    },
    [data],
  );
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <Header
            isBack
            isCart
            title={titleHidden ? data?.name : ''}
            onLeftPress={() => navigation.goBack()}
            onRightPress={() =>
              navigation.navigate('Cart', {from: 'ProductDetail'})
            }
          />
          <ScrollView
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: heightPercentageToDP(20)}}
            onScroll={e => {
              if (e.nativeEvent.contentOffset.y > 200) {
                setTitleHidden(true);
              } else {
                setTitleHidden(false);
              }
            }}>
            <View>
              <View style={styles.bannerContainer}>
                {data.images && data.images.length > 0 ? (
                  <Carousel
                    autoplay
                    loop={5}
                    layout="stack"
                    data={[data.images[0]?.src]}
                    renderItem={renderBanner}
                    sliderWidth={widthPercentageToDP(93)}
                    itemWidth={widthPercentageToDP(93)}
                  />
                ) : (
                  <Image
                    source={Images.Dummy}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{data?.name}</Text>
                {data?.description && (
                  <Text style={styles.description}>{data?.description}</Text>
                )}
                <Text style={styles.price}>
                  {constant.currency}.{' '}
                  {parseInt(data?.price).toLocaleString('en-US')}
                </Text>
              </View>
              <DividerHorizontal w="90%" />
              <View style={styles.attributesContainer}>
                <FlatList
                  data={data?.attributes}
                  ListFooterComponent={() => (
                    <View style={{height: heightPercentageToDP(10)}} />
                  )}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.attributesBox}>
                        <Text style={styles.attributesTitle}>{item.name}</Text>
                        <View style={styles.innerBox}>
                          {item?.options?.map(option => {
                            return (
                              <Pressable
                                onPress={() => selectOption(item?.name, option)}
                                style={styles.selectAttributes(
                                  seletedAttributes[item?.name],
                                  option,
                                )}>
                                <Text
                                  style={styles.attributesText(
                                    seletedAttributes[item?.name],
                                    option,
                                  )}>
                                  {option}
                                </Text>
                              </Pressable>
                            );
                          })}
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={styles.bottomBar}>
        <Pressable
          onPress={() => minusQty()}
          style={[styles.qtyButton, styles.shadow]}>
          <FontAwesome5
            name={'minus'}
            size={RFPercentage(2.5)}
            color={'white'}
          />
        </Pressable>
        <Pressable
          onPress={() => onAddToCart()}
          style={[styles.addToCartButton, styles.shadow]}>
          <Text style={styles.addToCartText}>Add To Cart x {quantity}</Text>
        </Pressable>
        <Pressable
          onPress={() => plusQty()}
          style={[styles.qtyButton, styles.shadow]}>
          <FontAwesome5
            name={'plus'}
            size={RFPercentage(2.5)}
            color={'white'}
          />
        </Pressable>
      </View>
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: heightPercentageToDP(28),

    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  banner: {
    width: widthPercentageToDP(100),
    backgroundColor: 'white',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: widthPercentageToDP(6),
    marginTop: heightPercentageToDP(3),
  },
  title: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.lg1,
    textTransform: 'uppercase',
    color: colors.textDark,
  },
  description: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.sm2,
    textTransform: 'uppercase',
    color: colors.textLight,
    marginTop: heightPercentageToDP(0.5),
  },
  price: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.textDark,
    marginTop: heightPercentageToDP(2.5),
  },
  attributesContainer: {
    marginTop: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(6),
  },
  attributesBox: {
    width: widthPercentageToDP(90),
    alignItems: 'flex-start',
    marginTop: heightPercentageToDP(1.5),
    marginBottom: heightPercentageToDP(1),
  },
  attributesTitle: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    color: colors.textDark,
  },
  innerBox: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP(0.5),
    flexWrap: 'wrap',
  },
  selectAttributes: (isSelected, option) => ({
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: widthPercentageToDP(2),
    borderWidth: 0.5,
    borderRadius: 100,
    borderColor: colors.primary,
    marginRight: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(1),
    backgroundColor: isSelected === option ? colors.primary : 'white',
  }),
  attributesText: (isSelected, option) => ({
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    color: isSelected === option ? 'white' : colors.textLight,
  }),
  qtyButton: {
    backgroundColor: '#bbbbbb',
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthPercentageToDP(1),
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
  },
  bottomBar: {
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: heightPercentageToDP(4),
    paddingTop: heightPercentageToDP(1),
  },
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(10),
    borderRadius: widthPercentageToDP(1),
  },
  addToCartText: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md1,
  },
});
