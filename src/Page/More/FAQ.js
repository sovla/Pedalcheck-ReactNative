import {getFAQ} from '@/API/More/More';
import {Box, ScrollBox} from '@/assets/global/Container';
import {DarkMediumText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import PostItem from '@/Component/More/PostItem';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function FAQ() {
  const [selectPost, setSelectPost] = useState([]);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    apiGetFAQ();
  }, []);

  const apiGetFAQ = () => {
    setIsLoading(true);
    if (isResult) {
      setIsLoading(false);
      return;
    }
    getFAQ({page: page}).then(res => {
      if (res?.data?.result === 'true' && res?.data?.data?.data) {
        setPostList(prev => [...prev, ...res?.data?.data?.data]);
        setPage(prev => prev + 1);
      } else {
        setIsResult(true);
      }
    });
    setIsLoading(false);
  };
  return (
    <>
      <Header title="자주하는 질문" />
      <FlatList
        data={postList}
        style={{
          width: getPixel(380),
          marginHorizontal: getPixel(16),
        }}
        onEndReached={() => apiGetFAQ()}
        renderItem={({item, index}) => {
          const changeItem = {
            title: item?.ft_title,
            date: item?.ft_wdate,
            content: item?.ft_content,
            image: item?.ft_image,
            idx: item?.ft_idx,
          };
          return (
            <PostItem
              item={changeItem}
              index={index}
              selectPost={selectPost}
              setSelectPost={setSelectPost}
              isImage={false}
            />
          );
        }}
        ListEmptyComponent={
          <Box mg="100px 0px 0px" justifyContent="center" alignItems="center">
            {!isLoading && <DarkMediumText>등록된 게시물이 없습니다.</DarkMediumText>}
          </Box>
        }
      />
    </>
  );
}
