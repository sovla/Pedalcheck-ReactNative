import React from 'react';
import {Dimensions, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('window');
export default function Gradient({children, height}) {
  const minHeight = height ?? 65;
  return (
    <LinearGradient
      style={{
        width: width,
        minHeight: minHeight,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 16,
      }}
      colors={['#00B7FF', '#0092DE']}>
      {children}
    </LinearGradient>
  );
}
