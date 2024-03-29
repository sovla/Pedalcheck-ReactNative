import {BorderButton, LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import {Keyboard, TouchableOpacity} from 'react-native';
import ReplyIcon from '@assets/image/ic_reply.png';
import {DarkBoldText, DarkMediumText, DarkText, ErrorText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {DefaultInput} from '@/assets/global/Input';
import {modalClose} from '@/Store/modalState';
import {useState} from 'react';
import {qnaUpdate, qnaWrite} from '@/API/Manager/RepairHistory';
import {useEffect} from 'react';
import {showToastMessage} from '@/Util/Toast';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function QuestionSubmit({item, setRecomment}) {
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const login = useSelector(state => state.login);

  useEffect(() => {
    setAnswer(item?.qt_answer);
  }, []);

  const answerWrite = async () => {
    if (answer === '') {
      setErrorMessage('답변을 입력해주세요.');
      return;
    }
    if (answer.length < 10) {
      setErrorMessage('답변을 10자 이상 입력해주세요.');
      return;
    }

    let response;

    if (item.qt_status === '답변') {
      response = await qnaUpdate({
        _mt_idx: login.idx,
        qt_idx: item.qt_idx,
        qt_answer: answer,
      });
    } else {
      response = await qnaWrite({
        _mt_idx: login.idx,
        qt_idx: item.qt_idx,
        qt_answer: answer,
      });
    }
    if (response?.data?.result === 'true') {
      showToastMessage('저장되었습니다.');
    }
    await setRecomment(item.qt_idx, answer);
    dispatch(modalClose());
  };

  return (
    <>
      <ModalTitleBox title="답변하기" />

      <Box pd="0px 20px" width={'380px'}>
        <ScrollBox keyboardShouldPersistTaps="handled">
          <BetweenBox width="340px" style={borderBottomWhiteGray} height="55px">
            <Box>
              <DarkBoldText fontSize={Theme.fontSize.fs15}>{item?.qt_title}</DarkBoldText>
              <GrayText fontSize={Theme.fontSize.fs12} letterSpacing="0px">
                {' '}
                {item?.qt_wdate}
              </GrayText>
            </Box>
            <RowBox>
              <BorderButton
                backgroundColor={item?.qt_status === '답변' ? Theme.color.skyBlue : Theme.color.red}
                borderColor={item?.qt_status === '답변' ? Theme.color.skyBlue : Theme.color.red}
                color={Theme.color.white}
                width="66px"
                fontSize={Theme.fontSize.fs13}
                height="25px">
                {item?.qt_status === '답변' ? '답변완료' : item?.qt_status}
              </BorderButton>
            </RowBox>
          </BetweenBox>
          <DarkText mg="15px 0px 20px" fontSize={Theme.fontSize.fs15}>
            {item?.qt_content}
          </DarkText>
          <DefaultInput
            value={answer}
            changeFn={text => setAnswer(text)}
            title="답변"
            placeHolder="답변을 등록해주세요"
            height="150px"
            width="340px"
            pd="0px 0px 10px"
            mg="0px 0px 10px"
            multiline
            isAlignTop
            fontSize={Theme.fontSize.fs16}
            maxLength={2000}
          />
        </ScrollBox>
        {errorMessage !== '' && <ErrorText>{errorMessage}</ErrorText>}
        <LinkButton content="저장하기" width="340px" to={() => answerWrite()} />
      </Box>
    </>
  );
}
