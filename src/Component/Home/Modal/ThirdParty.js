import {Box} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {modalClose} from '@/Store/modalState';
import React, {useEffect, useState} from 'react';
import {LinkButton} from '@/assets/global/Button';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {getPrivacyPolicy} from '@/API/More/More';
import RenderHTML from 'react-native-render-html';

export default function ThirdParty() {
  const dispatch = useDispatch();
  const paddingText = '20px 0px 0px';
  const [text, setText] = useState('');
  useEffect(() => {
    getPrivacyPolicy({st_agree: 7}).then(res => {
      setText(res?.data?.data?.data);
    });
  }, []);
  return (
    <>
      <ModalTitleBox title="개인정보 제3자 제공 동의" />
      <Box
        style={{
          maxHeight: getHeightPixel(350),
          width: getPixel(412 - 64),
        }}>
        <Box pd="16px" width="100%" backgroundColor={Theme.color.white} borderRadius="5px">
          <RenderHTML
            contentWidth={0}
            style
            baseStyle={{
              fontFamily: 'NotoSansKR-Regular',
              color: Theme.color.black,
              fontSize: Theme.fontSize.fs14,
              letterSpacing: '-0.84px',
            }}
            source={{
              html: text,
            }}
          />
        </Box>
      </Box>
      <LinkButton
        mg="20px 0px 0px"
        to={() => dispatch(modalClose())}
        content="확인"
        width={`${412 - 64}px`}
        color={Theme.color.black}
        borderColor={Theme.borderColor.gray}
        backgroundColor={Theme.color.white}
      />
    </>
  );
}
