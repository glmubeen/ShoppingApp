import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React from 'react';
import {View, TextInput, Dimensions, Text, StyleSheet} from 'react-native';
import {fontsFamily, fontsSize} from '../constants/fonts';
const {width, height} = Dimensions.get('window');

const Input = ({
  value,
  placeholderText,
  isPassword,
  handleOnChangeTxt,
  keyboardType,
  editable = true,
  title,
  marginTop,
  error,
  ...props
}) => {
  return (
    <>
      <Text style={styles.titleTxt(marginTop)}>{title}</Text>
      <View style={styles.container}>
        <View>
          <TextInput
            editable={editable}
            value={value}
            placeholder={placeholderText}
            placeholderTextColor="#c6c6c6"
            style={[styles.textInput]}
            onChangeText={handleOnChangeTxt}
            secureTextEntry={isPassword}
            keyboardType={keyboardType}
            {...props}
          />
        </View>
      </View>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightPercentageToDP(6),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: widthPercentageToDP(2),
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    fontSize: fontsSize.md2,
    padding: 0,
    width: widthPercentageToDP(80),
    color: 'grey',
    marginLeft: widthPercentageToDP(5),
  },
  errorMessage: {
    fontSize: width * 0.032,
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: height * 0.005,
    marginBottom: height * 0.01,
  },
  titleTxt: marginTop => ({
    marginTop: marginTop,
    fontSize: fontsSize.md1,
    textTransform: 'uppercase',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: widthPercentageToDP(2),
    marginBottom: heightPercentageToDP(1.5),
    color: '#3b3b3b',
    fontFamily: fontsFamily.bold,
  }),
});
