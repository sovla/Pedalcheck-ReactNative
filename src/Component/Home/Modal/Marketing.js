import {Box} from '@/assets/global/Container';
import {DarkText, DefaultText} from '@/assets/global/Text';
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
          <DefaultText color={Theme.color.black} fontSize={Theme.fontSize.fs14} fontWeight={Theme.fontWeight.bold}>
            페달체크 서비스 이용약관{'\n\n'}
          </DefaultText>
          <DarkText fontSize={Theme.fontSize.fs14}>
            {`마케팅정보 수신동의

                개인정보보호법 제22조 제5항에 의해 선택정보 사항에 대해서는 기재하지 않으셔도 서비스를 이용하실 수 있습니다.

                ① 마케팅 및 광고에의 활용
                - 신규 서비스(제품) 개발 및 맞춤 서비스 제공
                - 이벤트 및 광고성 정보 제공 및 참여기회 제공
                - 뉴스레터 발송
                ② 페달체크 서비스를 운용함에 있어 각종 정보를 서비스 화면, e-mail, SMS, 앱푸시 등의 방법으로 회원에게 제공할 수 있으며, 결제 안내 등 의무적으로 안내되어야 하는 정보성 내용은 수신동의 여부와 무관하게 제공됩니다.
                ③ 서비스 정보 수신 동의 철회
                페달체크에서 제공하는 마케팅 정보를 원하지 않을 경우 ‘더보기 > 알람 설정’에서 철회를 하실 수 있습니다. 또한 향후 마케팅 활용에 새롭게 동의하고자 하는 경우에는 ‘더보기 > 알람 설정’에서 동의하실 수 있습니다.`}
          </DarkText>
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
