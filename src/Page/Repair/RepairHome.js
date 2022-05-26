import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkMediumText, DarkText, DefaultText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, FlatList, Modal, Linking, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WhiteSpannerIcon from '@assets/image/menu01_top.png';
import {WhiteInput} from '@assets/global/Input';
import SearchIcon from '@assets/image/ic_search.png';
import GradientHeader from '@/Component/Layout/GradientHeader';
import PlusIcon from '@assets/image/ic_plus.png';
import BorderBottomBox from '@/Component/Repair/BorderBottomBox';
import {BorderButton, DisabledBorderButton} from '@/assets/global/Button';
import ShopComponent from '@/Component/Repair/ShopComponent';
import ArrowLeft from '@assets/image/slide_l.png';
import ArrowRight from '@assets/image/slide_r.png';
import ArrowLeftDisabled from '@assets/image/slide_l_d.png';
import ArrowRightDisable from '@assets/image/slide_r_d.png';
import LocationIcon from '@assets/image/ic_location.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {getPixel} from '@/Util/pixelChange';
import scrollSlideNumber from '@/Util/scrollSlideNumber';
import {useEffect} from 'react';
import {getShopList} from '@/API/Shop/Shop';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import {modalOpenAndProp} from '@/Store/modalState';
import {getEventList} from '@/API/Repair/Repair';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {reduceItemSplit} from '@/Util/reduceItem';
import Loading from '@/Component/Layout/Loading';
import Dummy from '@assets/image/shop_dummy.png';
import {imageAddress} from '@assets/global/config';
import Ad from '@/Component/Modal/Ad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getTagList} from '@/API/More/More';
import {useRef} from 'react';
import useInterval from '@/Hooks/useInterval';
import {AlertButtons} from '@/Util/Alert';
import VersionCheck from '@/Util/VersionCheck';
import {API} from '@/API/Api';

