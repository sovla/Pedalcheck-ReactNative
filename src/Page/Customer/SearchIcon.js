import {PositionBox} from '@/assets/global/Container';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import DefaultImage from '@/assets/global/Image';
import CheckIcon from '@assets/image/ic_search.png';

export default function ({onPress, top = '0px', right = '5px'}) {
  return (
    <PositionBox right={right} top={top} backgroundColor="#0000">
      <TouchableOpacity onPress={onPress} style={{padding: 10, backgroundColor: '#0000'}}>
        <DefaultImage source={CheckIcon} width="21px" height="21px" />
      </TouchableOpacity>
    </PositionBox>
  );
}
