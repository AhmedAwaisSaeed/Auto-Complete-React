import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Layout, Fonts} from '../../../theme';
import FastImage from 'react-native-fast-image';

const Icon = ({iconName, setPressedHeart, pressedHeart, countValue, count}) => {
  const Container = setPressedHeart ? TouchableOpacity : View;

  return (
    <Container onPress={() => setPressedHeart()} style={styles.mainConatiner}>
      <FastImage
        style={styles.imageStyle}
        source={iconName}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.textStyle}>{count}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  imageStyle: {
    width: Layout.SV_15,
    height: Layout.SV_15,
    resizeMode: 'contain',
  },
  textStyle: {
    fontFamily: Fonts.regular,
    fontSize: Layout.FSV_11,
    textAlign: 'left',
    marginLeft: Layout.SV_5,
  },
});

export {Icon};
