import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Layout, Fonts} from '../../../theme';
const SimpleText = ({text, firstName, lastName}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.boldStyle}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

export {SimpleText};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginLeft: Layout.SV_10,
  },
  textStyle: {
    fontFamily: Fonts.regular,
    fontSize: Layout.FSV_14,
    textAlign: 'left',
  },
  boldStyle: {
    fontFamily: Fonts.bold,
    fontSize: Layout.FSV_14,
    textAlign: 'left',
  },
});
