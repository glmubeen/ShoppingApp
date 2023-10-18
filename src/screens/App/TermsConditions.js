import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';

const TermsConditions = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        leftTitle="TermsConditions"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{padding: widthPercentageToDP(4)}}>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  description: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    color: colors.textLight,
    lineHeight: heightPercentageToDP(3),
  },
});
