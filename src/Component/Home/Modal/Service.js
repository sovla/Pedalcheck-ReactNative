import {Box} from '@/assets/global/Container';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {modalClose} from '@/Store/modalState';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {LinkButton} from '@/assets/global/Button';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {getPixel} from '@/Util/pixelChange';
import {getPrivacyPolicy} from '@/API/More/More';
import {useEffect} from 'react';
import RenderHTML from 'react-native-render-html';

export default function Service() {
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (content === '')
      getPrivacyPolicy({
        st_agree: 2,
      }).then(res => setContent(res?.data?.data?.data));
  }, []);
  return (
    <>
      <ModalTitleBox title="서비스 이용 약관" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          maxHeight: 370,
          width: getPixel(412 - 64),
        }}>
        <Box pd="20px" width="100%" backgroundColor={Theme.color.backgroundBlue} borderRadius="5px">
          <DefaultText color={Theme.color.black} fontSize={Theme.fontSize.fs14} fontWeight={Theme.fontWeight.bold}>
            페달체크 서비스 이용약관{'\n\n'}
          </DefaultText>
          <RenderHTML
            contentWidth={0}
            style
            source={{
              html: content,
            }}
          />
        </Box>
      </ScrollView>
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
