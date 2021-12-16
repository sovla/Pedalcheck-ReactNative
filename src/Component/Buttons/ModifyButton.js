import {ButtonTouch} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import React from 'react';
import PencelIcon from '@assets/image/ic_modify.png';
import DefaultImage from '@/assets/global/Image';

export default function ModifyButton({onPress}) {
  return (
    <ButtonTouch
      width="30px"
      height="30px"
      backgroundColor="#0000"
      borderColor={Theme.color.skyBlue}
      onPress={onPress}
      borderRadius="3px">
      <DefaultImage source={PencelIcon} width="20px" height="20px" />
    </ButtonTouch>
  );
}
