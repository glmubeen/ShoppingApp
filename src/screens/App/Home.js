import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Header from '../../components/Header';
import HomeCard from '../../components/HomeCard';
import constant from '../../constants/constant';
import {addToCart} from '../../redux/cartSlice';
import {setLoader} from '../../redux/globalSlice';
import Images from '../../assets/images';
import {WCAPI} from '../../utils/apiRequest';
import SimpleModal from '../../components/SimpleModal';
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState('');

  useEffect(() => {
    dispatch(setLoader(true));
    fetchData();
    fetchCategory();
  }, []);

  const fetchData = async () => {
    try {
      const response = await WCAPI.get('products');
      const mapData = await response?.map(item => ({
        ...item,
        qty: 0,
      }));
      setProducts(mapData);
      const filterBanners = await response
        ?.map(item => item?.images[0]?.src)
        .slice(0, Math.round(response?.length / 2).toFixed(0));
      setBanners(filterBanners);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await WCAPI.get(`products/categories`);
      const mapData = await response?.map(item => ({
        catId: item.id,
        catName: item.name,
        itemCount: item.count,
      }));
      setCategory(mapData);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const selectCategory = id => {
    WCAPI.get('products', {category: id})
      .then(response => {
        const mapData = response?.map(item => ({
          ...item,
          qty: 0,
        }));
        setSelectedCatId(id);
        setProducts(mapData);
        dispatch(setLoader(false));
      })
      .catch(err => {
        dispatch(setLoader(false));
      });
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
    [products],
  );

  const onRefresh = () => {
    setIsRefresh(true);
    fetchData();
    setIsRefresh(false);
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <Header
            isFilter
            onFilter={() => setIsFilter(true)}
            title={constant.appName}
            onLeftPress={() => navigation.openDrawer()}
            onRightPress={() => navigation.navigate('Search')}
          />
          <View style={styles.productContainer}>
            <FlatList
              data={products}
              numColumns={2}
              keyExtractor={({_, index}) => index?.toString()}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
              }
              ListFooterComponent={() => (
                <View style={{height: heightPercentageToDP(15)}} />
              )}
              ListHeaderComponent={() => (
                <View style={styles.bannerContainer}>
                  {banners && banners.length > 0 ? (
                    <Carousel
                      autoplay
                      loop={5}
                      layout="stack"
                      data={banners}
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
              )}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.box}>
                    <View style={styles.innerBox(index)}>
                      <HomeCard
                        onPress={() =>
                          navigation.navigate('ProductDetail', {data: item})
                        }
                        addToCart={() => {
                          if (item.attributes && item.attributes.length > 0) {
                            navigation.navigate('ProductDetail', {data: item});
                          } else {
                            dispatch(addToCart({...item, qty: 1}));
                          }
                        }}
                        title={item.name}
                        description={item.description}
                        price={item.price}
                        image={item?.images[0]?.src}
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </View>
      <SimpleModal isVisible={isFilter} onClose={() => setIsFilter(false)}>
        <FlatList
          data={category}
          ListHeaderComponent={() => (
            <Text style={styles.headingCat}>Select Category</Text>
          )}
          ListFooterComponent={() => (
            <View style={{height: heightPercentageToDP(1)}} />
          )}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsFilter(false);
                  selectCategory(item.catId);
                }}
                style={styles.categoryBox(selectedCatId, item.catId)}>
                <Text style={styles.categoryText(selectedCatId, item.catId)}>
                  {item.catName} ({item.itemCount})
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </SimpleModal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    alignSelf: 'center',
    width: '93%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: heightPercentageToDP(25),
    borderRadius: widthPercentageToDP(1),
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(1),

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
  productContainer: {
    width: '100%',
  },
  box: {
    width: '50%',
    alignItems: 'center',
  },
  innerBox: index => ({
    width: '90%',
    alignSelf: index % 2 == 0 ? 'flex-end' : 'flex-start',
    marginLeft: index % 2 == 0 ? 0 : widthPercentageToDP(1.5),
    marginRight: index % 2 == 0 ? widthPercentageToDP(1.5) : 0,
    marginTop: heightPercentageToDP(1.5),
  }),
  categoryBox: (selectedCatId, id) => ({
    backgroundColor: 'white',
    marginTop: heightPercentageToDP(1.5),
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1.5),
    borderRadius: widthPercentageToDP(2),
    borderWidth: 1,
    borderColor: selectedCatId === id ? colors.primary : colors.textLight,
  }),
  categoryText: (selectedCatId, id) => ({
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    textTransform: 'uppercase',
    color: selectedCatId === id ? colors.primary : colors.textLight,
  }),
  headingCat: {
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md1,
    textTransform: 'uppercase',
    color: colors.primary,
  },
});
