import React from 'react';
import {Dimensions} from 'react-native';

export default function pixelChange(px) {
  // By Junhan. 폰 사이즈별 px 단위를 변경해서 리턴하는 펑션 11-16

  let result = '';
  if (typeof px === 'string') {
    if (px === 'auto' || px.includes('%')) {
      return px;
    }
    const pxSplit = px.split('px');

    for (const item of pxSplit) {
      if (item !== '') {
        result += getPixel(parseInt(item)) + 'px ';
      }
    }
    return result;
  } else if (px === undefined) {
    return px;
  } else {
    return getPixel(px) + 'px';
  }
}

export function getPixel(px) {
  return (px * 412) / Dimensions.get('window').width;
}
