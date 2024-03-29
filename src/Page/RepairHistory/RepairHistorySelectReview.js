import {BetweenBox, Box, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {
  DarkBoldText,
  DarkMediumText,
  DarkText,
  DefaultText,
  GrayText,
  IndigoText,
  MoneyText,
} from '@/assets/global/Text';
import {DefaultInput} from '@/assets/global/Input';
import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';

import React, {useState, useLayoutEffect} from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {addReview, deleteReview, getReview} from '@/API/Manager/RepairHistory';

import numberFormat from '@/Util/numberFormat';
import {showToastMessage} from '@/Util/Toast';
import {AlertButtons} from '@/Util/Alert';
import {getHeightPixel} from '@/Util/pixelChange';

import {imageAddress} from '@assets/global/config';
import profileDefault from '@assets/image/profile_default.png';
import SearchIcon from '@assets/image/ic_search.png';

import ReviewComment from '@/Component/Repair/ReviewComment';
import Loading from '@/Component/Layout/Loading';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

// 2022-01-17 17:17:25 현태 수정 필요

export default function RepairHistorySelectReview() {
  const [review, setReview] = useState([]);
  const [tot_page, setTot_page] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isScroll, setIsScroll] = useState(false);

  const {login} = useSelector(state => state);

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    getReviewHandle();
  }, []);

  const getReviewHandle = async isSearch => {
    if (page === 1 || isSearch) {
      setIsLoading(true);
    }

    const response = await getReview({
      _mt_idx: login.idx,
      keyword: keyword,
      page: isSearch ? 1 : page,
    });

    if (response?.data?.result === 'true') {
      if (response?.data?.data?.data?.review_list?.length > 0) {
        if (isSearch) {
          setReview(response?.data?.data?.data?.review_list);
        } else {
          setReview(prev => [...prev, ...response?.data?.data?.data?.review_list]);
        }
        setTot_page(response?.data?.data?.data?.tot_cnt);
        setPage(prev => prev + 1);
      } else {
        if (isSearch) {
          setReview([]);
        }
      }
    }

    setIsLoading(false);
  };

  const commentSubmit = async (srt_idx, srt_res_content, srt_adate) => {
    const response = await addReview({
      _mt_idx: login.idx,
      srt_idx: srt_idx,
      srt_res_content: srt_res_content,
    });

    if (response?.data?.result === 'true') {
      setReview(prev =>
        prev.map((value, index) => {
          if (srt_idx === value.srt_idx) {
            return {...value, srt_res_content: srt_res_content, srt_adate: srt_adate};
          } else {
            return {...value};
          }
        }),
      );
    }
    showToastMessage('등록되었습니다.');
  };

  const deleteHandle = async srt_idx => {
    const response = await deleteReview({
      _mt_idx: login.idx,
      srt_idx: srt_idx,
    });

    if (response?.data?.result === 'true') {
      setReview(prev =>
        prev.map(value => {
          if (value.srt_idx === srt_idx) {
            return {...value, srt_res_content: '', srt_adate: ''};
          } else {
            return {...value};
          }
        }),
      );
      showToastMessage('삭제되었습니다.');
    }
  };

  return (
    <Box pd="0px 16px">
      <KeyboardAwareFlatList
        style={{marginBottom: 60}}
        keyExtractor={(item, index) => item.srt_idx}
        ListHeaderComponent={
          <>
            <RowBox mg="20px 0px 10px">
              <DarkBoldText fontSize={Theme.fontSize.fs15}>리뷰</DarkBoldText>
              <IndigoText
                mg="0px 0px 0px 5px"
                letterSpacing="0px"
                fontSize={Theme.fontSize.fs15}
                fontWeight={Theme.fontWeight.medium}>
                {numberFormat(tot_page)}
              </IndigoText>
            </RowBox>
            <RowBox>
              <DefaultInput
                backgroundColor={Theme.color.white}
                borderColor={Theme.borderColor.gray}
                placeHolder="검색어를 입력하세요"
                width="380px"
                value={keyword}
                changeFn={text => setKeyword(text)}
                maxLength={50}
              />
              <PositionBox backgroundColor="#0000" right="16px" bottom="11px">
                <TouchableOpacity
                  onPress={async () => {
                    if (keyword !== '') {
                      setPage(1);
                      await getReviewHandle(true);
                    }
                  }}>
                  <DefaultImage source={SearchIcon} width="21px" height="21px" />
                </TouchableOpacity>
              </PositionBox>
            </RowBox>
          </>
        }
        data={review}
        renderItem={({item, index}) => (
          <ReviewRecomment
            setReview={setReview}
            commentSubmit={commentSubmit}
            deleteHandle={deleteHandle}
            item={item}
          />
        )}
        onEndReached={() => {
          if (isScroll) {
            getReviewHandle();
          }
        }}
        onScrollBeginDrag={() => setIsScroll(true)}
        ListEmptyComponent={
          <>
            {isLoading ? (
              <Box alignItems="center" justifyContent="center" width="380px" height={`${getHeightPixel(300)}px`}>
                <Loading />
              </Box>
            ) : (
              <Box alignItems="center" justifyContent="center" width="380px" height={`${getHeightPixel(300)}px`}>
                <DarkMediumText>리뷰 내역이 없습니다.</DarkMediumText>
              </Box>
            )}
          </>
        }
      />
      {/* <Review isDetail /> */}
    </Box>
  );
}

