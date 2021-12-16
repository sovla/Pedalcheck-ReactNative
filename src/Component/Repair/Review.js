import {BetweenBox, Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import Default1 from '@assets/image/default_1.png';
import {DarkBoldText, DarkText, DefaultText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ShopDummyImage from '@assets/image/shop_default.png';
import {useSelector} from 'react-redux';
import {ScrollView, Text} from 'react-native';
import ReviewComment from './ReviewComment';
import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {useNavigation} from '@react-navigation/core';
import Swiper from './Swiper';
import {DefaultInput} from '@/assets/global/Input';

export default function Review({isDetail = false, isDetailPage = false, isRecomment = true}) {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  const imageArray = [ShopDummyImage, ShopDummyImage, ShopDummyImage, ShopDummyImage];

  return (
    <Container
      pd="20px 0px"
      style={{
        borderBottomWidth: isRecomment ? 0 : 1,
        borderBottomColor: Theme.color.backgroundWhiteGray,
      }}>
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
          fontWeight={Theme.fontWeight.medium}
        />
      </RowBox>
      <Box mg="15px 0px 0px" borderRadius="10px">
        {isDetailPage ? (
          <Swiper
            width={size.minusPadding}
            height={200}
            imageArray={imageArray}
            borderRadius="All"
          />
        ) : (
          <Box>
            <DefaultImage
              source={ShopDummyImage}
              borderRadius="10px"
              width={size.minusPadding}
              height="150px"
            />
            {imageArray.length > 1 && (
              <PositionBox
                right="10px"
                bottom="10px"
                width="44px"
                height="24px"
                borderRadius="12px"
                alignItems="center"
                backgroundColor="#3336">
                <DefaultText>+{imageArray.length - 1}</DefaultText>
              </PositionBox>
            )}
          </Box>
        )}
      </Box>
      <Box width={size.minusPadding} mg="15px 0px 20px">
        <DarkText
          numberOfLines={isDetailPage ? 50 : 3}
          fontSize={Theme.fontSize.fs15}
          lineHeight="22px">
          회원 작성 리뷰 영역 리뷰가 길어질 경우 자세히를 터치하여 자세히 보기를 할 수 있다. 회원
          작성 리뷰 영역 리뷰가 길어질 경우 자세히를 터치하여 자세히 보기를 할 수 있다. 회원 작성
          리뷰 영역 리뷰가 길어질 경우 자세히를 터치하여 자세히 보기를 할 수 있다. 리뷰 영역 리뷰가
          길어질 경우 자세히를 터치하여 자세히 보기를 할 수 있다.리뷰 영역 리뷰가 길어질 경우
          자세히를 터치하여 자세히 보기를 할 수 있다.리뷰 영역 리뷰가 길어질 경우 자세히를 터치하여
          자세히 보기를 할 수 있다.
        </DarkText>
      </Box>
      {!isRecomment && <ReviewComment size={size} isDetailPage={isDetailPage} />}

      {isDetail && (
        <LinkWhiteButton
          to={() => navigation.navigate('ReviewDetail')}
          width={size.minusPadding}
          mg="15px 0px 0px 0px"
          content="자세히보기"
        />
      )}
    </Container>
  );
}
