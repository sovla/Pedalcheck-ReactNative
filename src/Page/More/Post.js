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
import {FlatList} from 'react-native-gesture-handler';

export default function Post() {
  const {size} = useSelector(state => state);
  const [select, setSelect] = useState('공지');
  const [selectPost, setSelectPost] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBoardListHandle();
  }, [select]);

  const getBoardListHandle = () => {
    getBoardList({
      view_mode: 'list',
      board: select === '공지' ? 'notice' : 'event',
    }).then(res =>
      select === '이벤트'
        ? res?.data?.data?.data?.board == undefined
          ? setEventData(null)
          : setEventData(res?.data?.data?.data?.board)
        : res?.data?.data?.data?.board == undefined
        ? setNoticeData(null)
        : setNoticeData(res?.data?.data?.data?.board),
    );
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Header title="공지 및 이벤트" />

      <Container>
        {/* <ScrollBox width={size.designWidth} alignItems="center">
          {postData !== null
            ? postData.map((item, index) => {
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
              })
            : null}
        </ScrollBox> */}
        <FlatList
          ListHeaderComponent={
            <>
              <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
            </>
          }
          data={select === '공지' ? noticeData : eventData}
          renderItem={({item, index}) => {
            const isSelect = selectPost.find(findItem => findItem === item.title);
            const changeItem = {
              title: select === '공지' ? item?.ft_title : item?.bt_title,
              date: select === '공지' ? item?.ft_wdate : item?.bt_wdate,
              content: select === '공지' ? item?.ft_content : item?.bt_content,
              image: select === '공지' ? item?.ft_image1 : item?.bt_image1,
            };
            return (
              <PostItem
                key={index}
                selectPost={selectPost}
                setSelectPost={setSelectPost}
                item={changeItem}
                index={index}
                isSelect={isSelect}
              />
            );
          }}
          keyExtractor={({item, index}) => index}
          onEndReached={() => {
            getBoardListHandle();
          }}
        />
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
