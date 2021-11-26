import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

export default function Gradient({children, height}) {
  const {size} = useSelector(state => state);
  const minHeight = height ?? 65;
  return (
    <LinearGradient
      style={{
        width: size.screenWidth,
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
