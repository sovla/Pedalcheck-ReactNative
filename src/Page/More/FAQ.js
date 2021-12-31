import {getFAQ} from '@/API/More/More';
import {Box, ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import PostItem from '@/Component/More/PostItem';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function FAQ() {
  const {size} = useSelector(state => state);
  const [selectPost, setSelectPost] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getFAQ().then(res => res.data.result === 'true' && setPostList(res.data.data.data));
  }, []);
  return (
    <>
      <Header title="자주하는 질문" />
      <FlatList
        data={postList}
        style={{
          width: getPixel(380),
          marginHorizontal: getPixel(16),
        }}
        renderItem={({item, index}) => {
          const changeItem = {
            title: item?.ft_title,
            date: item?.ft_date,
            content: item?.ft_content,
            image: item?.ft_image,
          };
          return (
            <PostItem
              item={changeItem}
              index={index}
              selectPost={selectPost}
              setSelectPost={setSelectPost}
            />
          );
        }}
      />
    </>
  );
}
