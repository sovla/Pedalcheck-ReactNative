import {BetweenBox, Box, Container, PositionBox} from '@/assets/global/Container';
import React from 'react';

import HomeFooter from '@/Component/Home/HomeFooter';
import KakaoImage from '@/Component/Home/Icon/KakaoImage';
import GoogleImage from '@/Component/Home/Icon/GoogleImage';
import NaverImage from '@/Component/Home/Icon/NaverImage';
import AppleImage from '@/Component/Home/Icon/AppleImage';
import {Platform, StyleSheet, Text} from 'react-native';
import {DefaultText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {getStoreInfo} from '@/API/More/More';
import {setStoreInfo} from '@/Store/storeInfoState';
import {getPixel} from '@/Util/pixelChange';
export default function Home() {
    const betweenBoxWidth = Platform.OS === 'android' ? '262px' : '312px';
    // 안드로이드 카카오 구글 네이버    3가지
    // IOS 카카오 구글 네이버 애플로그인 4가지 로 크기가 다릅니다.
    const {
        login,
        admin: {isAdmin},
    } = useSelector(state => state);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    useEffect(() => {
        if (login?.idx && login?.mt_status && login?.mt_status !== 'N' && isFocused) {
            if (!isAdmin) {
                navigation.replace('RepairHome');
            } else {
                getStoreInfo({
                    _mt_idx: login.idx,
                }).then(res => {
                    if (res?.data?.result === 'true') dispatch(setStoreInfo(res?.data?.data?.data));
                });

                navigation.reset({routes: [{name: 'RepairHome'}, {name: 'More'}, {name: 'RepairHistoryHome'}]});
            }
        }
    }, [isFocused, login]);
    return (
        <Container alignItems="center" justifyContent="center">
            <PositionBox top="250px" left="0px" width="412px" alignItems="center">
                <Text style={styles.mainText}>페달체크</Text>
                <DefaultText color="#00B7FF" fontSize={Theme.fontSize.fs24}>
                    쉽고 편한 자전거 관리
                </DefaultText>
            </PositionBox>
            <PositionBox bottom="0px" left="0px" width="412px">
                <Box alignItems="center" width="412px">
                    <Box pd="16px">
                        <GrayText fontSize={Theme.fontSize.fs15}>SNS 계정으로 회원가입/로그인</GrayText>
                    </Box>
                    <BetweenBox width={betweenBoxWidth} pd="0px 0px 10px" mg="0px 0px 40px">
                        <KakaoImage />
                        <GoogleImage />
                        <NaverImage />
                        <AppleImage />
                    </BetweenBox>
                </Box>
                <HomeFooter navigation={navigation} isShowLogin={false} />
            </PositionBox>
        </Container>
    );
}

const styles = StyleSheet.create({
    mainText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: getPixel(60),
        color: '#00B7FF',
        letterSpacing: -5,
    },
});
