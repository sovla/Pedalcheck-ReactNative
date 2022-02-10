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
import {useEffect} from 'react';
import {getNoticeList, readNotice} from '@/API/Manager/More';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import Loading from '@/Component/Layout/Loading';

export default function Notice({noticeList, setNoticeList}) {
  const {login} = useSelector(state => state);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const readNoticeHandle = async selectIdx => {
    await readNotice({
      _mt_idx: login.idx, // storeInfo.idx,수정 필요
      nt_idx: selectIdx,
    });
  };

  return (
    <>
      <ModalFullHeader title="알림" />
      <FlatList
        data={noticeList}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => {
          const changeItem = {
            title: item?.nt_title,
            content: item?.nt_msg,
            date: item?.nt_wdate,
            intent: item?.nt_intent, // 화면 이름
            noticeIdx: item?.nt_data1, // 푸시 알림 보낸 사람 idx
            noticeData: item?.nt_data2, // 이동 후 메뉴 선택
            nt_idx: item?.nt_idx,
          };

          return (
            <NoticeItem
              item={changeItem}
              isCheck={item?.nt_read === 'Y' ? true : false}
              readNoticeHandle={readNoticeHandle}
            />
          );
        }}
      />
    </>
  );
}

const ModalFullHeader = ({title}) => {
  const dispatch = useDispatch();
  return (
    <RowBox style={borderBottomWhiteGray} alignItems="center" justifyContent="center" height="50px" width="412px">
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
  readNoticeHandle,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={async () => {
        await dispatch(modalClose());
        await readNoticeHandle(item?.nt_idx);
        if (item?.intent) {
          await navigation.navigate(item?.intent, {menu: item?.noticeData, od_idx: item?.noticeIdx});
        }
      }}>
      <Box width="380px" minHeight="95px" justifyContent="center" style={borderBottomWhiteGray}>
        <BoldText fontSize={Theme.fontSize.fs15} color={isCheck ? Theme.color.darkGray : Theme.color.black}>
          {item.title}
        </BoldText>
        <DefaultText fontSize={Theme.fontSize.fs15} color={isCheck ? Theme.color.darkGray : Theme.color.black}>
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
