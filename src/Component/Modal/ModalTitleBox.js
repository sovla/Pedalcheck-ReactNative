import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import CloseIcon from '@assets/image/pop_close.png';
import {useDispatch, useSelector} from 'react-redux';

export default function ModalTitleBox({title, padding = 64, onclose = () => {}}) {
  const dispatch = useDispatch();
  const boxWidth = 412 - padding;
  return (
    <RowBox justifyContent="space-between" width={`${boxWidth}px`} height="47px">
      <Text style={{width: '10%'}}></Text>
      <DefaultText
        width="80%"
        color={Theme.color.black}
        fontSize={Theme.fontSize.fs18}
        fontWeight={Theme.fontWeight.bold}
        textAlign="center">
        {title}
      </DefaultText>
      <Box width="10%" alignItems="flex-end" height="100%">
        <TouchableOpacity
          style={{padding: 5}}
          onPress={async () => {
            await onclose();
            await dispatch(modalClose());
          }}>
          <DefaultImage source={CloseIcon} width="20px" height="20px" resizeMode="contain" />
        </TouchableOpacity>
      </Box>
    </RowBox>
  );
}
