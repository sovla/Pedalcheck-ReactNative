import {Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import React, {useEffect, useState} from 'react';
import MenuIcon from '@assets/image/menu03_top.png';
import {useSelector} from 'react-redux';
import DefaultIcon from '@assets/image/default_4.png';
import DummyImage from '@assets/image/bicycle_default.png';
import DefaultImage from '@assets/global/Image';
import {DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {FlatList, Linking, TouchableOpacity} from 'react-native';
import {getFeedList} from '@/API/Feed/Feed';

// 웹뷰 작업 후 추가작업 필요

export default function Feed() {
  const {size} = useSelector(state => state);
  const [feedList, setFeedList] = useState([]);
  const [page, setPage] = useState(1);

  const [isLast, setIsLast] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    getFeedListHandle();
  }, []);

  const getFeedListHandle = () => {
    if (isLast) return;
    getFeedList({
      page: page,
    }).then(res => {
      if (res?.data?.result === 'true' && res?.data?.data?.data) {
        setFeedList(prev => [...prev, ...res?.data?.data?.data]);
        setPage(prev => prev + 1);
      } else {
        setIsLast(true);
      }
    });
  };
  return (
    <Container backgroundColor="#F2F4F8">
      <FlatList
        ListHeaderComponent={<GradientHeader title="피드" imageSource={MenuIcon} />}
        data={feedList}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          if (isScroll) {
            getFeedListHandle();
            setIsScroll(false);
          }
        }}
        onMomentumScrollBegin={() => {
          setIsScroll(true);
        }}
        renderItem={({item, index}) => {
          return <FeedBox item={item} size={size} />;
        }}
        ListFooterComponent={<Box height="30px" backgroundColor="#0000" />}
      />
      <Box backgroundColor={Theme.color.backgroundWhiteGray}>
        <FooterButtons selectMenu={3} backgroundColor={Theme.color.backgroundWhiteGray} />
      </Box>
    </Container>
  );
}
export const ShadowStyle = {
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 5,
};

const FeedBox = ({item, size}) => {
  const image = item?.bikeImagel ? {uri: item.bikeImage} : DummyImage;
  return (
    <Box
      width={size.minusPadding}
      mg="20px 0px 0px 16px"
      pd="0px 0px 20px"
      alignItems="center"
      style={{
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}>
      {item?.ft_store_img && (
        <TouchableOpacity
          style={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}
          onPress={() => Linking.openURL(item?.ft_link)}>
          <DefaultImage
            style={{
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            source={image}
            height="200px"
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => Linking.openURL(item?.ft_link)}>
        <DefaultImage source={image} width={size.minusPadding} height="200px" />
      </TouchableOpacity>
      <RowBox mg="15px 15px 0px" justifyContent="space-between">
        <Box width="75px" alignItems="center">
          <DefaultImage source={item?.userImage} width="45px" height="45px" borderRadius="100px" />
        </Box>
        <Box>
          <DarkText fontSize={Theme.fontSize.fs15} width="290px" numberOfLines={2}>
            {item?.ft_title}
          </DarkText>
          <RowBox
            mg="5px 0px 0px"
            pd="0px 10px 0px 0px"
            width="290px"
            justifyContent="space-between"
            alignItems="center">
            <IndigoText fontSize={Theme.fontSize.fs14} fontWeight={Theme.fontWeight.bold}>
              {item?.ft_store_name}
            </IndigoText>
            <GrayText fontSize={Theme.fontSize.fs13}>{item?.ft_wdate}</GrayText>
          </RowBox>
        </Box>
      </RowBox>
    </Box>
  );
};
