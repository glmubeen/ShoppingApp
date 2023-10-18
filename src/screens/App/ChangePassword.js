import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/userSlice';
import {setLoader} from '../../redux/globalSlice';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import {WCAPI} from '../../utils/apiRequest';

const ChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('This field is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please choose a password')
      .notOneOf(
        [Yup.ref('oldPassword')],
        'This password is matching your old password please create a different password',
      ),
    confirmPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('This field is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords does not match'),
  });

  const saveChanges = value => {
    dispatch(setLoader(true));

    let payload = {password: value.newPassword};

    WCAPI.put(`customers/${userData?.id}`, payload)
      .then(response => {
        dispatch(setUser(response));
        dispatch(setLoader(false));
        Toast.show({
          type: 'success',
          text1: 'Successfully change password',
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
        leftTitle="Change Password"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={value => {
          saveChanges(value);
        }}
        validationSchema={passwordSchema}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleSubmit,
          setFieldTouched,
          handleChange,
        }) => (
          <View style={styles.child}>
            <Input
              title={'Old Password'}
              placeholderText={'Enter your old password'}
              value={values.oldPassword}
              onBlur={() => setFieldTouched('oldPassword')}
              handleOnChangeTxt={handleChange('oldPassword')}
              keyboardType={'email-address'}
              marginTop={heightPercentageToDP(3)}
              isPassword
              error={touched.oldPassword && errors.oldPassword}
            />
            {touched.oldPassword && errors.oldPassword && (
              <Text style={styles.errorText}>{errors.oldPassword}</Text>
            )}
            <Input
              title={'New Password'}
              placeholderText={'Choose a new password'}
              value={values.newPassword}
              onBlur={() => setFieldTouched('newPassword')}
              handleOnChangeTxt={handleChange('newPassword')}
              keyboardType={'email-address'}
              marginTop={heightPercentageToDP(2)}
              isPassword
              error={touched.newPassword && errors.newPassword}
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}
            <Input
              title={'Confirm Password'}
              placeholderText={'Please re-enter a new password'}
              value={values.confirmPassword}
              onBlur={() => setFieldTouched('confirmPassword')}
              handleOnChangeTxt={handleChange('confirmPassword')}
              keyboardType={'email-address'}
              marginTop={heightPercentageToDP(2)}
              isPassword
              error={touched.confirmPassword && errors.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <PrimaryButton text={'Change Password'} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  child: {
    width: '90%',
    alignSelf: 'center',
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
