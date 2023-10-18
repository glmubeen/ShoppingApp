import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import colors from '../../constants/colors';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import HomeCard from '../../components/HomeCard';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {setLoader} from '../../redux/globalSlice';
import {WCAPI} from '../../utils/apiRequest';

const Search = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchData, setSearchData] = useState([]);
  const [products, setProducts] = useState([]);
  const [text, setText] = useState('');
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    dispatch(setLoader(true));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await WCAPI.get('products');
      const mapData = await response?.map(item => ({
        ...item,
        qty: 0,
      }));
      setProducts(mapData);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const searching = value => {
    setText(value);
    let data = products.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchData(data);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          isBack
          isCart
          onRightPress={() => navigation.navigate('Cart', {from: 'Search'})}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.searchBar(touch)}>
          <TextInput
            value={text}
            onFocus={() => setTouch(true)}
            onBlur={() => setTouch(false)}
            autoCapitalize="none"
            placeholder="Search..."
            onChangeText={text => searching(text)}
            placeholderTextColor={colors.textLight}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (text.length > 0) setText('');
            }}>
            {text.length > 0 ? (
              <AntDesign
                name={'close'}
                size={RFPercentage(2.5)}
                color={colors.textLight}
              />
            ) : (
              <Feather
                name={'search'}
                size={RFPercentage(2.5)}
                color={colors.textLight}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.productContainer}>
          <FlatList
            data={searchData}
            numColumns={2}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View style={{height: heightPercentageToDP(30)}} />
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
                      image={item?.images[0].src}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: touch => ({
    width: '93%',
    alignSelf: 'center',
    borderColor: touch ? colors.primary : 'grey',
    borderWidth: 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(1),
    borderRadius: widthPercentageToDP(4),
    height: heightPercentageToDP(5),
    paddingHorizontal: widthPercentageToDP(4),
  }),
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
});
