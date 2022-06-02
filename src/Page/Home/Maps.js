import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import MapView from 'react-native-map-clustering';
import {Callout, Marker} from 'react-native-maps';
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
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import useUpdateEffect from '@/Hooks/useUpdateEffect';

const sortArray = [
    {
        label: '전체보기',
        value: '전체보기',
    },
    {
        label: '파트너 매장',
        value: '파트너 매장',
    },
];

const Maps = ({navigation}) => {
    const ref = useRef(null);
    const {login} = useSelector(state => state);
    const [isLoading, setIsLoading] = useState(true);
    const [isApiLoading, setIsApiLoading] = useState(true);
    const [region, setRegion] = useState({
        latitude: login?.mt_lat.length > 0 ? +login.mt_lat : 37.541,
        longitude: login?.mt_lng.length > 0 ? +login.mt_lng : 126.986,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });
    const [initRegion, setInitRegion] = useState({
        latitude: 37.541,
        longitude: 126.986,
    });
    const [shopList, setShopList] = useState([]);
    const [selectShop, setSelectShop] = useState(null);
    const [selectItem, setSelectItem] = useState('전체보기');

    const getLocation = useCallback(async () => {
        setIsLoading(true);
        Geolocation.getCurrentPosition(
            info => {
                setRegion(prev => ({
                    ...prev,
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                }));
                setInitRegion(prev => ({latitude: info.coords.latitude, longitude: info.coords.longitude}));
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
        setIsApiLoading(true);
        const res = await getShopListInMaps({
            _mt_idx: login.mt_idx,
            mst_type: '',
        });

        if (res.data.result === 'true') {
            setShopList(res.data.data.data.store_list);
        }
        setIsApiLoading(false);
    };

    useLayoutEffect(() => {
        getLocation();
        getShopListInMapHandle();
    }, []);

    function getDistance(lat1, lon1, lat2, lon2) {
        if (lat1 == lat2 && lon1 == lon2) return 0;

        const radLat1 = (Math.PI * lat1) / 180;
        const radLat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radTheta = (Math.PI * theta) / 180;
        let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1) dist = 1;

        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) dist = Math.round(dist / 10) * 10;
        else dist = Math.round(dist / 100) * 100;

        return dist;
    }
    return (
        <View style={{flex: 1}}>
            {(isLoading || isApiLoading) && (
                <View>
                    <Loading isAbsolute text={isLoading ? '위치 정보를 불러오는 중...' : '정비소 리스트 불러오는 중...'} />
                </View>
            )}
            <Header title="지도" />
            <PositionBox top="60px" left="16px" zIndex={100} backgroundColor="#fff" pd="3px 10px" borderRadius="10px">
                <DefaultDropdown data={sortArray} value={selectItem} setValue={setSelectItem} isBorder={false} width={selectItem?.length * 12 + 40} pdLeft={0} fontType="Medium" />
            </PositionBox>
            {selectShop?.mst_name?.length > 0 && (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Shop', {
                            mt_idx: selectShop.mt_idx,
                        })
                    }
                    style={styles.absoluteView}>
                    <Box width="306px" pd="14px" borderRadius="16px">
                        <RowBox>
                            <Box style={styles.image}>
                                <Image style={styles.shopImage} source={selectShop?.mst_img ? {uri: imageAddress + selectShop.mst_img} : DummyIcon} />
                            </Box>
                            <Box width="190px">
                                <BetweenBox width="190px">
                                    <DarkBoldText numberOfLines={1} fontSize={Theme.fontSize.fs16}>
                                        {selectShop.mst_name}
                                    </DarkBoldText>
                                    {selectShop.mst_type === '1' && (
                                        <RowBox fontSize={Theme.fontSize.fs12} alignItems="center">
                                            <Image source={ParterIcon} style={{width: getPixel(12), height: getPixel(12)}} resizeMode="contain" />
                                        </RowBox>
                                    )}
                                </BetweenBox>
                                <RowBox alignItems="center" mg="7.5px 0px">
                                    <Image source={LikeIcon} style={{width: getPixel(12), height: getPixel(12)}} resizeMode="contain" />
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
                                    <DefaultText numberOfLines={2} fontSize={Theme.fontSize.fs13} color={Theme.color.skyBlue}>
                                        {selectShop.mst_tag}
                                    </DefaultText>
                                </RowBox>
                            </Box>
                        </RowBox>
                        <RowBox alignItems="center" mg="15px 0px 0px">
                            <DarkText fontSize={Theme.fontSize.fs15}>
                                {(getDistance(initRegion.latitude, initRegion.longitude, selectShop.mst_lat, selectShop.mst_lng) / 1000).toLocaleString('kr') + 'km'}
                            </DarkText>
                            <GrayText fontSize={Theme.fontSize.fs15} mg="0px 3px">
                                |
                            </GrayText>
                            <DarkText fontSize={Theme.fontSize.fs15}>{selectShop.mst_addr}</DarkText>
                        </RowBox>
                    </Box>
                </TouchableOpacity>
            )}
            <MapView
                clusterColor={Theme.color.skyBlue}
                style={{flex: 1}}
                initialRegion={region}
                showsUserLocation={true}
                followsUserLocation={true}
                zoomControlEnabled
                onPanDrag={() => {
                    setSelectShop(null);
                }}
                onPress={() => {
                    setSelectShop(null);
                }}
                onClusterPress={() => {
                    setSelectShop(null);
                }}
                onRegionChangeComplete={region => {
                    setRegion(prev => ({...prev, ...region}));
                }}>
                {shopList.map((v, i) => {
                    if (v.mst_type === '2' && selectItem !== '전체보기') {
                        return null;
                    }
                    return (
                        <Marker
                            identifier={v.mst_idx}
                            tracksViewChanges={false}
                            key={v.mst_idx}
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
    shopImage: {
        width: getPixel(74),
        height: getPixel(74),
    },
    image: {
        width: getPixel(74),
        height: getPixel(74),
        marginRight: getPixel(14.4),
        borderRadius: 7,
        overflow: 'hidden',
    },
    absoluteView: {
        backgroundColor: '#0000',
        zIndex: 100,
        top: getHeightPixel(200),
        left: getPixel(57),
        position: 'absolute',
    },
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
