import {BetweenBox, Box, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import {DarkBoldText, DarkMediumText, DarkText, DefaultText, MediumText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ShopDummyImage from '@assets/image/shop_default.png';
import {useDispatch, useSelector} from 'react-redux';
import ProfileDefaultIcon from '@/assets/image/profile_default.png';
import {BorderButton, LinkWhiteButton} from '@/assets/global/Button';
import {useNavigation} from '@react-navigation/core';
import Swiper from './Swiper';
import {imageAddress} from '@assets/global/config';
import {useState} from 'react';
import ReviewComment from './ReviewComment';
import {useLayoutEffect} from 'react';
import SwiperAutoHeight from './SwiperAutoHeight';
import Photo from './Photo';
import {getPixel} from '@/Util/pixelChange';
import AutoHeightImage from 'react-native-auto-height-image';
import {deleteReview, reportUser} from '@/API/Shop/Shop';
import {Text, TouchableOpacity} from 'react-native';
import {AlertButton, AlertButtons} from '@/Util/Alert';
import {modalOpenAndProp} from '@/Store/modalState';
import {showToastMessage} from '@/Util/Toast';

export default function Review({
  isDetail = false,
  isDetailPage = false,
  isRecomment = false,
  width = 'auto',
  mg = '0px',
  item = {},
  isJustShow = false,
  onPressDelete,
  onPressReportHandle,
}) {
  const [isDetailButton, setIsDetailButton] = useState(false);
  const {login} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isCoupon = item?.ot_use_coupon?.length > 0;
  const isMyReview = login?.idx === item?.mt_idx;
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

  const onPressBlind = idx => {
    reportUser({
      _mt_idx: login?.idx,
      mt_blind_idx: idx,
    }).then(res => {
      if (res.data?.result === 'true') {
        showToastMessage('차단 완료');
      } else {
        showToastMessage(res.data?.msg);
      }
      onPressReportHandle();
    });
  };
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
          borderBottomWidth: 10,
          borderBottomColor: '#00000005',
        }
      }>
      <BetweenBox width="380px">
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
        <RowBox>
          {isMyReview && onPressDelete && (
            <TouchableOpacity
              onPress={() => {
                AlertButtons(
                  '삭제하시겠습니까?',
                  '확인',
                  '취소',
                  () => {
                    onPressDelete(item?.srt_idx);
                  },
                  () => {},
                );
              }}>
              <Box mg="0px 5px">
                <BorderButton width="auto" height="25px" borderColor={Theme.borderColor.gray} color={Theme.color.black}>
                  <DarkMediumText fontSize={Theme.fontSize.fs13}>삭제</DarkMediumText>
                </BorderButton>
              </Box>
            </TouchableOpacity>
          )}
          {!isMyReview && !isDetailPage && login?.idx?.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  modalOpenAndProp({
                    modalComponent: 'report',
                    item: item,
                    onPressReportHandle: onPressReportHandle,
                  }),
                );
              }}>
              <Box mg="0px 5px">
                <BorderButton width="auto" height="25px" borderColor={Theme.borderColor.gray}>
                  <MediumText color={Theme.color.black} fontSize={Theme.fontSize.fs13}>
                    신고
                  </MediumText>
                </BorderButton>
              </Box>
            </TouchableOpacity>
          )}
          {!isMyReview && !isDetailPage && login?.idx?.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                AlertButtons(
                  '차단하시겠습니까?',
                  '확인',
                  '취소',
                  () => {
                    onPressBlind(item?.mt_idx);
                  },
                  () => {},
                );
              }}>
              <Box mg="0px 5px">
                <BorderButton width="auto" height="25px" borderColor={Theme.borderColor.gray}>
                  <MediumText color={Theme.color.black} fontSize={Theme.fontSize.fs13}>
                    차단
                  </MediumText>
                </BorderButton>
              </Box>
            </TouchableOpacity>
          )}
        </RowBox>
      </BetweenBox>
      <RowBox mg="10px 0px 0px">
        <DefaultText
          mg="0px 5px 0px 0px"
          color={Theme.color.indigo}
          fontSize={Theme.fontSize.fs15}
          fontWeight={Theme.fontWeight.bold}>
          {item?.pt_title}
        </DefaultText>
        {!isCoupon && (
          <MoneyText
            money={item?.ot_price}
            color={Theme.color.black}
            fontSize={Theme.fontSize.fs15}
            fontWeight={Theme.fontWeight.medium}
          />
        )}
      </RowBox>
      <Box mg="15px 0px 0px" borderRadius="10px">
        {isDetailPage ? (
          <Photo imageArray={imageArray} isView isTouch />
        ) : (
          // <Swiper width="380px" height={200} imageArray={imageArray} borderRadius="All" isRolling={false} />
          imageArray?.length > 0 && (
            <Box>
              <AutoHeightImage
                source={imageArray[0]}
                // borderRadius="10px"
                width={getPixel(380)}
                maxHeight={200}
                animated
                style={{borderRadius: 10}}
                resizeMode="cover"
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
      <Box width="380px" mg="15px 0px 20px">
        <DarkText numberOfLines={isDetailPage ? 50 : 3} fontSize={Theme.fontSize.fs15} lineHeight="22px">
          {item?.srt_content}
        </DarkText>
      </Box>
      {isRecomment && (
        <RowBox mg="20px 0px 0px">
          <ReviewComment
            reviewDate={item?.srt_adate}
            reviewContent={item?.srt_res_content}
            deletePress={isJustShow ? null : () => deletePress(item?.srt_idx)}
          />
        </RowBox>
      )}

      {isDetailButton && !isDetailPage && (
        <LinkWhiteButton
          to={() => navigation.navigate('ReviewDetail', {item: item, isRecomment: true})}
          width="380px"
          mg="15px 0px 0px 0px"
          content="자세히보기"
        />
      )}
    </Box>
  );
}
