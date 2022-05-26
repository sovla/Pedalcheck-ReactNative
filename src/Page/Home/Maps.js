import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {Box, Container, RowBox} from '@/assets/global/Container';
import {DarkText, GrayText} from '@/assets/global/Text';
import Geolocation from '@react-native-community/geolocation';
import {AlertButton} from '@/Util/Alert';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {useSelector} from 'react-redux';
import Header from '@/Component/Layout/Header';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import WhiteBoxDownIcon from '@/assets/image/white_box_down.png';
import AutoHeightImage from 'react-native-auto-height-image';
import ShopComponent from '@/Component/Repair/ShopComponent';
import DefaultImage from '@/assets/global/Image';
import DummyIcon from '@assets/image/shop_dummy.png';
import Loading from '@/Component/Layout/Loading';

const Maps = () => {
  const {login} = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: login?.mt_lat.length > 0 ? +login.mt_lat : 37.541,
    longitude: login?.mt_lng.length > 0 ? +login.mt_lng : 126.986,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const getLocation = useCallback(async () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      info => {
        setRegion(prev => ({
          ...prev,
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }));
        setIsLoading(false);
      },
      error => {
        if (error) {
          AlertButton('위치 권한을 허용해 주세요.');
          setIsLoading(false);
        }
      },
    );
  }, []);

  useLayoutEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <View>
          <Loading isAbsolute text="위치 정보를 불러오는 중..." />
        </View>
      )}
      <Header title="지도" />
      <MapView style={{flex: 1}} region={region} showsUserLocation={true} followsUserLocation={true} zoomControlEnabled>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          calloutOffset={{y: -50, x: 0}}>
          <Callout tooltip={true}>
            <View
              style={{
                width: getPixel(360),
                height: getHeightPixel(200),
              }}>
              <View
                style={{
                  ...styles.callOutView,
                }}>
                <View style={{}}>
                  <View
                    style={{
                      width: getPixel(74),
                      height: getPixel(74),
                      flexDirection: 'row',

                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: 7,
                        overflow: 'hidden',
                      }}>
                      <Text>
                        <Image
                          source={DummyIcon}
                          style={{
                            width: getPixel(74),
                            height: getPixel(74),
                          }}
                        />
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <DarkText>4.2km</DarkText>
                    <GrayText> | </GrayText>
                    <DarkText>인천광역시 남구 문학동 380-9</DarkText>
                  </View>
                </View>
                <View style={styles.tooltipView}>
                  <Text>
                    <Image
                      style={{
                        zIndex: 200,
                        width: getPixel(20),
                        height: getPixel(40),
                      }}
                      resizeMode="contain"
                      source={WhiteBoxDownIcon}
                    />
                  </Text>
                </View>
              </View>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  tooltipView: {
    position: 'absolute',
    bottom: -getHeightPixel(10),
    left: getPixel(360 / 2 - 10),
    zIndex: 150,
  },

  row: {
    flexDirection: 'row',
  },
  callOutView: {
    width: getPixel(360),
    minHeight: getHeightPixel(170),
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: getHeightPixel(14),
    paddingHorizontal: getPixel(14),
  },
});
