import {Container, ScrollBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import React from 'react';
import {useState} from 'react';
import NoticeWhiteIcon from '@assets/image/notice_white.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {useDispatch} from 'react-redux';
import {modalOpen} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/native';
import RepairHistorySelectHome from './RepairHistorySelectHome';
import RepairHistorySelectReview from './RepairHistorySelectReview';
import RepairHistorySelectQuestion from './RepairHistorySelectQuestion';
import RepairHistorySelectHistory from './RepairHistorySelectHistory';

export default function RepairHistoryHome() {
  const [select, setSelect] = useState('홈');

  const [questionSelect, setQuestionSelect] = useState([]);
  const [selectComment, setSelectComment] = useState([]);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const onPressRecomment = index => {
    if (selectComment.find(findIndex => findIndex === index)) {
      setSelectComment(prev => prev.filter(filterItem => filterItem !== index));
    } else {
      setSelectComment(prev => [...prev, index]);
    }
  };
  const onPressItem = title => {
    if (questionSelect.find(findItem => findItem === title)) {
      setQuestionSelect(prev => prev.filter(filterItem => filterItem !== title));
    } else {
      setQuestionSelect(prev => [...prev, title]);
    }
  };

  const onPressProduct = () => {
    navigation.navigate('Detail');
  };
  return (
    <Container>
      <ScrollBox>
        <GradientHeader
          title="예약관리"
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
        {select === '홈' && <RepairHistorySelectHome />}
        {select === '정비이력' && <RepairHistorySelectHistory />}
        {select === '리뷰' && <RepairHistorySelectReview />}
        {select === '1:1문의' && <RepairHistorySelectQuestion />}
      </ScrollBox>
      <FooterButtons selectMenu={1} isAdmin />
    </Container>
  );
}