export default function RepairHome() {
    const {
        login,
        banner: {bannerList},
        ad,
    } = useSelector(state => state);
    const dispatch = useDispatch();

    const isFocused = useIsFocused();
    const [selectType, setselectType] = useState('매장명'); //   매장명, 브랜드 검색
    const [selectItem, setSelectItem] = useState('전체보기');
    const [sortSelectItem, setSortSelectItem] = useState('인기순');

    const [apiPage, setApiPage] = useState(1); // API Page
    const [selectImage, setSelectImage] = useState(0);
    const [tag, setTag] = useState([]);
    const [innerLocation, setInnerLocation] = useState(!login?.mt_addr ? '전체' : login.mt_addr);
    const [storeList, setStoreList] = useState([]);
    const [searchText, setSearchText] = useState(''); // 검색 텍스트
    const [isSearch, setIsSearch] = useState(false); // 검색 누를때

    const [isLast, setisLast] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [isDone, setIsDone] = useState(true);
    const [isModal, setIsModal] = useState(false);

    const [tagList, setTagList] = useState([]);

    const [isCheckVersion, setisCheckVersion] = useState(false);
    const onPressTag = tagName => {
        // By.Junhan tag에 값이 없다면 넣어주고 있다면 제거
        if (tag.find(item => item === tagName)) {
            setTag(tag.filter(item => item !== tagName));
        } else {
            setTag(prev => [...prev, tagName]);
        }
    };

    const onScrollSlide = e => {
        setSelectImage(scrollSlideNumber(e, 412 - 36));
    };
    if (!isFocused && isModal) {
        setIsModal(false);
    }

    useEffect(() => {
        if (isFocused && ad.loading === 'success' && ad?.ad && Object.keys(ad?.ad)?.length > 0) {
            const getData = async () => {
                try {
                    const getAd = await AsyncStorage.getItem('ad');
                    const date = parseInt(getAd);

                    const now = Date.now();
                    if (ad?.ad?.at_type === '2' && !login?.idx) {
                        return;
                    }
                    if (!date) {
                        setIsModal(true);
                        return;
                    }
                    const dateDay = Math.floor(date / 1000 / 60 / 60 / 24);
                    const nowDay = Math.floor(now / 1000 / 60 / 60 / 24);
                    if (nowDay - dateDay >= 1) {
                        setIsModal(true);
                    }
                } catch (err) {}
            };

            getData();
        }
    }, []);
    // 현태 최초 실행 시 위치 상태
    useEffect(() => {
        if (isFocused && storeList?.length < 1) {
            getShopListHandle(1);
        }
        if (isFocused) {
            (() => {
                !globalThis.isDev &&
                    !globalThis.isUpdate &&
                    API.post('app_version.php', {
                        app_os: Platform.OS === 'ios' ? 'ios' : 'aos',
                        app_ver: Platform.OS === 'ios' ? globalThis.IOS_VERSION : globalThis.ANDROID_VERSION,
                        _mt_idx: login?.idx,
                    }).finally(() => {
                        globalThis.isUpdate = true;
                    });
            })();
            getTagListHandle();
        }
    }, [isFocused]);

    useUpdateEffect(() => {
        if (isFocused) {
            getShopListHandle(1);
        }
    }, [selectItem, sortSelectItem, tag, innerLocation, isSearch]);
    // 현태 태그 및 메뉴 선택 시 리렌더링

    const getTagListHandle = async () => {
        const response = await getTagList();
        if (response.data?.result === 'true' && response.data?.data?.data && response.data?.data?.data?.length > 0) {
            const data = response.data?.data?.data;
            setTagList(data.map((v, i) => v?.st_title));
        }
    };

    const checkVersion = data => {
        if (
            (Platform.OS === 'ios' && VersionCheck(data?.ios_ver) <= VersionCheck(IOS_VERSION)) ||
            (Platform.OS === 'android' && VersionCheck(data?.aos_ver) <= VersionCheck(ANDROID_VERSION)) ||
            isCheckVersion
        ) {
            return;
        }

        AlertButtons('최신 버전이 있습니다.\n업데이트 하시겠습니까?', '확인', '취소', () => {
            if (Platform.OS === 'ios') {
                Linking.openURL('https://apps.apple.com/us/app/%ED%8E%98%EB%8B%AC%EC%B2%B4%ED%81%AC-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%9E%90%EC%A0%84%EA%B1%B0-%EA%B4%80%EB%A6%AC/id1610296299');
            } else if (Platform.OS === 'android') {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.pedalchecka');
            }
        });
        setisCheckVersion(true);
    };

    const getShopListHandle = async initPage => {
        if (isLast && !initPage) {
            return null;
        }
        let mst_tag = reduceItemSplit(tag, ',');
        //  , 콤마 더해서 값 보내기
        if (initPage) {
            setApiPage(1);
        }
        setIsDone(true);

        await getShopList({
            _mt_idx: login?.idx,
            page: initPage ?? apiPage,
            mst_addr: innerLocation === '전체' ? '전체' : innerLocation.includes('전체') ? innerLocation.split(' 전체')[0] : innerLocation, // 위치로 검색
            search_sel: selectType === '매장명' ? 'mst_name' : 'mst_brand', // 검색하는 경우 추가
            search_txt: searchText,
            mst_tag: mst_tag, //
            mst_type: selectItem === '전체보기' ? '' : '1',
            sorting: sortSelectItem === '정비횟수순' ? '2' : sortSelectItem === '거리순' ? (login?.idx ? '3' : '1') : '1', // 인기순 1 거리순 2 정비횟수순 3
        })
            .then(res => {
                if (res?.data?.result === 'true') {
                    const isData = res.data?.data?.data?.store_list?.length > 0;
                    checkVersion(res.data?.data?.data);

                    if (isData) {
                        if (initPage) {
                            setStoreList([...res?.data?.data?.data?.store_list]);
                        } else {
                            setStoreList(prev => [...prev, ...res?.data?.data?.data?.store_list]);
                        }
                        setisLast(false);
                    } else {
                        if (initPage) {
                            setStoreList([]);
                        }
                        setisLast(true);
                    }
                }
            })
            .finally(() => {
                setApiPage(prev => prev + 1);
                setIsDone(false);
            });
    };

    return (
        <>
            {isDone && <Loading isAbsolute backgroundColor="#0000" />}
            <Container>
                <FlatList
                    ListHeaderComponent={
                        <Header
                            tag={tag}
                            selectItem={selectItem}
                            setSelectItem={setSelectItem}
                            sortSelectItem={sortSelectItem}
                            setSortSelectItem={setSortSelectItem}
                            innerLocation={innerLocation}
                            selectImage={selectImage}
                            setSelectImage={setSelectImage}
                            onScrollSlide={onScrollSlide}
                            onPressTag={onPressTag}
                            searchText={searchText}
                            setSearchText={setSearchText}
                            setIsSearch={setIsSearch}
                            setInnerLocation={setInnerLocation}
                            dispatch={dispatch}
                            setselectType={setselectType}
                            selectType={selectType}
                            bannerList={bannerList}
                            tagList={tagList}
                        />
                    }
                    data={storeList}
                    renderItem={({item}) => {
                        return (
                            <Box width="380px" mg="0px 16px">
                                <ShopComponent
                                    mg="0px"
                                    pd="14px 10px"
                                    item={item}
                                    shopTitle={item?.mst_name}
                                    isPartner={item?.mst_type === '1'}
                                    likeCount={item?.mst_likes ?? 0}
                                    reviewCount={item?.mst_reviews ?? 0}
                                    repairCount={item?.mst_orders ?? 0}
                                    tagList={item?.mst_tag?.split(',')}
                                    image={item?.mst_img ? {uri: imageAddress + item.mst_img} : Dummy}
                                    isImage
                                    location={item?.mst_addr}
                                />
                            </Box>
                        );
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <Box justifyContent="center" alignItems="center" mg="20px 0px">
                                <DarkBoldText>검색 결과가 없습니다.</DarkBoldText>
                            </Box>
                        );
                    }}
                    style={{
                        paddingBottom: 70,
                    }}
                    onEndReached={() => {
                        if (isScroll) {
                            getShopListHandle();
                            setIsScroll(false);
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    onScrollBeginDrag={() => {
                        setIsScroll(true);
                    }}
                />
                <Box height="20px" backgroundColor="#000" />
            </Container>
            <FooterButtons selectMenu={1} />
            {isModal && (
                <Modal visible={isModal} transparent>
                    <Box justifyContent="center" alignItems="center" style={{flex: 1}} backgroundColor="#0006">
                        <Ad info={ad.ad} setIsModal={setIsModal} />
                    </Box>
                </Modal>
            )}
        </>
    );
}
const Header = ({
    tag,
    selectItem,
    setSelectItem,
    sortSelectItem,
    setSortSelectItem,
    innerLocation,
    selectImage,
    setSelectImage,
    onScrollSlide,
    onPressTag,
    dispatch,
    searchText,
    setSearchText,
    setIsSearch,
    setInnerLocation,
    selectType,
    setselectType,
    bannerList,
    tagList,
}) => {
    const ref = useRef(null);
    const navigation = useNavigation();
    const [count, setCount] = useState(1);

    const onPressArrow = type => {
        if (type === 'prev' && selectImage > 0) {
            ref.current.scrollTo({
                x: getPixel(380) * (selectImage - 1),
            });
            setCount(0);
            setSelectImage(prev => prev - 1);
        } else if (type === 'next' && bannerList.length - 1 > selectImage) {
            ref.current.scrollTo({
                x: getPixel(380) * (selectImage + 1),
            });
            setCount(0);
            setSelectImage(prev => prev + 1);
        }
    };

    useInterval(
        () => {
            if (ref?.current && count < bannerList.length) {
                ref.current.scrollTo({
                    x: getPixel(380) * count,
                });
                setCount(prev => prev + 1);
                setSelectImage(prev => prev + 1);
            }
        },
        count !== 0 && count < bannerList?.length ? 3000 : null,
    );

    const onRemoveContactPress = () => {
        setCount(0);
    };

    return (
        <>
            <GradientHeader
                title="정비소"
                imageSource={WhiteSpannerIcon}
                titlePress={() => {
                    navigation.replace('RepairHome');
                }}>
                <RowBox backgroundColor="rgba(0,0,0,0)" mg="20px 0px 0px">
                    <DefaultDropdown data={sortArray2} value={selectType} setValue={setselectType} width={90} pdLeft={10} backgroundColor="#fff" />
                    <Box width="10px" />
                    <WhiteInput height="43px" width={`${380 - 100}px`} placeholder="매장명을 입력해주세요." value={searchText} onChangeText={setSearchText} />
                    <PositionBox top="2.5px" right="0px" backgroundColor="#0000">
                        <TouchableOpacity
                            style={{paddingHorizontal: 10, paddingVertical: 10}}
                            onPress={() => {
                                setIsSearch(prev => !prev);
                            }}>
                            <DefaultImage source={SearchIcon} width="21px" height="21px"></DefaultImage>
                        </TouchableOpacity>
                    </PositionBox>
                </RowBox>
            </GradientHeader>
            <Box
                pd="20px 16px 0px"
                height="auto"
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 5,
                }}>
                <Event />
                <Box height="40px">
                    <ScrollView horizontal style={{marginTop: 10}} keyboardShouldPersistTaps="handled">
                        {tagList.map(item => (
                            <TagButton key={`tag_${item}`} text={item} isSelect={tag.find(findItem => item === findItem)} setSelect={() => onPressTag(item)}></TagButton>
                        ))}
                    </ScrollView>
                </Box>
                <RowBox height="50px" alignItems="center">
                    <Box>
                        <DefaultDropdown data={sortArray} value={selectItem} setValue={setSelectItem} isBorder={false} width={selectItem?.length * 12 + 40} pdLeft={0} fontType="Medium" />
                    </Box>
                    <Box mg="0px 0px 0px 5px">
                        <DefaultDropdown
                            data={sortArray1}
                            labelField="label"
                            valueField="value"
                            width={sortSelectItem?.length * 17 + 30}
                            isBorder={false}
                            setValue={setSortSelectItem}
                            value={sortSelectItem}
                            pdLeft={0}
                            fontType="Medium"
                        />
                    </Box>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(
                                modalOpenAndProp({
                                    modalComponent: 'locationPicker',
                                    setLocation: setInnerLocation,
                                    isHome: true,
                                }),
                            );
                        }}>
                        <RowBox width="160px" height="100%" alignItems="center" mg="0px 0px 0px 5px">
                            <DarkMediumText fontSize={Theme.fontSize.fs15}>{innerLocation}</DarkMediumText>
                            <DefaultImage width="24px" height="24px" source={LocationIcon} />
                        </RowBox>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
                        <DarkText>Maps</DarkText>
                    </TouchableOpacity>
                </RowBox>
            </Box>
            {/* <RecommenderShop totalCount={bannerList?.length} count={selectImage + 1} /> */}
            <Box height="20px" backgroundColor="#0000" />
            {bannerList?.length > 0 && (
                <>
                    <Box pd="0px 16px" backgroundColor="#0000" height={`${getPixel(200)}px`}>
                        <ScrollView
                            ref={ref}
                            onTouchStart={onRemoveContactPress}
                            keyboardShouldPersistTaps="handled"
                            horizontal
                            pagingEnabled
                            style={{borderRadius: 10}}
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={onScrollSlide}>
                            {bannerList.map((item, index) => (
                                <TouchableOpacity
                                    style={{borderRadius: 10}}
                                    key={`image_${index}`}
                                    onPress={async () => {
                                        const result = await Linking.canOpenURL(item?.bt_link);
                                        if (result) Linking.openURL(item?.bt_link);
                                    }}
                                    activeOpacity={0.6}>
                                    <DefaultImage style={{borderRadius: 10, height: getPixel(200)}} resizeMode="stretch" source={{uri: imageAddress + item?.bt_image}} width="380px" />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <SwiperCount count={selectImage} length={bannerList?.length} onPressArrow={onPressArrow} />
                    </Box>
                    <Box height="20px" backgroundColor="#0000" />
                </>
            )}
        </>
    );
};

const Event = () => {
    const [eventList, setEventList] = useState([]);
    const [count, setCount] = useState(1);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const ref = useRef(null);

    useInterval(
        () => {
            if (ref?.current && count < eventList?.length) {
                ref.current.scrollTo({
                    x: getPixel(272) * count,
                });
                setCount(prev => prev + 1);
            } else {
                return;
            }
        },
        count !== 0 && count < eventList?.length ? 3000 : null,
    );

    const onRemoveContactPress = () => {
        setCount(0);
    };

    useEffect(() => {
        if (isFocused && !eventList?.length) {
            getEventList({
                view_mode: 'main',
                board: 'event',
            })
                .then(res => res?.data?.result === 'true' && res?.data?.data?.data)
                .then(data => {
                    if (data?.board?.length > 0) {
                        setEventList(data?.board?.map(v => ({...v, select: '이벤트'})));
                    }
                })
                .then(() => {
                    getEventList({
                        view_mode: 'main',
                        board: 'notice',
                    })
                        .then(res => res?.data?.result === 'true' && res?.data?.data?.data)
                        .then(data => {
                            if (data?.board?.length > 0) {
                                setEventList(prev => [...prev, ...data?.board?.map(v => ({...v, select: '공지'}))]);
                            }
                        });
                });
        }
    }, [isFocused]);
    return (
        <>
            <BorderBottomBox title="EVENT" height="28px" titleColor={Theme.color.skyBlue} borderColor={Theme.color.skyBlue}>
                <ScrollView
                    ref={ref}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    onTouchStart={() => {
                        onRemoveContactPress();
                    }}>
                    {eventList?.length > 0 &&
                        eventList.map((item, index) => (
                            <TouchableOpacity
                                key={index + 'Event'}
                                style={{marginBottom: 5}}
                                onPress={() => {
                                    navigation.navigate('Post', {...item, select: item?.select ?? '이벤트'});
                                }}>
                                <DarkText numberOfLines={1} style={{width: getPixel(272)}}>
                                    {item?.bt_title}
                                </DarkText>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('Post', {select: '이벤트'})}>
                    <DefaultImage source={PlusIcon} width="12px" height="12px" style={{marginRight: getPixel(10)}} />
                </TouchableOpacity>
            </BorderBottomBox>
        </>
    );
};

const TagButton = ({isSelect, text, setSelect}) => {
    return (
        <TouchableOpacity onPress={setSelect}>
            <Box mg="0px 5px 0px 0px">{isSelect ? <BorderButton width="auto">#{text}</BorderButton> : <DisabledBorderButton width="auto">#{text}</DisabledBorderButton>}</Box>
        </TouchableOpacity>
    );
};
export const numberCheck = number => {
    if (number < 10) {
        return '0' + number;
    } else {
        return '' + number;
    }
};
const SwiperCount = ({count, length, onPressArrow}) => {
    return (
        <PositionBox
            right="32px"
            bottom="16px"
            width="128px"
            height="24px"
            borderRadius="50px"
            backgroundColor="rgba(33,33,33,0.6)"
            justifyContent="space-between"
            alignItems="center"
            style={{flexDirection: 'row'}}>
            <TouchableOpacity
                disabled={count === 0}
                onPress={() => {
                    onPressArrow('prev');
                }}>
                <DefaultImage source={count === 0 ? ArrowLeftDisabled : ArrowLeft} width="24px" height="24px" />
            </TouchableOpacity>
            <DefaultText fontSize={Theme.fontSize.fs12}>
                {numberCheck(count + 1)} <GrayText fontSize={Theme.fontSize.fs12}> / {numberCheck(length)}</GrayText>
            </DefaultText>
            <TouchableOpacity
                disabled={length - 1 === count}
                onPress={() => {
                    onPressArrow('next');
                }}>
                <DefaultImage source={length - 1 === count ? ArrowRightDisable : ArrowRight} width="24px" height="24px" />
            </TouchableOpacity>
        </PositionBox>
    );
};

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

const sortArray2 = [
    {
        label: '매장명',
        value: '매장명',
    },
    {
        label: '브랜드',
        value: '브랜드',
    },
];
const sortArray1 = [
    {
        label: '인기순',
        value: '인기순',
    },
    {
        label: '정비횟수순',
        value: '정비횟수순',
    },
    {
        label: '거리순',
        value: '거리순',
    },
];
// const tagList = ['픽업', '출장수리', '피팅전문', '카본수리', '중고거래', '광고'];
