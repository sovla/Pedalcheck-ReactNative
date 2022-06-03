import {Box, PositionBox} from '@/assets/global/Container';
import React, {useCallback} from 'react';
import {Linking, Share} from 'react-native';
import {useSelector} from 'react-redux';
import ShopDummyImage from '@assets/image/shop_default.png';

import ShopComponent from '@/Component/Repair/ShopComponent';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';

import Swiper from '@/Component/Repair/Swiper';
import DefaultImage from '@/assets/global/Image';

import CallIcon from '@assets/image/btn_call.png';
import DisabledCallIcon from '@assets/image/btn_call_b.png';
import QuestionIcon from '@assets/image/btn_inq.png';
import {MediumText} from '@/assets/global/Text';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AlertButton, RequireLoginAlert} from '@/Util/Alert';
import BackIcon from '@assets/image/ic_detail_back.png';

import {imageAddress} from '@assets/global/config';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToastMessage} from '@/Util/Toast';

// 2022-01-04 10:07:06
// Junhan
// 정비소 헤더

const ShopHeader = ({mt_idx}) => {
    const navigation = useNavigation();
    const {
        shopInfo: {store_info},
        login,
    } = useSelector(state => state);
    const dummyImageArray = store_info?.mst_img
        ? store_info.mst_img.map(item => ({
              uri: imageAddress + item,
          }))
        : [ShopDummyImage];

    const isPartner = store_info?.mst_type === '1';

    const onPressQuestion = () => {
        if (store_info?.mt_idx === login.idx) {
            AlertButton('본인 매장에는 문의를 남길 수 없습니다.');
            return;
        }
        if (RequireLoginAlert(login, navigation, '문의 작성을')) {
            navigation.navigate('RepairQuestion');
        }
    };

    const getLink = useCallback(async () => {
        const link = await dynamicLinks().buildShortLink({
            link: `https://pedalcheck/intent=Shop,mt_idx=${mt_idx}`,
            // domainUriPrefix is created in your Firebase console
            domainUriPrefix: 'https://pedalcheck.page.link',
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
            android: {
                packageName: 'com.pedalchecka',
            },
            ios: {
                bundleId: 'com.dmonster.pedalcheck',
                appStoreId: '1610296299',
            },
            navigation: {
                forcedRedirectEnabled: true,
            },
        });
        Share.share({
            message: `앱 이름 : 페달체크\n\n정비소 이름 : ${store_info.mst_name}\n\n주소 : ${store_info.mst_addr1} ${store_info.mst_addr2}\n\n연락처 : ${store_info.mst_tel}\n\n링크 : ${link}`,
            url: '',
            title: '',
        });
        Clipboard.setString(`앱 이름 : 페달체크

정비소 이름 : ${store_info.mst_name}

주소 : ${store_info.mst_addr1} ${store_info.mst_addr2}

연락처 : ${store_info.mst_tel}

링크 : ${link}`);
        showToastMessage('공유 링크 복사 완료');
    }, [mt_idx]);
    return (
        <>
            <Box flex={1} zIndex={100}>
                <PositionBox zIndex={100} top="5px" left="5px" backgroundColor="#0000">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <DefaultImage source={BackIcon} width="45px" height="45px" />
                    </TouchableOpacity>
                </PositionBox>
                <PositionBox top="12px" right="16px" backgroundColor="#0000" zIndex={100}>
                    <TouchableOpacity
                        onPress={getLink}
                        hitSlop={{
                            bottom: 10,
                            left: 10,
                            right: 10,
                            top: 10,
                        }}>
                        <DefaultImage source={require('@assets/image/share_white.png')} width="24px" height="24px" />
                    </TouchableOpacity>
                </PositionBox>
                <Swiper
                    imageArray={dummyImageArray}
                    width={412}
                    height={250}
                    isRolling
                    resizeMode="cover"
                    isTouch={Array.isArray(dummyImageArray) && dummyImageArray.filter(v => v?.uri)?.length > 0}
                />
                {isPartner ? (
                    <>
                        {store_info?.mst_tel?.length > 0 && (
                            <PositionBox backgroundColor="#0000" bottom="-35px" right="87px" zIndex={100} alignItems="center">
                                <TouchableOpacity onPress={() => Linking.openURL(`tel:${store_info?.mst_tel}`)} style={{flex: 1, alignItems: 'center'}}>
                                    <DefaultImage source={DisabledCallIcon} width="57px" height="57px" />
                                    <MediumText color={Theme.color.gray} fontSize={Theme.fontSize.fs13}>
                                        전화하기
                                    </MediumText>
                                </TouchableOpacity>
                            </PositionBox>
                        )}

                        <PositionBox backgroundColor="#0000" bottom="-35px" right="26px" zIndex={100} alignItems="center">
                            <TouchableOpacity onPress={onPressQuestion} style={{flex: 1, alignItems: 'center'}}>
                                <DefaultImage source={QuestionIcon} width="57px" height="57px" />
                                <MediumText color={Theme.color.skyBlue} fontSize={Theme.fontSize.fs13}>
                                    1:1 문의
                                </MediumText>
                            </TouchableOpacity>
                        </PositionBox>
                    </>
                ) : (
                    <PositionBox backgroundColor="#0000" bottom="-35px" right="26px" zIndex={100} alignItems="center">
                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${store_info?.mst_tel}`)} style={{flex: 1, alignItems: 'center'}}>
                            <DefaultImage source={CallIcon} width="57px" height="57px" />
                            <MediumText color={Theme.color.skyBlue} fontSize={Theme.fontSize.fs13}>
                                전화하기
                            </MediumText>
                        </TouchableOpacity>
                    </PositionBox>
                )}
            </Box>

            <ShopComponent
                shopTitle={store_info?.mst_name}
                likeCount={store_info?.mst_likes || 0}
                reviewCount={store_info?.mst_reviews || 0}
                repairCount={store_info?.mst_orders || 0}
                tagList={store_info?.mst_tag?.split(',')}
                isPress={false}
                isImage={false}
                mg="0px 16px"
                titleFontSize="21px"
                isBorder={false}
            />

            <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        </>
    );
};

export default ShopHeader;
