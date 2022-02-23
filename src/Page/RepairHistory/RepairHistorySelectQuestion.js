import {Box} from '@/assets/global/Container';
import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {modalOpen, modalOpenAndProp} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/native';
import QuestionRecomment from '@/Component/RepairHistory/QuestionRecomment';
import {useEffect} from 'react';
import {getQnaList} from '@/API/Manager/RepairHistory';
import {FlatList} from 'react-native-gesture-handler';
import {isList} from 'immutable';
import {login} from '@react-native-seoul/kakao-login';
import {DarkMediumText} from '@/assets/global/Text';
import Loading from '@/Component/Layout/Loading';
import {getHeightPixel} from '@/Util/pixelChange';

export default function RepairHistorySelectQuestion() {
  //const {login} = useSelector(state => state);
  const [isScroll, setIsScroll] = useState(false);

  const [selectComment, setSelectComment] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalClose, setIsModalClose] = useState(true);
  const [isLast, setIsLast] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocus = navigation.isFocused();

  const {login} = useSelector(state => state);

  const onPressRecomment = index => {
    if (selectComment.find(findIndex => findIndex === index)) {
      setSelectComment(prev => prev.filter(filterItem => filterItem !== index));
    } else {
      setSelectComment(prev => [...prev, index]);
    }
  };

  const setRecomment = (index, answer) => {
    setQuestionList(prev =>
      prev.map(value => {
        if (value.qt_idx === index) {
          return {...value, qt_status: '답변', qt_answer: answer};
        } else {
          return {...value};
        }
      }),
    );
  };

  useEffect(() => {
    getQnaListHandle();
  }, [isFocus, modalOpenAndProp]);

  const getQnaListHandle = async () => {
    if (isLast) {
      return;
    }
    setIsLoading(true);
    const response = await getQnaList({
      _mt_idx: login.idx,
      page: page,
    });
    if (response?.data?.result === 'true') {
      if (response?.data?.data?.data?.qna_list?.length > 0) {
        setPage(prev => prev + 1);
        setQuestionList(prev => [...prev, ...response?.data?.data?.data?.qna_list]);
      } else {
        setIsLast(true);
      }
    }

    setIsLoading(false);
  };

  return (
    <Box pd="0px 16px 20px">
      <FlatList
        data={questionList}
        ListHeaderComponent={<></>}
        renderItem={({item, index}) => {
          return (
            <>
              <QuestionRecomment
                key={index}
                onPressUpdate={() =>
                  dispatch(
                    modalOpenAndProp({
                      modalComponent: 'questionSubmit',
                      item: item,
                      setRecomment: setRecomment,
                    }),
                  )
                }
                onPressSubmit={() =>
                  dispatch(
                    modalOpenAndProp({
                      modalComponent: 'questionSubmit',
                      item: item,
                      setRecomment: setRecomment,
                    }),
                  )
                }
                onPressItem={() => {
                  onPressRecomment(index + 1);
                }}
                isSelect={selectComment.find(findItem => findItem === index + 1) ? true : false}
                status={item?.qt_status === '답변' ? '답변완료' : item?.qt_status}
                // categoryName="개선제안" //getCategoryNumber(item?.qt_ca)
                questionTitle={item?.qt_title}
                writeDate={item?.qt_wdate}
                content={item?.qt_content}
                adminContent={item?.qt_answer}
                adminWriteDate={item?.qt_adate}
                writeName={item?.mt_name}
              />
            </>
          );
        }}
        onEndReached={() => {
          if (isScroll) {
            getQnaListHandle();

            setIsScroll(false);
          }
        }}
        onScrollBeginDrag={() => {
          setIsScroll(true);
        }}
        ListEmptyComponent={
          <>
            {isLoading ? (
              <Box alignItems="center" justifyContent="center" width="380px" height={`${getHeightPixel(450)}px`}>
                <Loading />
              </Box>
            ) : (
              <Box alignItems="center" justifyContent="center" width="380px" height={`${getHeightPixel(450)}px`}>
                <DarkMediumText>1:1 문의 내역이 없습니다.</DarkMediumText>
              </Box>
            )}
          </>
        }
      />
      {isLast && <Box mg="10px 0"></Box>}
    </Box>
  );
}

const commentList = [0, 1, 2, 3, 4];
