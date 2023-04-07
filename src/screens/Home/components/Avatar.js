import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Layout, Colors, Fonts} from '../../../theme';
import FastImage from 'react-native-fast-image';
const Avatar = ({avatarURL}) => {
  return (
    <View style={styles.mainConatiner}>
      <FastImage
        style={styles.imageStyle}
        source={{uri: avatarURL}}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};
export {Avatar};

const styles = StyleSheet.create({
  mainConatiner: {
    width: Layout.SV_50,
    height: Layout.SV_50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Layout.SV_50,
  },
  imageStyle: {
    width: Layout.SV_50,
    height: Layout.SV_50,
    resizeMode: 'contain',
    borderRadius: Layout.SV_50,
  },
});
