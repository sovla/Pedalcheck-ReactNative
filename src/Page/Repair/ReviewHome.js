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
        mst_idx: shopInfo?.store_info?.mt_idx,
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
        {reviewList.length > 0 ? (
          reviewList.map(item => {
            let product = '';
            let price = '';
            if (item?.ot_pt_title.length && item.ot_pt_title[0] !== '' && item.ot_pt_title[0].includes(' ')) {
              product = item.ot_pt_title[0].split(' ')[0];
              price = item.ot_pt_title[0].split(' ')[1];
            }

            const changeItem = {
              title: item?.mst_name,
              isPartner: true,
              date: item?.ot_pt_date,
              product: product,
              price: price,
              od_idx: item?.od_idx,
            };
            return <ReviewRecord itemArray={[changeItem]} />;
          })
        ) : (
          <Container alignItems="center" width="100%">
            <Box mg="70px 0px 30px">
              <DefaultImage source={RepairLogo} width="150px" height="150px" />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs18} mg="0px 0px 20px">
              정비이력이 없습니다.
            </DarkText>
            <DarkText fontSize={Theme.fontSize.fs18}>페달체크에서 정비예약한 경우에만</DarkText>
            <DarkText fontSize={Theme.fontSize.fs18}>리뷰를 남길 수 있습니다.</DarkText>
          </Container>
        )}
      </Container>
    </>
  );
}
