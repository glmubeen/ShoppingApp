import {heightPercentageToDP} from 'react-native-responsive-screen';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import Header from '../../components/Header';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/userSlice';
import {setLoader} from '../../redux/globalSlice';
import {WCAPI} from '../../utils/apiRequest';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLogin, userData} = useSelector(state => state.user);
  const [firstName, setFirstName] = useState(
    isLogin ? userData?.first_name : '',
  );
  const [lastName, setLastName] = useState(isLogin ? userData?.last_name : '');

  const saveChanges = () => {
    dispatch(setLoader(true));

    let payload = {
      first_name: firstName,
      last_name: lastName,
    };

    WCAPI.put(`customers/${userData?.id}`, payload)
      .then(response => {
        dispatch(setUser(response));
        dispatch(setLoader(false));
        Toast.show({
          type: 'success',
          text1: 'Successfully',
          text2: 'Your profile name has been successfully changed.',
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
        leftTitle="Edit Profile"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.child}>
        <Input
          title={'Edit First Name'}
          placeholderText={''}
          value={firstName}
          handleOnChangeTxt={text => setFirstName(text)}
          marginTop={heightPercentageToDP(3)}
        />
        <Input
          title={'Edit Last Name'}
          placeholderText={''}
          value={lastName}
          handleOnChangeTxt={text => setLastName(text)}
          marginTop={heightPercentageToDP(3)}
        />
        <PrimaryButton text={'Save Changes'} onPress={() => saveChanges()} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  child: {
    width: '90%',
    alignSelf: 'center',
  },
});
