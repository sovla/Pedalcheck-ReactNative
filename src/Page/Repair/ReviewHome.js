import {Box, Container} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RepairLogo from '@assets/image/history_none.png';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ShopComponent from '@/Component/Repair/ShopComponent';
import ReviewRecord from '@/Component/Repair/ReviewRecord';
import {useState} from 'react';
import {Button, LinkButton} from '@/assets/global/Button';
export default function ReviewHome() {
  const [isRapairRecord, setIsRapairRecord] = useState(true);
  const item = [
    {
      title: '인천신스',
      isPartner: true,
      date: '2021-10-13',
      product: '정비-기본점검',
      price: 20000,
    },
    {
      title: '인천신스',
      isPartner: true,
      date: '2021-10-13',
      product: '정비-기본점검',
      price: 20000,
    },
  ];
  return (
    <>
      <Header title="리뷰 작성" />
      <Container pd="0px 16px">
        {isRapairRecord ? (
          <>
            <ReviewRecord itemArray={[item[0]]} />
            <ReviewRecord itemArray={item} />
          </>
        ) : (
          <Container alignItems="center" width="100%">
            <Box mg="70px 0px 30px">
              <DefaultImage source={RepairLogo} width="150px" height="150px" />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs18}>정비이력이 없습니다.</DarkText>
          </Container>
        )}
      </Container>
      <LinkButton
        to={() => setIsRapairRecord(prev => !prev)}
        content="리뷰확인용버튼/테스트"
        mg="0px 16px 20px"
      />
    </>
  );
}

const styles = StyleSheet.create({});
