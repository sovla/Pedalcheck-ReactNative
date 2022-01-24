import {
  BetweenBox,
  Box,
  Container,
  PositionBox,
  RowBox,
  ScrollBox,
} from '@/assets/global/Container';
import React from 'react';
import {useState} from 'react';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, GrayText, IndigoText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import numberFormat from '@/Util/numberFormat';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {DefaultInput} from '@/assets/global/Input';
import SearchIcon from '@assets/image/ic_search.png';
import Review from '@/Component/Repair/Review';
import DummyIcon from '@assets/image/dummy.png';
import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {useEffect} from 'react';
import {addReview, deleteReview, getReview} from '@/API/Manager/RepairHistory';
import {TouchableOpacity, TouchableOpacityBase} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ReviewComment from '@/Component/Repair/ReviewComment';
import moment from 'moment';
import {useLayoutEffect} from 'react';
import {AlertButtons} from '@/Util/Alert';
import {showToastMessage} from '@/Util/Toast';
import Loading from '@/Component/Layout/Loading';
import {imageAddress} from '@assets/global/config';
import profileDefault from '@assets/image/profile_default.png';

// 2022-01-17 17:17:25 현태 수정 필요

export default function RepairHistorySelectReview() {
  const [review, setReview] = useState([]);
  const [tot_page, setTot_page] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isScroll, setIsScroll] = useState(false);

  const {size, login} = useSelector(state => state);

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
      <FlatList
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
            {isLoading && <Loading isAbsolute />}
          </>
        }
        data={review}
        renderItem={({item, index}) => (
          <ReviewRecomment
            setReview={setReview}
            commentSubmit={commentSubmit}
            deleteHandle={deleteHandle}
            size={size}
            item={item}
          />
        )}
        onEndReached={() => {
          if (isScroll) {
            getReviewHandle();
          }
        }}
        onMomentumScrollBegin={() => setIsScroll(true)}
        ListEmptyComponent={
          <Box alignItems="center" mg="20px 0px">
            {!isLoading && <DarkBoldText>검색결과가 없습니다.</DarkBoldText>}
          </Box>
        }
      />
      {/* <Review isDetail /> */}
    </Box>
  );
}

const ReviewRecomment = ({item, size, commentSubmit, deleteHandle}) => {
  const [inputHeight, setInputHeight] = useState(44);
  const [comment, setComment] = useState('');
  const navigation = useNavigation();

  const deletePress = async srt_idx => {
    AlertButtons('댓글을 삭제하시겠습니까? 삭제하면 복구할 수 없습니다.', '확인', '취소', () =>
      deleteHandle(srt_idx),
    );
  };

  return (
    <Box mg="20px 0px 0px">
      <RowBox>
        <DefaultImage
          source={item?.mt_image ? imageAddress + item?.mt_image : profileDefault}
          width="50px"
          height="50px"
        />
        <Box mg="0px 0px 0px 10px">
          <RowBox>
            <DarkBoldText mg="0px 10px 0px 0px" fontSize={Theme.fontSize.fs15}>
              {item?.mt_nickname}
            </DarkBoldText>
            <DarkText fontSize={Theme.fontSize.fs13}>{item?.mbt_brand}</DarkText>
            <GrayText fontSize={Theme.fontSize.fs12}> | </GrayText>
            <DarkText fontSize={Theme.fontSize.fs13}>{item?.mbt_model}</DarkText>
          </RowBox>
          <GrayText fontSize={Theme.fontSize.fs12}>{item?.srt_wdate?.slice(0, 10)}</GrayText>
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
        {item.srt_content}
      </DarkText>

      {item.srt_res_content !== '' && item.srt_res_content ? (
        <RowBox mg="20px 0px 0px">
          <ReviewComment
            reviewDate={item.srt_adate}
            reviewContent={item.srt_res_content}
            size={size}
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
              setInputHeight(event.nativeEvent.contentSize.height);
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
            isRecomment: true,
            item: item,
          })
        }
        mg="20px 0px 20px"
        content="자세히보기"
        borderRadius="3px"
      />
    </Box>
  );
};
