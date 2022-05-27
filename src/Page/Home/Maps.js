import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {BetweenBox, Box, Container, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkMediumText, DarkText, DefaultText, GrayText, IndigoText} from '@/assets/global/Text';
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
import ParterIcon from '@assets/image/ic_partner.png';
import LikeIcon from '@assets/image/ic_good.png';
import Svg, {Image as ImageSvg} from 'react-native-svg';

const Maps = () => {
    const ref = useRef(null);
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

    useEffect(() => {
        if (ref.current) {
            ref.current.showCallout();
        }
    }, [ref]);

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
                    ref={ref}
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    calloutOffset={{y: -50, x: 0}}>
                    <Callout tooltip={true}>
                        <Box width="306px" height="150px" pd="14px" borderRadius="16px">
                            <RowBox>
                                <Box
                                    style={{
                                        width: getPixel(74),
                                        height: getPixel(74),
                                        marginRight: getPixel(14.4),
                                        borderRadius: 7,
                                        overflow: 'hidden',
                                    }}>
                                    <Svg width={getPixel(74)} height={getPixel(74)}>
                                        <ImageSvg width={'100%'} height="100%" href={DummyIcon} css={{repeat: 'none-repeat'}} />
                                    </Svg>
                                </Box>
                                <Box width="190px">
                                    <BetweenBox width="190px">
                                        <DarkBoldText fontSize={Theme.fontSize.fs16}>인천신스</DarkBoldText>
                                        <RowBox fontSize={Theme.fontSize.fs12} alignItems="center">
                                            <Text
                                                style={{
                                                    width: getPixel(12),
                                                    height: getPixel(12),
                                                }}>
                                                <Image source={ParterIcon} style={{width: getPixel(12), height: getPixel(12)}} resizeMode="contain" />
                                            </Text>
                                            <IndigoText>파트너매장</IndigoText>
                                        </RowBox>
                                    </BetweenBox>
                                    <RowBox alignItems="center" mg="7.5px 0px">
                                        <Text>
                                            <Image source={LikeIcon} style={{width: getPixel(12), height: getPixel(12)}} resizeMode="contain" />
                                        </Text>
                                        <GrayText mg="0px 8px 0px 0px" fontSize={Theme.fontSize.fs13}>
                                            1,995
                                        </GrayText>
                                        <GrayText fontWeight={Theme.fontWeight.medium} fontSize={Theme.fontSize.fs13}>
                                            리뷰
                                        </GrayText>
                                        <GrayText mg="0px 8px 0px 0px" fontSize={Theme.fontSize.fs13}>
                                            1,995
                                        </GrayText>
                                        <GrayText fontWeight={Theme.fontWeight.medium} fontSize={Theme.fontSize.fs13}>
                                            정비횟수
                                        </GrayText>
                                        <GrayText fontSize={Theme.fontSize.fs13}>12,995</GrayText>
                                    </RowBox>
                                    <RowBox alignItems="center">
                                        <DefaultText fontSize={Theme.fontSize.fs13} color={Theme.color.skyBlue}>
                                            #픽업 #픽업 #픽업 #픽업 #픽업
                                        </DefaultText>
                                    </RowBox>
                                </Box>
                            </RowBox>
                            <RowBox alignItems="center" mg="15px 0px 0px">
                                <DarkText fontSize={Theme.fontSize.fs15}>4.2KM</DarkText>
                                <GrayText fontSize={Theme.fontSize.fs15} mg="0px 3px">
                                    |
                                </GrayText>
                                <DarkText fontSize={Theme.fontSize.fs15}>인천광역시 남구 문학동 380-9</DarkText>
                            </RowBox>
                        </Box>
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