const ReviewRecomment = ({item, commentSubmit, deleteHandle}) => {
  const [inputHeight, setInputHeight] = useState(44);
  const [comment, setComment] = useState('');
  const navigation = useNavigation();

  const deletePress = async srt_idx => {
    AlertButtons('댓글을 삭제하시겠습니까? 삭제하면 복구할 수 없습니다.', '확인', '취소', () => deleteHandle(srt_idx));
  };
  const imageArray = item?.srt_image ?? [];
  return (
    <Box mg="20px 0px 0px">
      <RowBox>
        <DefaultImage
          source={item?.mt_image ? {uri: imageAddress + item?.mt_image} : profileDefault}
          width="50px"
          height="50px"
        />
        <Box mg="0px 0px 0px 10px">
          <RowBox>
            <DarkBoldText mg="0px 10px 0px 0px" fontSize={Theme.fontSize.fs15}>
              {item?.mt_nickname}
            </DarkBoldText>
            <DarkText fontSize={Theme.fontSize.fs13}>{item?.ot_bike_brand + ' '}</DarkText>
            <GrayText fontSize={Theme.fontSize.fs12}> | </GrayText>
            <DarkText fontSize={Theme.fontSize.fs13}>{' ' + item?.ot_bike_model}</DarkText>
          </RowBox>
          <GrayText fontSize={Theme.fontSize.fs12}>{item?.srt_wdate?.slice(0, 10)}</GrayText>
        </Box>
      </RowBox>
      <RowBox mg="10px 0px 0px">
        <IndigoText mg="0px 10px 0px 0px" fontSize={Theme.fontSize.fs15}>
          {item?.pt_info?.split('|')[0]}
        </IndigoText>
        <MoneyText
          fontWeight={Theme.fontWeight.medium}
          fontSize={Theme.fontSize.fs15}
          money={item?.pt_info?.split('|')[1]}
          color={Theme.color.black}
        />
      </RowBox>
      {imageArray?.length > 0 && (
        <Box mg="15px 0px 0px" borderRadius="10px">
          <Box>
            <DefaultImage
              source={{uri: imageAddress + imageArray[0]}}
              borderRadius="10px"
              width="380px"
              height={`150px`}
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
        </Box>
      )}
      <DarkText mg="10px 0px 0px" fontSize={Theme.fontSize.fs15}>
        {item.srt_content}
      </DarkText>

      {item.srt_res_content !== '' && item.srt_res_content ? (
        <RowBox mg="20px 0px 0px">
          <ReviewComment
            reviewDate={item.srt_adate}
            reviewContent={item.srt_res_content}
            deletePress={() => deletePress(item.srt_idx)}
          />
        </RowBox>
      ) : (
        <BetweenBox mg="20px 0px 0px" width="380px" style={{maxHeight: 120}}>
          <DefaultInput
            multiline={true}
            placeHolder="댓글을 입력해주세요 (500자 이내)"
            width="310px"
            height={inputHeight + 'px'}
            maxHeight={'120px'}
            onContentSizeChange={event => {
              if (event.nativeEvent.contentSize.height > 44) setInputHeight(event.nativeEvent.contentSize.height);
            }}
            value={comment}
            changeFn={text => setComment(text)}
            maxLength={500}
          />
          <LinkButton
            to={() => {
              commentSubmit(item.srt_idx, comment, moment().format('YYYY-MM-DD'));
              setComment('');
            }}
            content="등록"
            width="60px"
            height="44px"
          />
        </BetweenBox>
      )}
      <LinkWhiteButton
        to={() =>
          navigation.navigate('ReviewDetail', {
            isRecomment: item?.srt_res_content ? true : false,
            item: item,
            commentSubmit: commentSubmit,
          })
        }
        mg="20px 0px 20px"
        content="자세히보기"
        borderRadius="3px"
      />
    </Box>
  );
};
