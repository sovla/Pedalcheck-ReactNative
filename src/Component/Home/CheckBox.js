import {Box, Container, RowBox} from '@/assets/global/Container';
import {DefaultText} from '@/assets/global/Text';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import EmptyCheck from '@assets/image/empty_check.png';
import Checked from '@assets/image/checked.png';
import DefaultImage from '@/assets/global/Image';
import Example from './Example';
import Radio from '@assets/image/radio.png';
import EmptyRadio from '@assets/image/radio_b.png';

export default function CheckBox({
  isCheck,
  setIsCheck,
  children,
  isRight,
  onPressRight,
  RightComponent = Example,
  isRadio,
  pd = '14px 10px 0px',
  width = '100%',
}) {
  const divisionImageSource = () => {
    if (isRadio) {
      return isCheck ? Radio : EmptyRadio;
    } else {
      return isCheck ? Checked : EmptyCheck;
    }
  };
  const imageSource = divisionImageSource();

  return (
    <RowBox pd={pd} width={width} justifyContent="space-between">
      <TouchableOpacity onPress={setIsCheck} style={{flexDirection: 'row'}}>
        <DefaultImage width="24px" height="24px" source={imageSource} />

        {children}
      </TouchableOpacity>
      {isRight && (
        <TouchableOpacity onPress={onPressRight}>
          <RightComponent />
        </TouchableOpacity>
      )}
    </RowBox>
  );
}
