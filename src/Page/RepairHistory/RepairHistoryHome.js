import {Container, ScrollBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import React from 'react';
import {useState} from 'react';
import NoticeWhiteIconDot from '@assets/image/notice_white.png';
import NoticeWhiteIcon from '@assets/image/ic_bell_top.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {useDispatch, useSelector} from 'react-redux';
import {modalOpen, modalOpenAndProp} from '@/Store/modalState';
import RepairHistorySelectHome from './RepairHistorySelectHome';
import RepairHistorySelectReview from './RepairHistorySelectReview';
import RepairHistorySelectQuestion from './RepairHistorySelectQuestion';
import RepairHistorySelectHistory from './RepairHistorySelectHistory';
import {FlatList} from 'react-native-gesture-handler';
import {useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getNoticeList} from '@/API/Manager/More';
import {useEffect} from 'react';
import {getNotificationIsRead} from '@/API/Manager/RepairHistory';

export default function RepairHistoryHome({route: {params}}) {
  const {modal} = useSelector(state => state);

  const [select, setSelect] = useState('홈');

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [noticeList, setNoticeList] = useState([]);
  const [isRead, setIsRead] = useState(false);

  const getNoticeListHandle = async () => {
    const response = await getNoticeList({
      _mt_idx: 2, // storeInfo.idx, 수정필요
    });

    if (response?.data?.result === 'true') {
      setNoticeList(response?.data?.data?.data);
    }
  };

  const getIsRead = async () => {
    const response = await getNotificationIsRead({
      _mt_idx: 2, // storeInfo.idx,수정필요
    });
    if (response?.data?.result === 'false') {
      setIsRead(true);
    } else {
      setIsRead(false);
    }
  };

  useLayoutEffect(() => {
    if (isFocused && params?.menu) {
      setSelect(params.menu);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      getNoticeListHandle();
      getIsRead();
    }
  }, [isFocused, modal.isOpenModal]);

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <>
            <GradientHeader
              title="정비내역"
              imageSource={isRead ? NoticeWhiteIconDot : NoticeWhiteIcon}
              // 수정 필요
              imageSize={
                isRead
                  ? {
                      width: '35px',
                      height: '29px',
                    }
                  : {
                      width: '27px',
                      height: '29px',
                    }
              }
              onPressImage={() =>
                dispatch(
                  modalOpenAndProp({
                    modalComponent: 'fullSize/notice',
                    setNoticeList: setNoticeList,
                    noticeList: noticeList,
                  }),
                )
              }>
              <HeaderButton
                select={select}
                setSelect={setSelect}
                width="185px"
                menuList={['홈', '정비이력', '리뷰', '1:1문의']}
              />
            </GradientHeader>
            {select === '홈' ? (
              <RepairHistorySelectHome />
            ) : select === '정비이력' ? (
              <RepairHistorySelectHistory />
            ) : select === '리뷰' ? (
              <RepairHistorySelectReview />
            ) : (
              <RepairHistorySelectQuestion />
            )}
          </>
        }
      />
      <FooterButtons selectMenu={1} isAdmin />
    </Container>
  );
}
