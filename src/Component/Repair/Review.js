import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import {DarkBoldText, DarkText, DefaultText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ShopDummyImage from '@assets/image/shop_default.png';
import {useSelector} from 'react-redux';
import ProfileDefaultIcon from '@/assets/image/profile_default.png';
import {LinkWhiteButton} from '@/assets/global/Button';
import {useNavigation} from '@react-navigation/core';
import Swiper from './Swiper';
import {imageAddress} from '@assets/global/config';
import {useState} from 'react';
import ReviewComment from './ReviewComment';
import {useLayoutEffect} from 'react';
import SwiperAutoHeight from './SwiperAutoHeight';
import Photo from './Photo';

export default function Review({
  isDetail = false,
  isDetailPage = false,
  isRecomment = false,
  width = 'auto',
  mg = '0px',
  item = {},
  isJustShow = false,
}) {
  const [isDetailButton, setIsDetailButton] = useState(false);

  const {size} = useSelector(state => state);
  const navigation = useNavigation();

  const imageArray =
    item?.srt_image?.length > 0
      ? item?.srt_image?.map((v, i) => {
          return {uri: imageAddress + v};
        })
      : item?.srt_img?.length > 0
      ? item?.srt_img.map((v, i) => {
          return {uri: imageAddress + v};
        })
      : [];
  if (
    (item?.srt_content?.length >= 90 || item?.srt_res_content?.length >= 90 || imageArray.length > 1) &&
    !isDetailButton
  ) {
    setIsDetailButton(true);
  }
  useLayoutEffect(() => {
    setIsDetailButton(isDetail);
  }, []);

  return (
    <Box
      pd="20px 0px"
      width={width}
      mg={mg}
      style={
        !isDetailPage && {
          flex: 1,
          borderBottomWidth: isRecomment ? 0 : 1,
          borderBottomColor: Theme.color.backgroundWhiteGray,
        }
      }>
      <RowBox>
        <DefaultImage
          source={item?.mt_image ? {uri: imageAddress + item?.mt_image} : ProfileDefaultIcon}
          width="50px"
          height="50px"
        />
        <Box mg="0px 0px 0px 10px" justifyContent="center" height="50px">
          <RowBox>
            <DarkBoldText fontSize={Theme.fontSize.fs15} mg="0px 10px 0px 0px">
              {item?.mt_nickname}
            </DarkBoldText>
            <DarkText fontSize={Theme.fontSize.fs13}>{item?.srt_brand} </DarkText>
            <DefaultText color={Theme.color.gray} fontSize={Theme.fontSize.fs12}>
              |
            </DefaultText>
            <DarkText fontSize={Theme.fontSize.fs13}> {item?.srt_pt_model}</DarkText>
          </RowBox>
          <RowBox>
            <DefaultText fontSize={Theme.fontSize.fs12} color={Theme.color.gray}>
              {item?.srt_wdate?.slice(0, 16)}
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
          {item?.pt_title}
        </DefaultText>
        <MoneyText
          money={item?.ot_price}
          color={Theme.color.black}
          fontSize={Theme.fontSize.fs15}
          fontWeight={Theme.fontWeight.medium}
        />
      </RowBox>
      <Box mg="15px 0px 0px" borderRadius="10px">
        {isDetailPage ? (
          <Photo imageArray={imageArray} isView isTouch />
        ) : (
          // <Swiper width={size.minusPadding} height={200} imageArray={imageArray} borderRadius="All" isRolling={false} />
          imageArray?.length > 0 && (
            <Box>
              <DefaultImage
                source={imageArray[0]}
                borderRadius="10px"
                width={size.minusPadding}
                height="150px"
                resizeMode="stretch"
              />
              {imageArray?.length > 1 && (
                <PositionBox
                  right="10px"
                  bottom="10px"
                  width="44px"
                  height="24px"
                  borderRadius="12px"
                  alignItems="center"
                  backgroundColor="#3336">
                  <DefaultText>+{imageArray?.length - 1}</DefaultText>
                </PositionBox>
              )}
            </Box>
          )
        )}
      </Box>
      <Box width={size.minusPadding} mg="15px 0px 20px">
        <DarkText numberOfLines={isDetailPage ? 50 : 3} fontSize={Theme.fontSize.fs15} lineHeight="22px">
          {item?.srt_content}
        </DarkText>
      </Box>
      {isRecomment && (
        <RowBox mg="20px 0px 0px">
          <ReviewComment
            reviewDate={item?.srt_adate}
            reviewContent={item?.srt_res_content}
            size={size}
            deletePress={isJustShow ? null : () => deletePress(item?.srt_idx)}
          />
        </RowBox>
      )}

      {isDetailButton && !isDetailPage && (
        <LinkWhiteButton
          to={() => navigation.navigate('ReviewDetail', {item: item, isRecomment: true})}
          width={size.minusPadding}
          mg="15px 0px 0px 0px"
          content="자세히보기"
        />
      )}
    </Box>
  );
}
