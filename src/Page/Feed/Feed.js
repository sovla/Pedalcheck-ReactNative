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
import {FlatList} from 'react-native';
import {getFeedList} from '@/API/Feed/Feed';

export default function Feed() {
  const {size} = useSelector(state => state);
  const [feedList, setFeedList] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getFeedListHandle();
  }, []);

  const getFeedListHandle = () => {
    getFeedList({
      page: page,
    }).then(res => setFeedList(res?.data?.data?.data));
  };

  console.log('feedList ::::', feedList);

  return (
    <Container>
      {/* <ScrollBox
        backgroundColor={Theme.color.backgroundWhiteGray}
        style={{
          height: size.screenHeight - 64,
          width: '100%',
        }}>
        <GradientHeader title="피드" imageSource={MenuIcon} />
        <Box mg="0px 16px 20px" backgroundColor="#0000">
          {FeedList.map((item, index) => (
            <FeedBox key={item.shopName + index} item={item} size={size} />
          ))}
        </Box>
      </ScrollBox> */}

      <FlatList
        ListHeaderComponent={<GradientHeader title="피드" imageSource={MenuIcon} />}
        data={feedList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return <FeedBox item={item} size={size} />;
        }}
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
  return (
    <Box
      width={size.minusPadding}
      mg="20px 0px 0px"
      pd="0px 0px 20px"
      alignItems="center"
      style={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
      {item.ft_store_img && (
        <DefaultImage source={item.bikeImage} width={size.minusPadding} height="200px" />
      )}
      <RowBox mg="15px 15px 0px" justifyContent="space-between">
        <Box width="75px" alignItems="center">
          <DefaultImage source={item.userImage} width="45px" height="45px" borderRadius="100px" />
        </Box>
        <Box>
          <DarkText fontSize={Theme.fontSize.fs15} width="290px" numberOfLines={2}>
            {item.ft_title}
          </DarkText>
          <RowBox
            mg="5px 0px 0px"
            pd="0px 10px 0px 0px"
            width="290px"
            justifyContent="space-between"
            alignItems="center">
            <IndigoText fontSize={Theme.fontSize.fs14} fontWeight={Theme.fontWeight.bold}>
              {item.ft_store_name}
            </IndigoText>
            <GrayText fontSize={Theme.fontSize.fs13}>{item.ft_wdate}</GrayText>
          </RowBox>
        </Box>
      </RowBox>
    </Box>
  );
};
