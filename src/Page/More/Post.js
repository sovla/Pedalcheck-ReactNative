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
import {useFocusEffect} from '@react-navigation/native';

export default function Post({route: {params}}) {
  const menuItem = ['공지', '이벤트'];

  const {size} = useSelector(state => state);

  const [select, setSelect] = useState('공지');
  const [selectPost, setSelectPost] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);

  const [noticePage, setNoticePage] = useState(1);
  const [isScroll, setIsScroll] = useState(false);
  const [eventPage, setEventPage] = useState(1);

  const [last, setLast] = useState({
    notice: false,
    event: false,
  });

  useEffect(() => {
    getBoardListHandle();
  }, [select]);

  useFocusEffect(
    React.useCallback(() => {
      if (params?.select) {
        setSelect(params.select);
        if (params?.bt_idx) setSelectPost(prev => [...prev, params.bt_idx]);
      }
    }, []),
  );

  const getBoardListHandle = () => {
    if (select === '이벤트' && last.event) {
      return;
    } else if (select === '공지' && last.notice) {
      return;
    }

    getBoardList({
      view_mode: 'list',
      board: select === '공지' ? 'notice' : 'event',
      page: select === '공지' ? noticePage : eventPage,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => {
        if (select === '이벤트' && data?.board) {
          setEventData(prev => [...prev, ...data.board]);
          setEventPage(prev => prev + 1);
        } else if (select === '공지' && data?.board) {
          setNoticeData(prev => [...prev, ...data.board]);
          setNoticePage(prev => prev + 1);
        } else if (!data?.board?.length) {
          if (select === '이벤트') {
            setLast(prev => ({
              ...prev,
              event: true,
            }));
          } else {
            setLast(prev => ({
              ...prev,
              notice: true,
            }));
          }
        }
      });
  };

  return (
    <>
      <Header title="공지 및 이벤트" />

      <Container>
        <FlatList
          ListHeaderComponent={
            <>
              <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
            </>
          }
          data={select === '공지' ? noticeData : eventData}
          renderItem={({item, index}) => {
            const type = select === '공지' ? 'ft_' : 'bt_';
            const changeItem = {
              title: item[type + 'title'],
              date: item[type + 'wdate'],
              content: item[type + 'content'],
              image: item[type + 'image1'],
              idx: item[type + 'idx'],
            };
            return (
              <PostItem
                key={index}
                selectPost={selectPost}
                setSelectPost={setSelectPost}
                item={changeItem}
                index={index}
              />
            );
          }}
          keyExtractor={({item, index}) => index}
          onEndReached={() => {
            if (isScroll) {
              getBoardListHandle();
              setIsScroll(false);
            }
          }}
          onMomentumScrollBegin={() => {
            setIsScroll(true);
          }}
        />
      </Container>
    </>
  );
}
