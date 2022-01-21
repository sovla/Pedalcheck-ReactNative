import {Box, Container} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RepairLogo from '@assets/image/history_none.png';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ReviewRecord from '@/Component/Repair/ReviewRecord';
import {useState} from 'react';
import {Button, LinkButton} from '@/assets/global/Button';
import {useFocusEffect} from '@react-navigation/native';
import {getReviewList} from '@/API/Shop/Shop';
import {useSelector} from 'react-redux';
export default function ReviewHome() {
  const {login, shopInfo} = useSelector(state => state);

  const [reviewList, setReviewList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getReviewList({
        _mt_idx: login?.idx,
        mst_idx: shopInfo?.store_info?.mst_idx,
      })
        .then(res => res.data.result === 'true' && res.data.data.data)
        .then(data => {
          if (data) {
            setReviewList(data);
          }
        });
    }, []),
  );

  return (
    <>
      <Header title="리뷰 작성" />
      <Container pd="0px 16px">
        {reviewList.length ? (
          reviewList.map(item => {
            const changeItem = {
              title: item?.mst_name,
              isPartner: true,
              date: item?.ot_pt_date,
              product: item?.ot_pt_title,
              price: 20000,
              od_idx: item?.od_idx,
            };
            return <ReviewRecord itemArray={[changeItem]} />;
          })
        ) : (
          <Container alignItems="center" width="100%">
            <Box mg="70px 0px 30px">
              <DefaultImage source={RepairLogo} width="150px" height="150px" />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs18}>정비이력이 없습니다.</DarkText>
          </Container>
        )}
      </Container>
    </>
  );
}
