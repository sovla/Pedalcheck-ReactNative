import {BorderButton, LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import {TouchableOpacity} from 'react-native';
import ReplyIcon from '@assets/image/ic_reply.png';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {DefaultInput} from '@/assets/global/Input';
import {modalClose} from '@/Store/modalState';
import {useState} from 'react';
import {qnaUpdate, qnaWrite} from '@/API/Manager/RepairHistory';
import {useEffect} from 'react';

export default function QuestionSubmit({item}) {
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setAnswer(item?.qt_answer);
  }, []);

  const answerWrite = async () => {
    if (item.qt_status === '답변') {
      const response = await qnaUpdate({
        _mt_idx: 10, // 수정필요
        qt_idx: item.qt_idx,
        qt_answer: answer,
      });
    } else {
      const response = await qnaWrite({
        _mt_idx: 10, // 수정필요
        qt_idx: item.qt_idx,
        qt_answer: answer,
      });
    }

    dispatch(modalClose());
  };

  return (
    <>
      <ModalTitleBox title="답변하기" />
      <Box pd="0px 20px" width={'380px'}>
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
        />
        <LinkButton content="저장하기" width="340px" to={() => answerWrite()} />
      </Box>
    </>
  );
}
