import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabStack from './BottomTabStack';
import Settings from '../screens/App/Settings';
import Cart from '../screens/App/Cart';
import ProductDetail from '../screens/App/ProductDetail';
import Address from '../screens/App/Address';
import Checkout from '../screens/App/Checkout';
import TermsConditions from '../screens/App/TermsConditions';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Profile from '../screens/App/Profile';
import Orders from '../screens/App/Orders';
import Contact from '../screens/App/Contact';
import About from '../screens/App/About';
import Search from '../screens/App/Search';
import EditProfile from '../screens/App/EditProfile';
import ChangePassword from '../screens/App/ChangePassword';
import OrderDetail from '../screens/App/OrderDetail';
import ImageView from '../components/ImageView';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ImageView" component={ImageView} />

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
