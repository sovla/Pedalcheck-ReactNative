import {ButtonTouch} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import React from 'react';
import TrashIcon from '@assets/image/ic_trash.png';
import DefaultImage from '@/assets/global/Image';

export default function TrashButton({onPress}) {
  return (
    <ButtonTouch
      width="30px"
      height="30px"
      backgroundColor="#0000"
      borderColor={Theme.borderColor.gray}
      onPress={onPress}
      borderRadius="3px">
      <DefaultImage source={TrashIcon} width="20px" height="20px" />
    </ButtonTouch>
  );
}
