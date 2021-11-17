import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import Default1 from '@assets/image/default_1.png';
import {DarkBoldText, DarkText, DefaultText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ShopDummyImage from '@assets/image/shop_default.png';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';
import ReviewComment from './ReviewComment';
import {LinkWhiteButton} from '@/assets/global/Button';

export default function Review({isDetail}) {
  const {size} = useSelector(state => state);
  return (
    <Container
      pd="20px 0px"
      style={{borderBottomWidth: 1, borderBottomColor: Theme.color.backgroundWhiteGray}}>
      <RowBox>
        <DefaultImage source={Default1} width="50px" height="50px" />
        <Box mg="0px 0px 0px 5px" justifyContent="center" height="50px">
          <RowBox>
            <DarkBoldText fontSize={Theme.fontSize.fs15} mg="0px 10px 0px 0px">
              홍길동
            </DarkBoldText>
            <DarkText fontSize={Theme.fontSize.fs13}>APPALANCHIA </DarkText>
            <DefaultText color={Theme.color.gray} fontSize={Theme.fontSize.fs12}>
              |
            </DefaultText>
            <DarkText fontSize={Theme.fontSize.fs13}> Momentum</DarkText>
          </RowBox>
          <RowBox>
            <DefaultText fontSize={Theme.fontSize.fs12} color={Theme.color.gray}>
              2021-10-13
            </DefaultText>
          </RowBox>
        </Box>
      </RowBox>
      <RowBox mg="10px 0px 0px">
        <DefaultText
          mg="0px 5px 0px 0px"
          color={Theme.color.indigo}
          fontSize={Theme.fontSize.fs15}
          fontWeight={Theme.fontWeight.bold}>
          세차
        </DefaultText>
        <MoneyText
          money={50000}
          color={Theme.color.black}
          fontSize={Theme.fontSize.fs15}
          fontWeight={Theme.fontWeight.midium}
        />
      </RowBox>
      <Box mg="15px 0px 0px" borderRadius="10px">
        <DefaultImage
          source={ShopDummyImage}
          borderRadius="10px"
          width={size.minusPadding}
          height="150px"
        />
      </Box>
      <Box width={size.minusPadding} mg="15px 0px 20px">
        <DarkText numberOfLines={3} fontSize={Theme.fontSize.fs15} lineHeight="22px">
          회원 작성 리뷰 영역 리뷰가 길어질 경우 자세히를 터치하여 자세히 보기를 할 수 있다. 회원
          작성 리뷰 영역 리뷰가 길어질 경우 자세히를 터치하여 자세히 보기를 할 수 있다. 회원 작성
          리뷰 영역 리뷰가 길어질 경우 자세히를 터치하여 자세히 보기를 할 수 있다. 리뷰 영역 리뷰가
          길어질 경우 자세히를 터치하여 자세히 보기를 할 수 있다.리뷰 영역 리뷰가 길어질 경우
          자세히를 터치하여 자세히 보기를 할 수 있다.리뷰 영역 리뷰가 길어질 경우 자세히를 터치하여
          자세히 보기를 할 수 있다.
        </DarkText>
      </Box>
      <ReviewComment size={size} />
      {isDetail && <LinkWhiteButton mg="15px 0px 0px 0px" content="자세히보기" />}
    </Container>
  );
}
