import {getMyReviewItem} from '@/API/Repair/Repair';
import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import Header from '@/Component/Layout/Header';
import Review from '@/Component/Repair/Review';
import ReplyIcon from '@assets/image/ic_reply.png';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import Theme from '@assets/global/Theme';
import {DarkBoldText, DefaultText} from '@/assets/global/Text';
import DefaultImage from '@/assets/global/Image';

const {height} = Dimensions.get('window');
export default function ReviewDetail({route: {params}}) {
  const [comment, setComment] = useState('');
  const {login} = useSelector(state => state);
  const isRecomment = params?.isRecomment !== undefined ? params?.isRecomment : !item?.srt_res_content;
  const [item, setItem] = useState(params?.item);
  const commentSubmit = params?.commentSubmit;
  const isDetailPage = true;
  const navigation = useNavigation();

  useEffect(() => {
    if (!params?.item) {
      getReviewItem();
    }
  }, []);
  const getReviewItem = async () => {
    const response = await getMyReviewItem({
      _mt_idx: login?.idx,
      od_idx: params?.od_idx,
    });
    if (response?.data?.result === 'true') {
      setItem(Object.assign(response?.data?.data?.data, params?.shopItem));
    }
  };

  return (
    <>
      <Header title="리뷰" />
      <ScrollBox pd="0px 16px" keyboardShouldPersistTaps="handled">
        <Box>
          <Review
            item={{
              ...item,
              pt_title: item?.pt_info?.split('|')[0],
              ot_price: item?.pt_info?.split('|')[1],
              srt_brand: item?.ot_bike_brand ?? item?.srt_brand,
              srt_pt_model: item?.ot_bike_model ?? item?.srt_pt_model,
            }}
            isDetailPage
          />
        </Box>
        {isRecomment && item?.srt_res_content?.length > 0 && (
          <RowBox mg="0px 0px 40px">
            <Container pd="10px 10px 10px 44px" backgroundColor={Theme.color.backgroundBlue} borderRadius="10px">
              <BetweenBox backgroundColor="#0000" alignItems="center" width="326px">
                <RowBox backgroundColor={Theme.color.backgroundBlue} alignItems="center">
                  <DarkBoldText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs15}>
                    사장님
                  </DarkBoldText>
                  <DefaultText color={Theme.color.gray} fontSize={Theme.fontSize.fs12}>
                    {item?.srt_adate?.slice(0, 10)}
                  </DefaultText>
                </RowBox>
              </BetweenBox>
              <RowBox backgroundColor="#0000">
                <DefaultText
                  numberOfLines={isDetailPage ? 50 : 3}
                  color={Theme.color.black}
                  width={412 - 32 - 54}
                  fontSize={Theme.fontSize.fs15}
                  lineHeight="22px">
                  {item.srt_res_content}
                </DefaultText>
              </RowBox>
              <PositionBox top="14px" left="13px" backgroundColor="#0000">
                <DefaultImage source={ReplyIcon} width="20px" height="16px" />
              </PositionBox>
            </Container>
          </RowBox>
        )}
      </ScrollBox>
      {!isRecomment && (
        <BetweenBox
          mg="0px 16px"
          height="auto"
          alignItems="center"
          width="380px"
          style={{
            maxHeight: height / 3,
          }}>
          <DefaultInput
            value={comment}
            changeFn={text => setComment(() => text)}
            placeHolder="댓글을 입력해주세요 (500자 이내)"
            width="310px"
            minHeight="44px"
            height="auto"
            multiline
          />
          <LinkButton
            content="등록"
            width="60px"
            height="44px"
            to={() => {
              commentSubmit(item?.srt_idx, comment, moment().format('YYYY-MM-DD'));
              navigation.goBack();
            }}
          />
        </BetweenBox>
      )}
    </>
  );
}
