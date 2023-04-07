import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {Layout, Colors, Fonts, Images} from '../theme';
const Loader = () => {
  return (
    <View style={styles.loaderView}>
      <ActivityIndicator size="small" color={Colors.Secondary.BLUE} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.SV_10,
  },
});
