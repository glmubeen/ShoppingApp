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
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {RFPercentage} from 'react-native-responsive-fontsize';

import LoginWrapper from '../../components/LoginWrapper';
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import Header from '../../components/Header';
import {logoutUser} from '../../redux/userSlice';

const Settings = props => {
  let from = props.route.params?.from;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.user);

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(logoutUser());
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTabStack'}],
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  let settingsData = [
    {
      title: 'Profile',
      icon: (
        <FontAwesome
          name={'user-circle'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('Profile'),
    },
    {
      title: 'Orders',
      icon: (
        <Ionicons
          name={'ios-time-sharp'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('Orders'),
    },
    {
      title: 'Terms & Condition',
      icon: (
        <AntDesign
          name={'form'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('TermsConditions'),
    },
    {
      title: 'Contact Us',
      icon: (
        <Entypo
          name={'phone'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('Contact'),
    },
    {
      title: 'About',
      icon: (
        <FontAwesome
          name={'question-circle'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('About'),
    },
    {
      title: 'Logout',
      icon: (
        <MaterialCommunityIcons
          name={'logout'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => logout(),
    },
  ];
  if (!isLogin) {
    return (
      <>
        {from && (
          <Header
            leftTitle="Settings"
            isBack
            isRightIcon={false}
            onLeftPress={() => navigation.goBack()}
          />
        )}
        <LoginWrapper />
      </>
    );
  } else {
    return (
      <View style={styles.container}>
        {from && (
          <Header
            leftTitle="Settings"
            isBack
            isRightIcon={false}
            onLeftPress={() => navigation.goBack()}
          />
        )}
        <ScrollView>
          <View style={styles.flatlistWrapper(from)}>
            {!from && <Text style={styles.heading}>Settings</Text>}
            <FlatList
              data={settingsData}
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
  }
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  flatlistWrapper: from => ({
    width: '100%',
    marginTop: !from ? heightPercentageToDP(6) : heightPercentageToDP(2),
  }),
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
