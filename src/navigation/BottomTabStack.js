import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/dist/Feather';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';

// screens
import Home from '../screens/App/Home';
import Cart from '../screens/App/Cart';
import Settings from '../screens/App/Settings';
import Badge from '../components/Badge';

const Tab = createBottomTabNavigator();

function CustomTabBar({state, descriptors, navigation}) {
  const cartData = useSelector(state => state.cart);
  const translateX_value = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [index, setIndex] = useState(1);

  useEffect(() => {
    Animated.timing(translateX_value, {
      toValue: index,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.spring(scale, {
      toValue: 2,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  }, [index]);

  return (
    <View style={styles.customTabBar}>
      <Animated.View
        style={[
          styles.animatedLine,
          {
            transform: [
              {
                translateX: translateX_value.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    widthPercentageToDP(13),
                    widthPercentageToDP(44.4),
                  ],
                }),
              },
              {
                scaleX: scale.interpolate({
                  inputRange: [1, 2],
                  outputRange: [1, 2],
                }),
              },
            ],
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        let icon;
        switch (route.name) {
          case 'Home':
            icon = 'home';
            break;
          case 'Settings':
            icon = 'user';
            break;
          case 'Cart':
            icon = 'shopping-cart';
            break;

          default:
            break;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          setIndex(index);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View style={styles.iconContainer}>
              {route.name === 'Cart' && cartData?.length > 0 && (
                <Badge top={1} right={-1} />
              )}
              <Icon
                name={icon}
                size={RFPercentage(2.5)}
                color={isFocused ? colors.primary : 'grey'}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BottomTabStack = () => {
  // const cartData = useSelector(state => state.cart);
  // const TabImage =
  //   name =>
  //   ({focused}) => {
  //     let icon;
  //     switch (name) {
  //       case 'Home':
  //         icon = 'home';
  //         break;
  //       case 'Settings':
  //         icon = 'user';
  //         break;
  //       case 'Cart':
  //         icon = 'shopping-cart';
  //         break;

  //       default:
  //         break;
  //     }
  //     return (
  //       <View style={styles.iconBox}>
  //         <Icon
  //           name={icon}
  //           size={RFPercentage(2.5)}
  //           color={focused ? colors.primary : 'grey'}
  //         />
  //       </View>
  //     );
  //   };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.mainTabbar,
      }}>
      <Tab.Screen
        name="Settings"
        component={Settings}
        // options={{tabBarIcon: TabImage('Settings')}}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        // options={{tabBarIcon: TabImage('Home')}}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        // options={{
        //   tabBarIcon: TabImage('Cart'),
        //   tabBarBadge: cartData.length > 0 ? cartData.length : null,
        // }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;

const styles = StyleSheet.create({
  mainTabbar: {
    height:
      Platform.OS === 'ios'
        ? heightPercentageToDP(10)
        : heightPercentageToDP(8),
    backgroundColor: 'white',
  },
  iconBox: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTabBar: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: heightPercentageToDP(8),
    paddingHorizontal: widthPercentageToDP(3),
    borderTopWidth: 0.2,
    borderTopColor: '#cecece',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 10,
  },
  animatedLine: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(0.5),
    backgroundColor: colors.primary,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
  },
  iconContainer: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(12),
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
