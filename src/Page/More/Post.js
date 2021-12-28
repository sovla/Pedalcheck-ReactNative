import {BetweenBox, Box, Container, ScrollBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';

import ArrowUpIcon from '@assets/image/list_arr_top.png';
import DummyIcon from '@assets/image/default_5.png';
import {useSelector} from 'react-redux';
import DefaultImage from '@/assets/global/Image';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {TouchableOpacity} from 'react-native';
import PostItem from '@/Component/More/PostItem';
import Marking from 'react-native-calendars/src/calendar/day/marking';
import {useEffect} from 'react';
import {getBoardList} from '@/API/More/More';

export default function Post() {
  const {size} = useSelector(state => state);
  const [select, setSelect] = useState('공지');
  const [selectPost, setSelectPost] = useState([]);
  const [postData, setPostData] = useState([]);

  const board_list_handle = async () => {
    try {
      const response = await getBoardList({
        view_mode: 'main',
        board: select === '공지' ? 'notice' : 'event',
      });
      setPostData(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    board_list_handle();
  }, [select]);

  return (
    <>
      <Header title="공지 및 이벤트" />
      <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
      <Container>
        <ScrollBox width={size.designWidth} alignItems="center">
          {postList.map((item, index) => {
            const isSelect = selectPost.find(findItem => findItem === item.title);
            return (
              <PostItem
                key={index}
                selectPost={selectPost}
                setSelectPost={setSelectPost}
                item={item}
                index={index}
                isSelect={isSelect}
              />
            );
          })}
        </ScrollBox>
      </Container>
    </>
  );
}

const menuItem = ['공지', '이벤트'];

const postList = [
  {
    title: '팀 적립 기능 사용 중지 안내',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
    image: DummyIcon,
  },
  {
    title: '팀 적립 기능 사용 중지 안내1',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
    image: DummyIcon,
  },
  {
    title: '팀 적립 기능 사용 중지 안내2',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
    image: DummyIcon,
  },
  {
    title: '팀 적립 기능 사용 중지 안내3',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
    image: DummyIcon,
  },
  {
    title: '팀 적립 기능 사용 중지 안내4',
    date: '2021-10-15 14:22',
    content:
      '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
    image: DummyIcon,
  },
];
