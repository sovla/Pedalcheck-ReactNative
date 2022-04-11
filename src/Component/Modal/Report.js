import {LinkButton} from '@/assets/global/Button';
import {Box, Container} from '@/assets/global/Container';
import React from 'react';
import {Keyboard, ScrollView, View} from 'react-native';
import Theme from '@/assets/global/Theme';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {DefaultInput} from '@/assets/global/Input';
import {modalClose} from '@/Store/modalState';
import {useState} from 'react';
import {useEffect} from 'react';
import {showToastMessage} from '@/Util/Toast';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {reportReview} from '@/API/Shop/Shop';
import {AlertButton} from '@/Util/Alert';
import {getPixel} from '@/Util/pixelChange';

export default function Report({item, onPressReportHandle}) {
  const [answer, setAnswer] = useState('');

  const dispatch = useDispatch();
  const login = useSelector(state => state.login);

  useEffect(() => {
    setAnswer(item?.qt_answer);
  }, []);

  const onPressReport = () => {
    if (answer?.length > 0) {
      reportReview({
        _mt_idx: login.idx,
        srt_idx: item?.srt_idx,
        srt_blind_content: answer,
      }).then(res => {
        dispatch(modalClose());

        if (res.data?.result === 'true') {
          showToastMessage('리뷰 신고완료');
          onPressReportHandle();
        } else {
          showToastMessage(res.data?.msg);
        }
      });
    } else {
      AlertButton('신고 내용을 적어주세요.');
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        width: getPixel(380),
      }}>
      <>
        <ModalTitleBox title="신고하기" />

        <Box pd="0px 20px" width="380px">
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <DefaultInput
              value={answer}
              changeFn={text => setAnswer(text)}
              placeHolder="신고 내용을 입력해주세요."
              height="150px"
              width="340px"
              pd="0px 0px 10px"
              mg="0px 0px 10px"
              multiline
              isAlignTop
              fontSize={Theme.fontSize.fs16}
              maxLength={2000}
            />
          </TouchableWithoutFeedback>
          <LinkButton content="신고하기" width="340px" to={onPressReport} />
        </Box>
      </>
    </ScrollView>
  );
}
