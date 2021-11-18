import {Box} from '@/assets/global/Container';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {LinkButton} from '@/assets/global/Button';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {getPixel} from '@/Util/pixelChange';

export default function Service() {
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();
  return (
    <>
      <ModalTitleBox size={size} title="서비스 이용 약관" />
      <ScrollView
        style={{
          maxHeight: 370,
          width: getPixel(size.designWidth - 64),
        }}>
        <Box pd="20px" width="100%" backgroundColor={Theme.color.backgroundBlue} borderRadius="5px">
          <DefaultText
            color={Theme.color.black}
            fontSize={Theme.fontSize.fs14}
            fontWeight={Theme.fontWeight.bold}>
            페달체크 서비스 이용약관{'\n\n'}
          </DefaultText>
          <DefaultText color={Theme.color.black} fontSize={Theme.fontSize.fs14} lineHeight="18px">
            1장 총칙{'\n\n'}제 1조(목적){'\n\n'} 약관이 노출되는 영역입니다. 약관이노출되는
            영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는노출되는 노출되는노출되는 노출되는노출되는
            노출되는노출되는 노출되는노출되는 노출되는노출되는 노출되는노출되는 노출되는노출되는
            노출되는노출되는 노출되는노출되는 노출되는노출되는 노출되는노출되는 노출되는노출되는
            노출되는노출되는 노출되는노출되는 노출되는노출되는 노출되는노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이 노출되는 영역입니다. 약관이
            노출되는 영역입니다.
          </DefaultText>
        </Box>
      </ScrollView>
      <LinkButton
        mg="20px 0px 0px"
        to={() => dispatch(modalClose())}
        content="확인"
        width={`${size.designWidth - 64}px`}
        color={Theme.color.black}
        borderColor={Theme.borderColor.gray}
        backgroundColor={Theme.color.white}
      />
    </>
  );
}
