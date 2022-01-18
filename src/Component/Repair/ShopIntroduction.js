import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import LocationIcon from '@assets/image/ic_location2.png';
import TimeIcon from '@assets/image/ic_time.png';
import BikeIcon from '@assets/image/ic_brand.png';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import Dummy from '@assets/image/map.png';
import {Dimensions} from 'react-native';
import {borderBottomWhiteGray} from '../BikeManagement/ShopRepairHistory';
import MapView, {Marker} from 'react-native-maps';
import {getPixel} from '@/Util/pixelChange';

export default function ShopIntroduction() {
  const {
    size,
    shopInfo: {store_info},
  } = useSelector(state => state);

  const shopInformation = [
    {
      image: LocationIcon,
      title: '매장주소',
      content: store_info?.mst_addr1,
    },
    {
      image: TimeIcon,
      title: '영업시간',
      content: store_info?.mst_worktime,
    },
    {
      image: BikeIcon,
      title: '취급 브랜드',
      content: store_info?.mst_brand || '',
    },
  ];

  const storeRegion = {
    latitude: store_info?.mst_lat ?? '35.244125',
    longitude: store_info?.mst_lng ?? '129.088150',
  };

  return (
    <Box pd="20px 16px">
      <Box style={borderBottomWhiteGray} width="380px">
        {shopInformation.map((item, index) => {
          if (item.content === '') {
            return;
          }
          return (
            <RowBox key={index + 'Shop'} mg="0px 0px 15px 0px">
              <RowBox width="127px" alignItems="center">
                <DefaultImage source={item.image} width="15px" height="15px" />
                <DarkBoldText fontSize={Theme.fontSize.fs15} mg="0px 0px 0px 8px">
                  {item.title}
                </DarkBoldText>
              </RowBox>
              <DarkText fontSize={Theme.fontSize.fs15}>{item.content}</DarkText>
            </RowBox>
          );
        })}
      </Box>

      <Box mg="20px 0px 10px">
        <DarkBoldText>매장 상세</DarkBoldText>
      </Box>
      <Box width={size.minusPadding}>
        <DarkText lineHeight="22px" width={size.minusPadding}>
          {store_info.mst_intro}
        </DarkText>
      </Box>
      <Box mg="20px 0px 10px">
        <DarkBoldText>매장 위치</DarkBoldText>
      </Box>
      <Box borderRadius="10px" style={{overflow: 'hidden'}}>
        <MapView
          initialRegion={{
            latitude: parseFloat(storeRegion.latitude),
            longitude: parseFloat(storeRegion.longitude),
            latitudeDelta: 0.0031,
            longitudeDelta: 0.0031,
          }}
          region={{
            latitude: parseFloat(storeRegion.latitude),
            longitude: parseFloat(storeRegion.longitude),
            latitudeDelta: 0.0031,
            longitudeDelta: 0.0031,
          }}
          style={{width: getPixel(380), height: 200, borderRadius: 10}}>
          <Marker
            coordinate={{
              latitude: parseFloat(storeRegion.latitude),
              longitude: parseFloat(storeRegion.longitude),
            }}
          />
        </MapView>
      </Box>
      {/* <DefaultImage source={Dummy} width={size.minusPadding} height="200px"></DefaultImage> */}
    </Box>
  );
}
