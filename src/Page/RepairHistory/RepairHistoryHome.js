import {Container, ScrollBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import React from 'react';
import {useState} from 'react';
import NoticeWhiteIcon from '@assets/image/notice_white.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {useDispatch} from 'react-redux';
import {modalOpen} from '@/Store/modalState';
import RepairHistorySelectHome from './RepairHistorySelectHome';
import RepairHistorySelectReview from './RepairHistorySelectReview';
import RepairHistorySelectQuestion from './RepairHistorySelectQuestion';
import RepairHistorySelectHistory from './RepairHistorySelectHistory';
import {FlatList} from 'react-native-gesture-handler';
import {useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

export default function RepairHistoryHome({route: {params}}) {
  const [select, setSelect] = useState('홈');

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused && params?.menu) {
      setSelect(params.menu);
    }
  }, [isFocused]);

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <>
            <GradientHeader
              title="정비내역"
              imageSource={NoticeWhiteIcon}
              imageSize={{
                width: '35px',
                height: '29px',
              }}
              onPressImage={() => dispatch(modalOpen('fullSize/notice'))}>
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
