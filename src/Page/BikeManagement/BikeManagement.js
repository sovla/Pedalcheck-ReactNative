import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';

import UseBike from '@/Component/BikeManagement/UseBike';
import StorageBike from '@/Component/BikeManagement/StorageBike';
import {getBikeList} from '@/API/Bike/Bike';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import BikeRegisterFirst from './BikeRegisterFirst';
import Loading from '@/Component/Layout/Loading';
import Theme from '@/assets/global/Theme';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {DarkBoldText, DefaultText, GrayText} from '@/assets/global/Text';
import {FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {getParent} from 'domutils';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import AddButtonIcon from '@assets/image/add_button.png';
import DefaultImage from '@/assets/global/Image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function BikeManagement({navigation}) {
    const {login} = useSelector(state => state);
    const [select, setSelect] = useState('사용중인 자전거');
    const [page, setPage] = useState(1);
    const [useBikeList, setUseBikeList] = useState([]);
    const [storageBikeList, setStorageBike] = useState([]);
    const isFocused = useIsFocused();
    const [isDone, setIsDone] = useState(true);

    useEffect(() => {
        setPage(1);
        if (isFocused) {
            getBikeListHandle();
        }
    }, [isFocused]);

    const getBikeListHandle = async () => {
        await getBikeList({
            _mt_idx: login?.idx,
            mbt_flag: 'Y',
            page: 1,
        }).then(res => {
            if (res.data?.data?.data?.length) {
                setUseBikeList(res?.data?.data?.data);
            } else {
                setUseBikeList([]);
            }
        });
        await getBikeList({
            _mt_idx: login?.idx,
            mbt_flag: 'N',
            page: page,
        }).then(res => {
            if (res?.data?.data?.data?.length) {
                if (page === 1) {
                    setStorageBike([...res?.data?.data?.data]);
                } else {
                    setStorageBike(prev => [...prev, ...res?.data?.data?.data]);
                }
                setPage(prev => prev + 1);
            } else {
                if (page === 1) {
                    setStorageBike([]);
                } else {
                    return null;
                }
            }
        });

        setIsDone(false);
    };
    const onPressBike = idx => {
        navigation.navigate('BikeDetail', {mbt_idx: idx});
    };

    const onPressItem = type => {
        // type / "bike" 이외에는 동일한 타입
        if (type === 'bike') {
            if (useBikeList?.length >= 5) {
                AlertButton('사용중인 자전거는 5대 이상 등록할 수 없습니다.');
                return;
            }
            navigation.navigate('BikeRegister');
        }
    };
    // if (isDone) {
    //   return <Loading />;
    // }

    return (
        <>
            {isDone ? (
                <Loading />
            ) : (
                <>
                    {useBikeList?.length || storageBikeList?.length ? (
                        <>
                            <Header title="내 장비 관리" />

                            {/* <MenuNav menuItem={menuItem} setSelect={setSelect} select={select} /> */}
                            {/* {select === '사용중인 자전거' && <UseBike items={useBikeList} />}
                            {select === '보관 자전거' && <StorageBike getBikeListHandle={getBikeListHandle} item={storageBikeList} />} */}
                            <Container>
                                <KeyboardAwareScrollView>
                                    <RowBox pd="20px 16px" justifyContent="space-between" width={412}>
                                        <DarkBoldText>사용중인 자전거</DarkBoldText>
                                        <DarkBoldText>{useBikeList?.length ? useBikeList?.length : 0} 대</DarkBoldText>
                                    </RowBox>
                                    {Array.isArray(useBikeList) && (
                                        <RowBox flexWrap="wrap">
                                            {[0, ...useBikeList].map((v, i) => {
                                                return (
                                                    <Equipment
                                                        onPressBike={() => onPressBike(v.mbt_idx)}
                                                        onPress={() => onPressItem('bike')}
                                                        isImage={i !== 0}
                                                        item={i === 0 ? '자전거' : v.mbt_nick}
                                                        index={i}
                                                    />
                                                );
                                            })}
                                        </RowBox>
                                    )}
                                    <RowBox pd="20px 16px" justifyContent="space-between" width={412}>
                                        <DarkBoldText>보관 자전거</DarkBoldText>
                                        <DarkBoldText>{storageBikeList === null ? 0 : storageBikeList?.length} 대</DarkBoldText>
                                    </RowBox>
                                    {Array.isArray(storageBikeList) && (
                                        <RowBox flexWrap="wrap">
                                            {storageBikeList.map((v, i) => {
                                                return <Equipment onPressBike={() => onPressBike(v.mbt_idx)} isImage item={v.mbt_nick} index={i} />;
                                            })}
                                        </RowBox>
                                    )}
                                    <RowBox pd="20px 16px" justifyContent="space-between" width={412}>
                                        <DarkBoldText>내 장비</DarkBoldText>
                                    </RowBox>
                                    <RowBox flexWrap="wrap">
                                        {equipmentList.map((v, i) => {
                                            const isImage = false;
                                            return <Equipment onPressBike={onPressBike} isImage={isImage} item={v} index={i} />;
                                        })}
                                    </RowBox>
                                </KeyboardAwareScrollView>
                            </Container>
                        </>
                    ) : (
                        <BikeRegisterFirst navigation={navigation} />
                    )}
                </>
            )}

            <Box backgroundColor={Theme.color.backgroundWhiteGray}>
                <FooterButtons selectMenu={2} backgroundColor={Theme.color.backgroundWhiteGray} />
            </Box>
        </>
    );
}

const Equipment = ({isImage, item, index, onPressBike, onPress}) => {
    return (
        <TouchableOpacity
            onPress={isImage ? onPressBike : onPress}
            style={[
                styles.equipment,
                {
                    marginLeft: getPixel((index + 1) % 3 === 1 ? 16 : 10),
                    borderWidth: isImage ? 0 : 1,
                },
            ]}>
            {!isImage ? (
                <>
                    <DefaultImage style={{marginBottom: 20}} source={AddButtonIcon} width="28px" height="28px" />
                    <PositionBox zIndex={100} backgroundColor="#0000" left="0px" bottom="15px" justifyContent="center" alignItems="center" width="120">
                        <GrayText fontSize={Theme.fontSize.fs15} mg="10px 0px 0px">
                            {item}
                        </GrayText>
                    </PositionBox>
                </>
            ) : (
                <PositionBox
                    left="0px"
                    top="0px"
                    style={{
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                    <Image
                        source={require('@assets/image/dummy2.png')}
                        style={{
                            width: getPixel(120),
                            height: 130,
                        }}
                    />
                    <PositionBox zIndex={100} backgroundColor="#0000" left="0px" bottom="15px" justifyContent="center" alignItems="center" width="120">
                        <DefaultText>{item}</DefaultText>
                    </PositionBox>
                </PositionBox>
            )}
        </TouchableOpacity>
    );
};
const menuItem = ['사용중인 자전거', '보관 자전거'];
const equipmentList = ['휠셋', '안장', '페달', '사이클링컴퓨터', '스마트로라', '클릿슈즈', '파워미터'];

const styles = StyleSheet.create({
    equipment: {
        width: getPixel(120),
        height: 130,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderColor: Theme.borderColor.gray,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
