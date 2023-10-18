import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import {RFPercentage} from 'react-native-responsive-fontsize';

import HomeStack from './HomeStack';
import Settings from '../screens/App/Settings';
import colors from '../constants/colors';
import {fontsFamily, fontsSize} from '../constants/fonts';
import DividerHorizontal from '../components/DividerHorizontal';
import TermsConditions from '../screens/App/TermsConditions';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../redux/userSlice';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const {isLogin, userData} = useSelector(state => state.user);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
            props.navigation?.closeDrawer();
          },
        },
      ],
      {cancelable: false},
    );
  };

  let drawerData = [
    {
      title: 'Home',
      icon: isFocused => (
        <SimpleLineIcons
          name={'home'}
          size={RFPercentage(2.5)}
          color={isFocused ? colors.primary : colors.textLight}
        />
      ),
      onPress: () => props.navigation.navigate('Home'),
    },
    {
      title: 'Settings',
      icon: isFocused => (
        <AntDesign
          name={'setting'}
          size={RFPercentage(2.5)}
          color={isFocused ? colors.primary : colors.textLight}
        />
      ),
      onPress: () => props.navigation.navigate('Settings', {from: 'Drawer'}),
    },
    {
      title: 'Term & Condition',
      icon: isFocused => (
        <Ionicons
          name={'md-reader-sharp'}
          size={RFPercentage(2.5)}
          color={isFocused ? colors.primary : colors.textLight}
        />
      ),
      onPress: () => props.navigation.navigate('TermsConditions'),
    },
    {
      title: 'Logout',
      icon: isFocused => (
        <MaterialCommunityIcons
          name={'logout'}
          size={RFPercentage(2.5)}
          color={isFocused ? colors.primary : colors.textLight}
        />
      ),
      onPress: () => logout(),
    },
  ];
  let withoutLoginDrawer = [
    {
      title: 'Login',
      icon: isFocused => (
        <Octicons
          name={'sign-in'}
          size={RFPercentage(2.5)}
          color={isFocused ? colors.primary : colors.textLight}
        />
      ),
      onPress: () => props.navigation.navigate('Login'),
    },
  ];
  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.drawerScrollView}>
      <View style={styles.drawerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            {userData?.avatar_url ? (
              <Image
                source={{uri: userData?.avatar_url}}
                style={styles.image}
              />
            ) : (
              <Feather name={'user'} size={RFPercentage(4)} color={'grey'} />
            )}
          </View>
          {isLogin && (
            <>
              <Text style={styles.name}>
                {userData?.first_name + ' ' + userData.last_name}
              </Text>
              <Text style={styles.email}>{userData?.email}</Text>
            </>
          )}
        </View>
        <DividerHorizontal mt={heightPercentageToDP(3)} />
        <View style={styles.navigationContainer}>
          <FlatList
            data={isLogin ? drawerData : withoutLoginDrawer}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    item.onPress();
                    setSelectedIndex(index);
                  }}
                  style={styles.buttons(selectedIndex, index)}>
                  {item.icon(selectedIndex === index)}
                  <Text style={styles.buttonsText(selectedIndex, index)}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="TermsConditions" component={TermsConditions} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({
  drawerScrollView: {
    backgroundColor: 'white',
    height: heightPercentageToDP(100),
    paddingTop: 0,
  },
  drawerContainer: {
    paddingTop: heightPercentageToDP(5),
  },
  profileContainer: {
    paddingHorizontal: widthPercentageToDP(4),
  },
  profile: {
    width: widthPercentageToDP(16),
    height: widthPercentageToDP(16),
    borderRadius: widthPercentageToDP(2),
    overflow: 'hidden',
    backgroundColor: '#b8b8b859',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.bold,
    color: colors.textDark,
    marginTop: heightPercentageToDP(1.5),
  },
  email: {
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.bold,
    color: colors.textLight,
    marginTop: heightPercentageToDP(0.3),
  },
  navigationContainer: {
    paddingHorizontal: widthPercentageToDP(4),
    marginTop: heightPercentageToDP(1),
  },
  buttons: (selectedIndex, index) => ({
    marginTop: heightPercentageToDP(1),
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(1.3),
    borderRadius: widthPercentageToDP(2),
    flexDirection: 'row',
    backgroundColor:
      selectedIndex === index ? colors.primaryLight : '#c6c6c659',
  }),
  buttonsText: (selectedIndex, index) => ({
    marginLeft: widthPercentageToDP(2),
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.semibold,
    textTransform: 'uppercase',
    color: selectedIndex === index ? colors.primary : colors.textLight,
  }),
});
