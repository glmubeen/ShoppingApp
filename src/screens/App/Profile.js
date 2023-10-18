import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {RFPercentage} from 'react-native-responsive-fontsize';

import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import Header from '../../components/Header';
import {WCAPI} from '../../utils/apiRequest';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../redux/userSlice';
import {setLoader} from '../../redux/globalSlice';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLogin, userData} = useSelector(state => state.user);

  let profileListing = [
    {
      title: 'Edit Profile',
      icon: (
        <FontAwesome
          name={'user-circle'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      title: 'Change Password',
      icon: (
        <MaterialCommunityIcons
          name={'onepassword'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('ChangePassword'),
    },
    {
      title: 'Delete Account',
      icon: (
        <FontAwesome
          name={'trash'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => deleteAccount(),
    },
  ];

  const deleteAccount = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteUser(),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteUser = () => {
    dispatch(setLoader(true));
    WCAPI.delete(`customers/${userData?.id}`, {
      force: true,
    })
      .then(response => {
        dispatch(logoutUser());
        dispatch(setLoader(false));
        Toast.show({
          type: 'success',
          text1: 'Successfully',
          text2: 'Your account has been successfully deleted',
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
        leftTitle="Profile"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.flatlistWrapper}>
          <FlatList
            data={profileListing}
            ListEmptyComponent={() => <View style={{height: 100}} />}
            renderItem={({item, index}) => {
              return (
                <View style={styles.cardWrapper}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    activeOpacity={0.9}
                    style={[styles.card, styles.shadow]}>
                    <View style={styles.rowDirection}>
                      {item.icon}
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <Ionicons
                      name={'chevron-forward'}
                      size={RFPercentage(2.5)}
                      color={colors.textLight}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  flatlistWrapper: {
    width: '100%',
    marginTop: heightPercentageToDP(1),
  },
  cardWrapper: {
    paddingHorizontal: widthPercentageToDP(4),
  },
  card: {
    marginTop: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(1),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
    borderRadius: widthPercentageToDP(2),
  },
  shadow: {
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontsFamily.regular,
    fontSize: fontsSize.md1,
    marginLeft: widthPercentageToDP(2),
    color: colors.textDark,
  },
  heading: {
    paddingLeft: widthPercentageToDP(4),
    marginBottom: heightPercentageToDP(2),
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.lg2,
    color: colors.textDark,
    textAlign: 'left',
  },
});
