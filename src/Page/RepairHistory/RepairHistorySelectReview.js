import {BetweenBox, Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import React from 'react';
import {useState} from 'react';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, GrayText, IndigoText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import numberFormat from '@/Util/numberFormat';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {DefaultInput} from '@/assets/global/Input';
import SearchIcon from '@assets/image/ic_search.png';
import Review from '@/Component/Repair/Review';
import DummyIcon from '@assets/image/dummy.png';
import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';

export default function RepairHistorySelectReview() {
  return (
    <ScrollBox pd="0px 16px">
      <RowBox mg="20px 0px 10px">
        <DarkBoldText fontSize={Theme.fontSize.fs15}>리뷰</DarkBoldText>
        <IndigoText
          mg="0px 0px 0px 5px"
          letterSpacing="0px"
          fontSize={Theme.fontSize.fs15}
          fontWeight={Theme.fontWeight.medium}>
          {numberFormat(12345)}
        </IndigoText>
      </RowBox>
      <RowBox>
        <DefaultInput
          backgroundColor={Theme.color.white}
          borderColor={Theme.borderColor.gray}
          placeHolder="검색어를 입력하세요"
          width="380px"
        />
        <PositionBox backgroundColor="#0000" right="16px" bottom="11px">
          <DefaultImage source={SearchIcon} width="21px" height="21px" />
        </PositionBox>
      </RowBox>
      <Review isDetail />
      <ReviewRecomment />
    </ScrollBox>
  );
}

const ReviewRecomment = () => {
  const navigation = useNavigation();
  return (
    <Box mg="20px 0px 0px">
      <RowBox>
        <DefaultImage source={DummyIcon} width="50px" height="50px" />
        <Box mg="0px 0px 0px 10px">
          <RowBox>
            <DarkBoldText mg="0px 10px 0px 0px" fontSize={Theme.fontSize.fs15}>
              홍길동
            </DarkBoldText>
            <DarkText fontSize={Theme.fontSize.fs13}>APPALANCHIA</DarkText>
            <GrayText fontSize={Theme.fontSize.fs12}> | </GrayText>
            <DarkText fontSize={Theme.fontSize.fs13}>Momentum</DarkText>
          </RowBox>
          <GrayText fontSize={Theme.fontSize.fs12}>2021-10-13</GrayText>
        </Box>
      </RowBox>
      <RowBox mg="10px 0px 0px">
        <IndigoText mg="0px 10px 0px 0px" fontSize={Theme.fontSize.fs15}>
          정비 카테고리
        </IndigoText>
        <MoneyText
          fontWeight={Theme.fontWeight.medium}
          fontSize={Theme.fontSize.fs15}
          money={20000}
          color={Theme.color.black}
        />
      </RowBox>
      <DarkText mg="10px 0px 0px" fontSize={Theme.fontSize.fs15}>
        회원 작성 리뷰 영역
      </DarkText>
      <BetweenBox mg="20px 0px 0px" width="380px">
        <DefaultInput placeHolder="댓글을 입력해주세요 (500자 이내)" width="310px" height="44px" />
        <LinkButton content="등록" width="60px" height="44px" />
      </BetweenBox>
      <LinkWhiteButton
        to={() =>
          navigation.navigate('ReviewDetail', {
            isRecomment: true,
          })
        }
        mg="20px 0px 20px"
        content="자세히보기"
        borderRadius="3px"
      />
    </Box>
  );
};
