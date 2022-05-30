import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {BetweenBox, Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
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
import {getShopListInMaps} from '@/API/Shop/Shop';
import FastImage from 'react-native-fast-image';
import {imageAddress} from '@assets/global/config';

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
    const [shopList, setShopList] = useState([]);
    const [selectShop, setSelectShop] = useState(-1);

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

    const getShopListInMapHandle = async () => {
        const res = await getShopListInMaps({
            _mt_idx: login.mt_idx,
            mst_type: '',
        });
        if (res.data.result === 'true') {
            setShopList(res.data.data.data.store_list);
        }
    };

    useLayoutEffect(() => {
        getLocation();
        getShopListInMapHandle();
    }, []);

    function getDistance(lat1, lon1, lat2, lon2) {
        if (lat1 == lat2 && lon1 == lon2) return 0;

        var radLat1 = (Math.PI * lat1) / 180;
        var radLat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radTheta = (Math.PI * theta) / 180;
        var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1) dist = 1;

        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) dist = Math.round(dist / 10) * 10;
        else dist = Math.round(dist / 100) * 100;

        return dist;
    }
    let zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    console.log(selectShop?.mst_img);
    return (
        <View style={{flex: 1}}>
            {isLoading && (
                <View>
                    <Loading isAbsolute text="위치 정보를 불러오는 중..." />
                </View>
            )}
            <Header title="지도" />
            {selectShop?.mst_name?.length > 0 && (
                <PositionBox top="50px" left="0px" zIndex={100} width="420px">
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
                                <Image
                                    style={{
                                        width: getPixel(74),
                                        height: getPixel(74),
                                    }}
                                    source={selectShop?.mst_img ? {uri: imageAddress + selectShop.mst_img} : DummyIcon}
                                />
                            </Box>
                            <Box width="190px">
                                <BetweenBox width="190px">
                                    <DarkBoldText fontSize={Theme.fontSize.fs16}>{selectShop.mst_name}</DarkBoldText>
                                    {selectShop.mst_type === '1' && (
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
                                    )}
                                </BetweenBox>
                                <RowBox alignItems="center" mg="7.5px 0px">
                                    <Text>
                                        <Image source={LikeIcon} style={{width: getPixel(12), height: getPixel(12)}} resizeMode="contain" />
                                    </Text>
                                    <GrayText mg="0px 8px 0px 0px" fontSize={Theme.fontSize.fs13}>
                                        {selectShop.mst_likes}
                                    </GrayText>
                                    <GrayText fontWeight={Theme.fontWeight.medium} fontSize={Theme.fontSize.fs13}>
                                        리뷰
                                    </GrayText>
                                    <GrayText mg="0px 8px 0px 0px" fontSize={Theme.fontSize.fs13}>
                                        {selectShop.mst_reviews}
                                    </GrayText>
                                    <GrayText fontWeight={Theme.fontWeight.medium} fontSize={Theme.fontSize.fs13}>
                                        정비횟수
                                    </GrayText>
                                    <GrayText fontSize={Theme.fontSize.fs13}>{selectShop.mst_orders}</GrayText>
                                </RowBox>
                                <RowBox alignItems="center">
                                    <DefaultText fontSize={Theme.fontSize.fs13} color={Theme.color.skyBlue}>
                                        {selectShop.mst_tag}
                                    </DefaultText>
                                </RowBox>
                            </Box>
                        </RowBox>
                        <RowBox alignItems="center" mg="15px 0px 0px">
                            <DarkText fontSize={Theme.fontSize.fs15}>4.2KM</DarkText>
                            <GrayText fontSize={Theme.fontSize.fs15} mg="0px 3px">
                                |
                            </GrayText>
                            <DarkText fontSize={Theme.fontSize.fs15}>{selectShop.mst_addr}</DarkText>
                        </RowBox>
                    </Box>
                </PositionBox>
            )}
            <MapView
                style={{flex: 1}}
                initialRegion={region}
                showsUserLocation={true}
                followsUserLocation={true}
                zoomControlEnabled
                maxZoomLevel={15}
                minZoomLevel={12}
                onPanDrag={() => {
                    setSelectShop(null);
                }}
                onPress={() => {
                    setSelectShop(null);
                }}
                onRegionChangeComplete={region => {
                    setRegion(prev => ({...prev, ...region}));
                }}>
                {shopList.map((v, i) => {
                    const dist = getDistance(region.latitude, region.longitude, +v?.mst_lat ?? 0, +v?.mst_lng);

                    if (dist > region.latitudeDelta * 69 * 2 * 1000) {
                        return null;
                    }
                    return (
                        <Marker
                            tracksViewChanges={false}
                            key={i}
                            coordinate={{
                                latitude: +v?.mst_lat ?? 0,
                                longitude: +v?.mst_lng ?? 0,
                            }}
                            onPress={event => {
                                setSelectShop(v);
                                // setRegion(prev => ({
                                //     ...prev,
                                //     latitude: event.nativeEvent.coordinate.latitude,
                                //     longitude: event.nativeEvent.coordinate.longitude,
                                // }));
                            }}></Marker>
                    );
                })}
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
