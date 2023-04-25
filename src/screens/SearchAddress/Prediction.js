import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Fonts, Colors, Layout} from '../../theme';

const Prediction = ({item, onPressAddress}) => {
  const {description} = item || {};
  return (
    <TouchableOpacity
      onPress={() => onPressAddress(item)}
      style={styles.mainContainer}>
      <Text style={styles.textStyle}>{description}</Text>
    </TouchableOpacity>
  );
};

export default Prediction;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Layout.SV_5,
    marginVertical: Layout.SV_5,
  },
  textStyle: {
    fontFamily: Fonts.medium,
    color: Colors.Primary.BLACK,
  },
});
