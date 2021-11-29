import {BorderButton, Button, LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PlusIcon from '@assets/image/ic_plus_w.png';
import ReplyIcon from '@assets/image/ic_reply.png';
import {
  DarkBoldText,
  DarkMediumText,
  DarkText,
  DefaultText,
  GrayText,
  IndigoText,
} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import QuestionItem from '@/Component/More/QuestionItem';
import {useNavigation} from '@react-navigation/core';

export default function Question() {
  const [select, setSelect] = useState('페달체크');
  const [questionSelect, setQuestionSelect] = useState([]);
  const navigation = useNavigation();
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
  return (
    <>
      <Header title="1:1문의" />
      <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
      <Box mg="16px 16px 0px">
        <TouchableOpacity onPress={onPressRegister}>
          <Button>
            <RowBox backgroundColor="#0000">
              <DefaultImage source={PlusIcon} width="24px" height="24px" />
              <DefaultText>등록하기</DefaultText>
            </RowBox>
          </Button>
        </TouchableOpacity>
        {questionList.map(item => {
          return (
            <QuestionItem
              {...item}
              isSelect={questionSelect.find(findItem => findItem === item.questionTitle)}
              onPressItem={() => onPressItem(item.questionTitle)}
            />
          );
        })}
      </Box>
    </>
  );
}

const questionList = [
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
