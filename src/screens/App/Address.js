import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import Input from '../../components/Input';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/globalSlice';
import {WCAPI} from '../../utils/apiRequest';
import {setUser} from '../../redux/userSlice';

const Address = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLogin, userData} = useSelector(state => state.user);

  const AddressSchema = Yup.object().shape({
    fullAddress: Yup.string().required('Please enter your full address'),
    city: Yup.string().required('Please fill the field'),
    country: Yup.string().required('Please fill the field'),
    state: Yup.string().required('Please fill the field'),
    postcode: Yup.string().required('Please fill the field'),
  });

  const saveAddress = value => {
    dispatch(setLoader(true));
    let payload = {
      billing: {
        address_1: value.fullAddress,
        city: value.city,
        country: value.country,
        state: value.state,
        postcode: value.postcode,
      },
      shipping: {
        address_1: value.fullAddress,
        city: value.city,
        country: value.country,
        state: value.state,
        postcode: value.postcode,
      },
    };
    WCAPI.put(`customers/${userData?.id}`, payload)
      .then(response => {
        dispatch(setUser(response));
        dispatch(setLoader(false));
        Toast.show({
          type: 'success',
          text1: 'Successfully',
        });
        navigation.goBack();
      })
      .catch(error => {
        console.log(error.response.data);
        dispatch(setLoader(false));
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Oops some error occurred please try again later',
        });
      });
  };

  return (
    <View style={styles.container}>
      <Header
        leftTitle="Address"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.childWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              fullAddress: userData?.shipping?.address_1
                ? userData?.shipping?.address_1
                : '',
              city: userData?.shipping?.city ? userData?.shipping?.city : '',
              country: userData?.shipping?.country
                ? userData?.shipping?.country
                : '',
              state: userData?.shipping?.state ? userData?.shipping?.state : '',
              postcode: userData?.shipping?.postcode
                ? userData?.shipping?.postcode
                : '',
            }}
            onSubmit={value => {
              saveAddress(value);
            }}
            validationSchema={AddressSchema}>
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldTouched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                <Input
                  title={'Full Address'}
                  placeholderText={'street 1 phase VII DHA..'}
                  value={values.fullAddress}
                  marginTop={heightPercentageToDP(3)}
                  handleOnChangeTxt={handleChange('fullAddress')}
                  onBlur={() => setFieldTouched('fullAddress')}
                  error={touched.fullAddress && errors.fullAddress}
                />
                {touched.fullAddress && errors.fullAddress && (
                  <Text style={styles.errorText}>{errors.fullAddress}</Text>
                )}
                <Input
                  title={'City'}
                  placeholderText={'Lahore, Quetta, Karachi etc..'}
                  value={values.city}
                  marginTop={heightPercentageToDP(3)}
                  handleOnChangeTxt={handleChange('city')}
                  onBlur={() => setFieldTouched('city')}
                  error={touched.city && errors.city}
                />
                {touched.city && errors.city && (
                  <Text style={styles.errorText}>{errors.city}</Text>
                )}
                <Input
                  title={'Country'}
                  placeholderText={'Turkey, Pakistan, Suadia etc...'}
                  value={values.country}
                  marginTop={heightPercentageToDP(3)}
                  handleOnChangeTxt={handleChange('country')}
                  onBlur={() => setFieldTouched('country')}
                  error={touched.country && errors.country}
                />
                {touched.country && errors.country && (
                  <Text style={styles.errorText}>{errors.country}</Text>
                )}
                <Input
                  title={'State'}
                  placeholderText={'sindh, punjab, islamabad etc..'}
                  value={values.state}
                  marginTop={heightPercentageToDP(3)}
                  handleOnChangeTxt={handleChange('state')}
                  onBlur={() => setFieldTouched('state')}
                  error={touched.state && errors.state}
                />
                {touched.state && errors.state && (
                  <Text style={styles.errorText}>{errors.state}</Text>
                )}
                <Input
                  title={'Postcode'}
                  placeholderText={'7333 XXX'}
                  value={values.postcode}
                  marginTop={heightPercentageToDP(3)}
                  keyboardType={'numeric'}
                  handleOnChangeTxt={handleChange('postcode')}
                  onBlur={() => setFieldTouched('postcode')}
                  error={touched.postcode && errors.postcode}
                />
                {touched.postcode && errors.postcode && (
                  <Text style={styles.errorText}>{errors.postcode}</Text>
                )}
                <PrimaryButton
                  text={
                    userData?.shipping?.address_1 !== '' &&
                    userData?.shipping?.city !== '' &&
                    userData?.shipping?.country !== '' &&
                    userData?.shipping?.state !== '' &&
                    userData?.shipping?.postcode !== ''
                      ? 'Save Changes'
                      : 'Save'
                  }
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childWrapper: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  errorText: {
    fontFamily: fontsFamily.medium,
    marginLeft: widthPercentageToDP(1),
    marginTop: heightPercentageToDP(1),
    fontSize: fontsSize.sm2,
    alignSelf: 'flex-start',
    color: '#ff0202',
  },
});
