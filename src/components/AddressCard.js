import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import {fontsFamily, fontsSize} from '../constants/fonts';

const AddressCard = ({address, city, country, postcode, onPress}) => {
  if (address && city && country && postcode) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.selectedAddress}>
        <View>
          <View style={styles.addressRow}>
            <FontAwesome5
              name={'map-marked-alt'}
              size={RFPercentage(1.9)}
              color={colors.textLight}
            />
            <Text style={styles.addressText}>{address}</Text>
          </View>
          <View style={styles.addressRow}>
            <FontAwesome5
              name={'city'}
              size={RFPercentage(1.8)}
              color={colors.textLight}
            />
            <Text style={styles.addressText}>
              {city}, {country}
            </Text>
          </View>
          <View style={styles.addressRow}>
            <Fontisto
              name={'shopping-pos-machine'}
              size={RFPercentage(2)}
              color={colors.textLight}
            />
            <Text style={styles.addressText}>{postcode}</Text>
          </View>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <Ionicons
            name={'chevron-forward'}
            size={RFPercentage(3)}
            color={colors.textLight}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.selectedAddress}>
        <Text style={styles.addressText}>
          Please select your shipping address
        </Text>
        <Ionicons
          name={'chevron-forward'}
          size={RFPercentage(3)}
          color={colors.textLight}
        />
      </TouchableOpacity>
    );
  }
};

export default AddressCard;

const styles = StyleSheet.create({
  selectedAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: heightPercentageToDP(0.8),
    marginBottom: heightPercentageToDP(0.8),
  },
  addressText: {
    color: colors.textLight,
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    marginLeft: widthPercentageToDP(2),
  },
});
