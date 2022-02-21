import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import LocationIcon from '@assets/image/ic_location2.png';
import TimeIcon from '@assets/image/ic_time.png';
import BikeIcon from '@assets/image/ic_brand.png';
import {DarkBoldText, DarkMediumText, DarkText} from '@/assets/global/Text';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import Dummy from '@assets/image/map.png';
import {Dimensions, TouchableOpacity} from 'react-native';
import {borderBottomWhiteGray} from '../BikeManagement/ShopRepairHistory';
import MapView, {Marker} from 'react-native-maps';
import {getPixel} from '@/Util/pixelChange';
import {useState} from 'react';

export default function ShopIntroduction() {
  const {
    size,
    shopInfo: {store_info},
  } = useSelector(state => state);

  const [isBrand, setIsBrand] = useState(true);
  const [isMoreBrand, setIsMoreBrand] = useState(true);
  const openTime = () => {
    if (store_info?.mst_worktime !== '' && store_info?.mst_worktime) {
      // 메모였던것을
      //  평일 오전 00시 ~ 오후 00시
      //  주말 오전 00시 ~ 오후 00시
      //  휴무 0,1,2 -> 일,월,화
      let result = store_info?.mst_worktime;
      if (result && !store_info?.mst_worktime?.includes('\n주말') && store_info?.mst_worktime?.includes('주말')) {
        //  주말이 \n 개행 없이 들어오는 경우 개행추가
        result = result.replace('주말', '\n주말');
      }
      if (store_info?.mst_holiday !== '') {
        //  휴무일 변환 fn
        result += '\n' + changeHolyday(store_info.mst_holiday);
        return result;
      }

      return result;
    } else {
      return '';
    }
  };

  const shopInformation = [
    {
      image: LocationIcon,
      title: '매장주소',
      content: store_info?.mst_addr1,
    },
    {
      image: TimeIcon,
      title: '영업시간',
      content: openTime(),
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
              <>
                {item.title === '취급 브랜드' && (
                  <TouchableOpacity
                    style={{
                      width: getPixel(252),
                      flexDirection: 'row',
                    }}
                    disabled={isMoreBrand}
                    onPress={() => {
                      setIsBrand(prev => !prev);
                    }}>
                    <DarkText
                      onTextLayout={({nativeEvent: {lines}}) => {
                        if (lines.length > 3) {
                          setIsMoreBrand(false);
                        }
                      }}
                      fontSize={Theme.fontSize.fs15}
                      numberOfLines={isBrand ? 3 : 1000}>
                      {item.content}
                    </DarkText>
                  </TouchableOpacity>
                )}
                {item.title === '영업시간' && (
                  <Box width="252px">
                    {item?.content?.includes('평일') &&
                    item?.content?.includes('주말') &&
                    item?.content?.includes('\n') &&
                    item?.content?.includes('시') ? (
                      item.content.split('\n').map((mapItem, index) => (
                        <RowBox width="252px" key={index} mg={index !== 2 ? '0px 0px 3px' : '0px'}>
                          <DarkMediumText fontSize={Theme.fontSize.fs15}>{mapItem.substring(0, 2)}</DarkMediumText>
                          <DarkText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs15}>
                            {mapItem.substring(2)}
                          </DarkText>
                        </RowBox>
                      ))
                    ) : (
                      <DarkText fontSize={Theme.fontSize.fs15}>{item.content}</DarkText>
                    )}
                  </Box>
                )}
                {item.title === '매장주소' && (
                  <RowBox width="252px">
                    <DarkText fontSize={Theme.fontSize.fs15}>{item.content}</DarkText>
                  </RowBox>
                )}
              </>
            </RowBox>
          );
        })}
      </Box>

      {store_info?.mst_intro?.length > 0 && (
        <>
          <Box mg="20px 0px 10px">
            <DarkBoldText>매장 상세</DarkBoldText>
          </Box>
          <Box width={size.minusPadding}>
            <DarkText lineHeight="22px" width={size.minusPadding}>
              {store_info?.mst_intro}
            </DarkText>
          </Box>
        </>
      )}

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

const changeHolyday = string => {
  if (string !== '' && string) {
    let result = '휴무 ';
    string.split('').forEach((v, i) => {
      if (v === '1') {
        result += '월';
      }
      if (v === '2') {
        result += '화';
      }
      if (v === '3') {
        result += '수';
      }
      if (v === '4') {
        result += '목';
      }
      if (v === '5') {
        result += '금';
      }
      if (v === '6') {
        result += '토';
      }
      if (v === '0') {
        result += '일';
      }
      if (v === ',') {
        result += ', ';
      }
    });

    return result;
  } else {
    return '';
  }
};
