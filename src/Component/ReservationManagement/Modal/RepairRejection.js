import {LinkWhiteButton} from '@/assets/global/Button';
import {Box} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {modalClose} from '@/Store/modalState';
import {AlertButton} from '@/Util/Alert';
import {showToastMessage} from '@/Util/Toast';
import React from 'react';
import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';

export default function RepairRejection({onPressReject}) {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const onPressConfirm = () => {
    if (content === '') {
      AlertButton('승인거절 사유를 입력해주세요.');
    } else {
      onPressReject(content);
      dispatch(modalClose());
    }
  };
  return (
    <>
      <ModalTitleBox title="승인거절" />
      <Box alignItems="center">
        <DefaultInput
          placeHolder="승인거절 사유를 입력해주세요."
          width="340px"
          height="200px"
          isAlignTop
          multiline
          maxLength={500}
          value={content}
          changeFn={setContent}
        />
        <LinkWhiteButton mg="10px 0px 0px" content="확인" to={onPressConfirm} width="340px" />
      </Box>
    </>
  );
}
