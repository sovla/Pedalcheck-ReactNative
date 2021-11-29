import {Box, ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import PostItem from '@/Component/More/PostItem';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function FAQ() {
  const {size} = useSelector(state => state);
  const [selectPost, setSelectPost] = useState([]);
  return (
    <>
      <Header title="자주하는 질문" />
      <ScrollBox width={size.designWidth} alignItems="center">
        {postList.map((item, index) => {
          return (
            <PostItem
              item={item}
              index={index}
              selectPost={selectPost}
              setSelectPost={setSelectPost}
            />
          );
        })}
      </ScrollBox>
    </>
  );
}

const postList = [
  {
    title: '팀 적립 기능 사용 중지 안내',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  },
  {
    title: '팀 적립 기능 사용 중지 안내1',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  },
  {
    title: '팀 적립 기능 사용 중지 안내2',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  },
  {
    title: '팀 적립 기능 사용 중지 안내3',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  },
  {
    title: '팀 적립 기능 사용 중지 안내4',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  },
  {
    title: '팀 적립 기능 사용 중지 안내5',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  },
  {
    title: '팀 적립 기능 사용 중지 안내6',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  },
  {
    title: '팀 적립 기능 사용 중지 안내7',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  },
];
