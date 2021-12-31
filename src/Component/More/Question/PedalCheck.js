import {Button} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import PlusIcon from '@assets/image/ic_plus_w.png';
import {DefaultText} from '@/assets/global/Text';
import QuestionItem from '@/Component/More/QuestionItem';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {modalOpen} from '@/Store/modalState';
import {useEffect} from 'react';
import {getQnaList} from '@/API/More/More';
import {getCategoryName} from '@/Util/changeCategory';
import {getPixel} from '@/Util/pixelChange';

export default function PedalCheck({
  pedalChecklist,
  setPedalCheckList,
  setSelect,
  select,
  menuItem,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocus = navigation.isFocused();

  const [questionSelect, setQuestionSelect] = useState([]);
  const [page, setPage] = useState(1);
  const onPressItem = title => {
    if (questionSelect.find(findItem => findItem === title)) {
      setQuestionSelect(prev => prev.filter(filterItem => filterItem !== title));
    } else {
      setQuestionSelect(prev => [...prev, title]);
    }
  };

  const onPressRegister = () => {
    navigation.navigate('QuestionWrite');
  };

  const onPressDelete = () => {
    dispatch(modalOpen('questionDelete'));
  };

  const apiGetQnaList = () => {
    getQnaList({
      _mt_idx: 4,
      qt_type: 2,
      page: page,
    }).then(res => {
      if (res.data.result === 'true') {
        if (res?.data?.data?.data?.qna_list?.length > 0) {
          setPage(prev => prev + 1);
          setPedalCheckList(prev => [...prev, ...res?.data?.data?.data?.qna_list]);
        }
      }
    });
  };

  useEffect(() => {
    apiGetQnaList();
  }, [isFocus]);
  return (
    <>
      <FlatList
        style={{marginBottom: 50}}
        ListHeaderComponent={
          <>
            <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
            <TouchableOpacity onPress={onPressRegister} style={{marginHorizontal: getPixel(16)}}>
              <Button>
                <RowBox backgroundColor="#0000">
                  <DefaultImage source={PlusIcon} width="24px" height="24px" />
                  <DefaultText>등록하기</DefaultText>
                </RowBox>
              </Button>
            </TouchableOpacity>
          </>
        }
        onEndReached={() => apiGetQnaList()}
        data={pedalChecklist}
        renderItem={({item, index}) => {
          const changeItem = {
            categoryName: item?.qt_ca,
            status: item?.qt_answer ? '답변' : '미답변',
            questionTitle: item?.qt_title,
            writeDate: item?.qt_wdate,
            content: item?.qt_content,
            adminContent: item?.qt_answer,
            adminWriteDate: item?.qt_adate,
          };
          return (
            <QuestionItem
              {...changeItem}
              isSelect={questionSelect.find(findItem => findItem === item?.qt_idx)}
              onPressItem={() => onPressItem(item?.qt_idx)}
              onPressDelete={onPressDelete}
            />
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </>
  );
}
