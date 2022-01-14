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

export default function RepairHistorySelectQuestion() {
  //const {login} = useSelector(state => state);
  const [isScroll, setIsScroll] = useState(false);

  const [selectComment, setSelectComment] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocus = navigation.isFocused();

  const onPressRecomment = index => {
    if (selectComment.find(findIndex => findIndex === index)) {
      setSelectComment(prev => prev.filter(filterItem => filterItem !== index));
    } else {
      setSelectComment(prev => [...prev, index]);
    }
  };

  useEffect(() => {
    getQnaListHandle();
  }, [isFocus]);

  const getQnaListHandle = async () => {
    const response = await getQnaList({
      _mt_idx: 10, //login.idx,
      page: page,
    });
    if (response?.data?.result === 'true') {
      if (response?.data?.data?.data?.qna_list?.length > 0) {
        setQuestionList(prev => [...prev, ...response?.data?.data?.data?.qna_list]);
      }
    }
  };

  return (
    <Box pd="0px 16px">
      <FlatList
        data={questionList}
        renderItem={({item, index}) => {
          return (
            <QuestionRecomment
              key={index}
              onPressUpdate={() =>
                dispatch(
                  modalOpenAndProp({
                    modalComponent: 'questionSubmit',
                    item: item,
                  }),
                )
              }
              onPressSubmit={() =>
                dispatch(
                  modalOpenAndProp({
                    modalComponent: 'questionSubmit',
                    item: item,
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
            />
          );
        }}
        onEndReached={() => {
          if (isScroll) {
            getQnaListHandle();
            setIsScroll(false);
          }
        }}
        onMomentumScrollBegin={() => {
          setIsScroll(true);
        }}
      />
    </Box>
  );
}

const commentList = [0, 1, 2, 3, 4];
