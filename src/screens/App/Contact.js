import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Alert, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import constant from '../../constants/constant';

const Contact = () => {
  const navigation = useNavigation();
  let contactData = [
    {
      title: 'Contact Number',
      detail: constant.contactNumber,
      isLink: false,
    },
    {
      title: 'Website',
      detail: constant.webUrl,
      isLink: true,
    },
    {
      title: 'Privacy Policy',
      detail: constant.privacyPolicy,
      isLink: true,
    },
  ];
  const openUrl = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftTitle="Contact"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{padding: widthPercentageToDP(4)}}>
          {contactData.map(item => {
            return (
              <View style={{marginTop: heightPercentageToDP(3)}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text
                  onPress={() => {
                    if (item.isLink) {
                      openUrl(item.detail);
                    }
                  }}
                  style={styles.detail(item.isLink)}>
                  {item.detail}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.semibold,
    color: colors.textLight,
  },
  detail: isLink => ({
    marginTop: heightPercentageToDP(1),
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.medium,
    color: isLink ? colors.blue : colors.textDark,
  }),
});
