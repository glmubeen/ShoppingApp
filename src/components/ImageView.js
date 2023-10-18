import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');

const ImageView = ({navigation, ...props}) => {
  const {data} = props.route.params;
  return (
    <View style={styles.container}>
      {Array.isArray(data) ? (
        <FlatList
          data={data}
          pagingEnabled
          horizontal
          renderItem={({item}) => {
            return (
              <View style={styles.imageWrapper}>
                <Image
                  resizeMode="contain"
                  source={{uri: item}}
                  style={styles.images}
                />
              </View>
            );
          }}
        />
      ) : (
        <Image
          resizeMode="contain"
          source={{uri: data}}
          style={styles.images}
        />
      )}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeBtn}>
        <AntDesign
          name={'closesquare'}
          size={RFPercentage(3.5)}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: width,
    height: height,
  },
  images: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: heightPercentageToDP(4),
    right: widthPercentageToDP(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
