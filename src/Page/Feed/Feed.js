import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import React, {useEffect, useState} from 'react';
import MenuIcon from '@assets/image/menu03_top.png';
import {useSelector} from 'react-redux';
import DummyImage from '@assets/image/bicycle_default.png';
import DefaultImage from '@assets/global/Image';
import {DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {FlatList, Linking, Modal, SafeAreaView, TouchableOpacity} from 'react-native';
import {getFeedList} from '@/API/Feed/Feed';
import {imageAddress} from '@assets/global/config';
import WebView from 'react-native-webview';
import CloseWhiteIcon from '@assets/image/close_white.png';
import {useRef} from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import {getPixel} from '@/Util/pixelChange';

export default function Feed() {
  const [feedList, setFeedList] = useState([]);
  const [page, setPage] = useState(1);

  const [isLast, setIsLast] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const [webUri, setWebUri] = useState('');

  const ref = useRef();
  const [navState, setNavState] = useState();

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
    <>
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
          onScrollBeginDrag={() => {
            setIsScroll(true);
          }}
          renderItem={({item, index}) => {
            return (
              <FeedBox
                item={item}
                onPressImage={uri => {
                  setWebUri(uri);
                }}
              />
            );
          }}
          style={{flex: 1}}
          ListFooterComponent={<Box height="30px" backgroundColor="#0000" />}
        />

        <Box backgroundColor={Theme.color.backgroundWhiteGray}>
          <FooterButtons selectMenu={3} backgroundColor={Theme.color.backgroundWhiteGray} />
        </Box>
        {webUri !== '' && (
          <Modal visible>
            <SafeAreaView style={{flex: 0}} />
            <SafeAreaView style={{flex: 1}}>
              <PositionBox
                backgroundColor="#0006"
                top="30px"
                right="30px"
                alignItems="center"
                justifyContent="center"
                width="40px"
                height="40px"
                zIndex={100}>
                <TouchableOpacity
                  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    setWebUri('');
                  }}>
                  <DefaultImage source={CloseWhiteIcon} width="20px" height="20px" />
                </TouchableOpacity>
              </PositionBox>

              <WebView ref={ref} onNavigationStateChange={setNavState} style={{flex: 1}} source={{uri: webUri}} />
            </SafeAreaView>
            <SafeAreaView style={{flex: 0}} />
          </Modal>
        )}
      </Container>
    </>
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

const FeedBox = ({item, onPressImage}) => {
  //item?.ft_link
  const thumbImage = item?.ft_thumb ? {uri: imageAddress + item.ft_thumb} : DummyImage;
  const image = item?.ft_store_img ? {uri: imageAddress + item.ft_store_img} : DummyImage;
  return (
    <Box
      width="380px"
      mg="20px 0px 0px 16px"
      pd="0px 0px 20px"
      alignItems="center"
      style={{
        borderRadius: getPixel(15),
      }}>
      {item?.ft_thumb && (
        <TouchableOpacity
          onPress={async () => {
            const result = await Linking.canOpenURL(item?.ft_link);
            if (result) {
              onPressImage(item?.ft_link);
            }
          }}>
          <AutoHeightImage
            style={{
              borderTopLeftRadius: getPixel(15),
              borderTopRightRadius: getPixel(15),
            }}
            source={thumbImage}
            width={getPixel(380)}
          />
        </TouchableOpacity>
      )}

      <RowBox mg="15px 15px 0px 8px" justifyContent="space-between">
        <Box width="75px" alignItems="center">
          <DefaultImage source={image} width="45px" height="45px" borderRadius="100px" />
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
            <GrayText fontSize={Theme.fontSize.fs13}>{item?.ft_wdate.substring(0, 10)}</GrayText>
          </RowBox>
        </Box>
      </RowBox>
    </Box>
  );
};
