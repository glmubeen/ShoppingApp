import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import Header from '../../components/Header';
import {setUser} from '../../redux/userSlice';
import {setLoader} from '../../redux/globalSlice';
import PrimaryButton from '../../components/PrimaryButton';
import SimpleModal from '../../components/SimpleModal';
import Alert from '../../components/Alert';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {WCAPI} from '../../utils/apiRequest';

const Register = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errorModal, setErrorModal] = useState(false);
  const [error, setError] = useState({title: '', msg: ''});

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    mobileNumber: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required('A contact number is required'),
    userName: Yup.string()
      .min(6, 'At least more than 6 character')
      .required('Please choose a user name'),
    email: Yup.string()
      .email('This email address is not valid')
      .required('Please enter your email address!')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'This email address is not valid',
      ),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please choose a password'),
    confirmPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('This field is required')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  });

  const signUp = value => {
    dispatch(setLoader(true));
    let payload = {
      first_name: value.firstName,
      last_name: value.lastName,
      username: value.userName,
      email: value.email,
      password: value.password,
      billing: {
        first_name: value.firstName,
        last_name: value.lastName,
        email: value.email,
        phone: value.mobileNumber,
      },
    };
    WCAPI.post('customers', payload)
      .then(response => {
        if (response?.data?.status === 400) {
          dispatch(setLoader(false));
          setErrorModal(true);
          setError({title: 'error', msg: response?.message});
        } else {
          Toast.show({
            type: 'success',
            text1: 'Successfully',
            text2: 'Your account has bees successfully register.',
          });
          dispatch(setUser(response));
          dispatch(setLoader(false));
          navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.log(error.response);
        dispatch(setLoader(false));
        setErrorModal(true);
        setError({title: 'error', msg: error.response.data.message});
      });
  };

  return (
    <>
      <Header
        leftTitle="Register"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              userName: '',
              mobileNumber: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={value => {
              signUp(value);
            }}
            validationSchema={SignUpSchema}>
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
                <Input
                  title={'First Name'}
                  placeholderText={'Enter your first name'}
                  value={values.firstName}
                  handleOnChangeTxt={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                  keyboardType={'email-address'}
                  error={touched.firstName && errors.firstName}
                  marginTop={heightPercentageToDP(3)}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
                <Input
                  title={'Last Name'}
                  placeholderText={'Enter your last name'}
                  value={values.lastName}
                  handleOnChangeTxt={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                  keyboardType={'email-address'}
                  error={touched.lastName && errors.lastName}
                  marginTop={heightPercentageToDP(3)}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
                <Input
                  title={'User Name'}
                  placeholderText={'Choose a user name'}
                  value={values.userName}
                  handleOnChangeTxt={handleChange('userName')}
                  onBlur={() => setFieldTouched('userName')}
                  keyboardType={'email-address'}
                  error={touched.userName && errors.userName}
                  marginTop={heightPercentageToDP(3)}
                />
                {touched.userName && errors.userName && (
                  <Text style={styles.errorText}>{errors.userName}</Text>
                )}
                <Input
                  title={'Email'}
                  placeholderText={'Enter your email'}
                  value={values.email}
                  handleOnChangeTxt={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  keyboardType={'email-address'}
                  error={touched.email && errors.email}
                  marginTop={heightPercentageToDP(3)}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <Input
                  title={'Contact Number'}
                  placeholderText={'+971 XXX-XXXX'}
                  value={values.mobileNumber}
                  handleOnChangeTxt={handleChange('mobileNumber')}
                  onBlur={() => setFieldTouched('mobileNumber')}
                  keyboardType={'email-address'}
                  error={touched.mobileNumber && errors.mobileNumber}
                  marginTop={heightPercentageToDP(3)}
                />
                {touched.mobileNumber && errors.mobileNumber && (
                  <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                )}
                <Input
                  title={'Password'}
                  placeholderText={'Choose a password'}
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
                <Input
                  title={'Confirm Password'}
                  placeholderText={'Re-enter your password'}
                  value={values.confirmPassword}
                  handleOnChangeTxt={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  keyboardType={'email-address'}
                  marginTop={heightPercentageToDP(2)}
                  isPassword
                  error={touched.confirmPassword && errors.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <PrimaryButton text={'Register'} onPress={handleSubmit} />

                <Text style={styles.bottomText}>
                  Already a user?{' '}
                  <Text
                    onPress={() => navigation.navigate('Login')}
                    style={styles.register}>
                    Login
                  </Text>
                </Text>
              </View>
            )}
          </Formik>
          <View style={{height: heightPercentageToDP(10)}} />
        </ScrollView>
      </View>
      <SimpleModal
        type={error.title}
        isVisible={errorModal}
        onClose={() => setErrorModal(false)}>
        <Alert
          heading={error.title}
          message={error.msg}
          buttonText={'Cancel'}
          onPress={() => setErrorModal(false)}
        />
      </SimpleModal>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
