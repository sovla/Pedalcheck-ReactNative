import {Box} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {FlatList} from 'react-native';
import QuestionItem from '@/Component/More/QuestionItem';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {modalClose, modalOpen, setModalProp} from '@/Store/modalState';
import {useEffect} from 'react';
import {deleteQna, getQnaList} from '@/API/More/More';
import QuestionAddition from '@/Component/More/Question/QuestionAddition';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {useSelector} from 'react-redux';

// 2022-01-03 10:51:16
// Junhan
// 1:1 문의 페이지

export default function Question() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocus = navigation.isFocused();
  const {login} = useSelector(state => state);

  const [select, setSelect] = useState('페달체크');
  const [pedalCheckList, setPedalCheckList] = useState([]); // 페달체크 문의내역
  const [shopList, setShopList] = useState([]); // 정비소 문의내역

  const [questionSelect, setQuestionSelect] = useState([]);
  const [page, setPage] = useState(1);
  const [shopPage, setShopPage] = useState(1);

  const [isLastPage, setIsLastPage] = useState({
    pedalCheck: false,
    shop: false,
  });

  const initState = () => {
    setSelect('페달체크');
    setPedalCheckList([]);
    setShopList([]);
    setQuestionSelect([]);
    setPage(1);
    setShopPage(1);
    setIsLastPage({
      pedalCheck: false,
      shop: false,
    });
  };

  const onPressItem = idx => {
    //  idx 값으로 선택여부 배열에 추가해줌
    if (questionSelect.find(findItem => findItem === idx)) {
      setQuestionSelect(prev => prev.filter(filterItem => filterItem !== idx));
    } else {
      setQuestionSelect(prev => [...prev, idx]);
    }
  };

  const onPressDelete = async idx => {
    await dispatch(
      setModalProp({
        modalProp: {
          leftPress: () => questionDelete(idx),
        },
      }),
    );
    await dispatch(modalOpen('questionDelete'));
  };

  const questionDelete = idx => {
    deleteQna({
      _mt_idx: login?.idx,
      qt_idx: idx,
    }).then(async res => {
      console.log(res, '삭제완료');
      if (res.data.result === 'true') {
        if (select === '페달체크') {
          await setPedalCheckList(prev => prev.filter(item => item.qt_idx !== idx));
        } else {
          await setShopList(prev => prev.filter(item => item.qt_idx !== idx));
        }
        await dispatch(modalClose());
      }
    });
  };
  const onPressUpdate = item => {
    if (select === '페달체크') {
      navigation.navigate('QuestionWrite', {item});
    } else {
      navigation.navigate('RepairQuestion', {item});
    }
  };

  const apiGetQnaList = paramPage => {
    const type = select === '페달체크' ? 'pedalCheck' : 'shop';
    if (!isLastPage[type]) {
      getQnaList({
        _mt_idx: login?.idx,
        qt_type: select === '페달체크' ? 2 : 1,
        page: paramPage ?? select === '페달체크' ? page : shopPage,
      }).then(res => {
        const qna_list = res?.data?.data?.data?.qna_list;

        if (res.data.result === 'true' && qna_list) {
          // 데이터 true , qna_list 존재
          if (select === '페달체크') {
            setPage(prev => prev + 1);
            setPedalCheckList(prev => [...prev, ...qna_list]);
          } else {
            setShopPage(prev => prev + 1);
            setShopList(prev => [...prev, ...qna_list]);
          }
        } else if (res.data.result === 'true') {
          // 데이터 true , qna_list 없을때 라스트페이지 적용
          setIsLastPage(prev => ({
            ...prev,
            [type]: true,
          }));
        }
      });
    }
  };

  useEffect(() => {
    if (isFocus) {
      apiGetQnaList();
    } else {
      initState();
    }
  }, [isFocus]);

  useUpdateEffect(() => {
    // menu 이동시 선택값 초기화
    if (isFocus) {
      setQuestionSelect([]);
      apiGetQnaList();
    }
  }, [select]);

  return (
    <>
      <Header title="1:1문의" />

      <FlatList
        style={{flex: 1}}
        ListHeaderComponent={
          <>
            <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
            {select === '페달체크' && <QuestionAddition />}
          </>
        }
        onEndReached={() => {
          apiGetQnaList();
        }}
        data={select === '페달체크' ? pedalCheckList : shopList}
        renderItem={({item, index}) => {
          const changeItem = {
            categoryName: item?.qt_ca ?? item?.mst_name,
            status: item?.qt_answer ? '답변' : '미답변',
            questionTitle: item?.qt_title,
            writeDate: item?.qt_wdate,
            content: item?.qt_content,
            adminContent: item?.qt_answer,
            adminWriteDate: item?.qt_adate,
          };
          return (
            <Box mg="0px 16px">
              <QuestionItem
                {...changeItem}
                isSelect={questionSelect.find(findItem => findItem === item?.qt_idx)}
                onPressItem={() => onPressItem(item?.qt_idx)}
                onPressDelete={() => onPressDelete(item?.qt_idx)}
                onPressUpdate={() => onPressUpdate(item)}
              />
            </Box>
          );
        }}
        keyExtractor={(item, index) => {
          return select + index;
        }}
      />
    </>
  );
}

export const questionList = [
  {
    categoryName: '자전거 브랜드 / 모델 추가요청',
    status: '미답변',
    questionTitle: 'Zyden',
    writeDate: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
    adminContent:
      '관리자 댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히보기 할 수 있다. 관리자 댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히보기 할 수 있다.',
    adminWriteDate: '2021-10-13',
  },
  {
    categoryName: '자전거 브랜드 / 모델 추가요청',
    status: '답변',
    questionTitle: '브랜드 추가',
    writeDate: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
    adminContent:
      '관리자 댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히보기 할 수 있다. 관리자 댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히보기 할 수 있다.',
    adminWriteDate: '2021-10-13',
  },
];

const menuItem = ['페달체크', '정비소'];
