import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import DividerHorizontal from '../../components/DividerHorizontal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch} from 'react-redux';
import {setLoader} from '../../redux/globalSlice';
import {WCAPI} from '../../utils/apiRequest';
import {setUser} from '../../redux/userSlice';
import SimpleModal from '../../components/SimpleModal';
import Alert from '../../components/Alert';
import endPoints from '../../constants/endPoints';

const Login = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [error, setError] = useState({title: '', msg: ''});
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const SignInSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your user name'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be 8 character long'),
  });

  const signIn = value => {
    dispatch(setLoader(true));
    let payload = {
      username: value.username,
      password: value.password,
    };

    axios
      .post(endPoints.getToken, payload)
      .then(response => {
        axios
          .post(
            endPoints.validate,
            {},
            {
              headers: {
                Authorization: 'Bearer' + response.data.token,
              },
            },
          )
          .then(response => {
            WCAPI.get('customers/' + response.data.data.id)
              .then(response => {
                dispatch(setUser(response));
                dispatch(setLoader(false));
                navigation.goBack();
                Toast.show({
                  type: 'success',
                  text1: 'Successfully Login',
                });
              })
              .catch(error => {
                console.log(error.response.data);
                dispatch(setLoader(false));
                setIsVisibleModal(true);
                setError({title: 'error', msg: error.response.data.message});
              });
          })
          .catch(er => {
            console.log(er);
            dispatch(setLoader(false));
            setIsVisibleModal(true);
            setError({title: 'error', msg: error.response.data.message});
          });
      })
      .catch(error => {
        console.log('error', error.response);
        dispatch(setLoader(false));
        setIsVisibleModal(true);
        setError({title: 'error', msg: error.response.data.message});
      });
  };

  return (
    <>
      <Header
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={value => {
            signIn(value);
          }}
          validationSchema={SignInSchema}>
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
            <View style={styles.childContainer}>
              <Text style={styles.title}>Login</Text>
              <DividerHorizontal h={0.3} />
              <Input
                title={'User Name'}
                placeholderText={'Enter your user name'}
                value={values.username}
                handleOnChangeTxt={handleChange('username')}
                onBlur={() => setFieldTouched('username')}
                keyboardType={'email-address'}
                error={touched.username && errors.username}
                marginTop={heightPercentageToDP(3)}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              <Input
                title={'password'}
                placeholderText={'Enter Password'}
                value={values.password}
                handleOnChangeTxt={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                keyboardType={'email-address'}
                marginTop={heightPercentageToDP(2)}
                isPassword
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <PrimaryButton text={'Login'} onPress={handleSubmit} />

              <View style={styles.divider}>
                <DividerHorizontal w="42%" />
                <Text style={styles.orText}>OR</Text>
                <DividerHorizontal w="42%" />
              </View>

              {/* <=== Socials login ===> */}
              {/* <View style={styles.social}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.socialBtn, styles.googleBtn]}>
                  <MaterialCommunityIcons
                    name={'google'}
                    size={RFPercentage(4)}
                    color={'#ea4336'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.socialBtn, styles.facebookBtn]}>
                  <MaterialCommunityIcons
                    name={'facebook'}
                    size={RFPercentage(4)}
                    color={'#1a74e4'}
                  />
                </TouchableOpacity>
              </View> */}

              <Text style={styles.bottomText}>
                Do you have an account?{' '}
                <Text
                  onPress={() => navigation.navigate('Register')}
                  style={styles.register}>
                  Register
                </Text>
              </Text>
            </View>
          )}
        </Formik>
      </View>
      <SimpleModal
        onClose={() => setIsVisibleModal(false)}
        isVisible={isVisibleModal}
        type={error.title}>
        <Alert
          heading={error.title}
          message={error.msg}
          buttonText={'Cancel'}
          onPress={() => setIsVisibleModal(false)}
        />
      </SimpleModal>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  childContainer: {
    width: '100%',
    paddingHorizontal: widthPercentageToDP(6),
  },
  title: {
    fontSize: fontsSize.xl2,
    fontFamily: fontsFamily.semibold,
    textTransform: 'uppercase',
    color: '#3b3b3b',
    marginLeft: widthPercentageToDP(2),
  },
  button: isValid => ({
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isValid ? colors.primary : '#bababa',
    height: heightPercentageToDP(6),
    borderRadius: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(4),
  }),
  text: {
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.semibold,
    color: colors.onPrimary,
    textTransform: 'uppercase',
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(3),
  },
  socialBtn: {
    padding: widthPercentageToDP(1),
    borderRadius: widthPercentageToDP(20),
    borderWidth: 1,
  },
  googleBtn: {
    borderColor: '#ea4336',
    marginRight: widthPercentageToDP(2),
  },
  facebookBtn: {
    borderColor: '#1a74e4',
    marginLeft: widthPercentageToDP(2),
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(4),
  },
  orText: {
    fontSize: fontsSize.sm1,
    fontFamily: fontsFamily.semibold,
    alignSelf: 'baseline',
    color: colors.textLight,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.medium,
    color: colors.textDark,
    marginTop: heightPercentageToDP(2),
  },
  register: {
    textDecorationLine: 'underline',
    color: '#1a74e4',
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
