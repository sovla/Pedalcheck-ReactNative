import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {BoldText, DarkBoldText, DarkText, DefaultText, GrayText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from '@assets/image/pop_close.png';
import DefaultImage from '@/assets/global/Image';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {modalClose} from '@/Store/modalState';

export default function Notice() {
  return (
    <>
      <ModalFullHeader title="알림" />
      <ScrollBox pd="0px 16px">
        <NoticeItem />
        <NoticeItem isCheck />
        <NoticeItem />
        <NoticeItem />
        <NoticeItem />
        <NoticeItem isCheck />
        <NoticeItem />
        <NoticeItem />

        <NoticeItem />
      </ScrollBox>
    </>
  );
}

const ModalFullHeader = ({title}) => {
  const dispatch = useDispatch();
  return (
    <RowBox
      style={borderBottomWhiteGray}
      alignItems="center"
      justifyContent="center"
      height="50px"
      width="412px">
      <DarkBoldText>{title}</DarkBoldText>
      <PositionBox right="16px" top="11px">
        <TouchableOpacity onPress={() => dispatch(modalClose())}>
          <DefaultImage source={CloseIcon} width="24px" height="24px" />
        </TouchableOpacity>
      </PositionBox>
    </RowBox>
  );
};

const NoticeItem = ({
  item = {
    title: '정비-기본점검 서비스 정비요청',
    content: '홍길동 님이 정비를 요청하였습니다.',
    date: '2021-10-13 02-03',
  },
  isCheck,
}) => {
  return (
    <TouchableOpacity disabled={isCheck}>
      <Box width="380px" minHeight="95px" justifyContent="center" style={borderBottomWhiteGray}>
        <BoldText
          fontSize={Theme.fontSize.fs15}
          color={isCheck ? Theme.color.darkGray : Theme.color.black}>
          {item.title}
        </BoldText>
        <DefaultText
          fontSize={Theme.fontSize.fs15}
          color={isCheck ? Theme.color.darkGray : Theme.color.black}>
          {item.content}
        </DefaultText>
        <DefaultText
          letterSpacing="0px"
          fontSize={Theme.fontSize.fs13}
          color={isCheck ? Theme.color.darkGray : Theme.color.black}>
          {item.date}
        </DefaultText>
      </Box>
    </TouchableOpacity>
  );
};
