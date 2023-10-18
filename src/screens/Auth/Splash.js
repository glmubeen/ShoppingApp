import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import images from '../../assets/images';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animatable.Image
        animation={'zoomIn'}
        duration={1000}
        useNativeDriver={true}
        easing={'ease-in-out'}
        resizeMode="contain"
        source={images.Logo}
        style={{
          width: widthPercentageToDP(35),
          height: widthPercentageToDP(35),
        }}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
