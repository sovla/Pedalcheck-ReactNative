import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import React, {useLayoutEffect} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import DefaultImage from '@assets/global/Image';
import {BorderButton, LinkButton} from '@/assets/global/Button';
import TrashIcon from '@assets/image/ic_trash.png';
import ModifyIcon from '@assets/image/ic_modify.png';
import Theme from '@/assets/global/Theme';
import DummyIcon from '@assets/image/default_5.png';
import chainOil from '@assets/image/chainOil.png';
import chain from '@assets/image/chain.png';
import tire from '@assets/image/tire.png';
import cable from '@assets/image/cable.png';
import handle from '@assets/image/handle.png';

import {DarkText} from '@/assets/global/Text';
import {DefaultInput} from '@/assets/global/Input';
import RepairCycle from '@/Component/BikeManagement/RepairCycle';
import ArrowRightIcon from '@assets/image/arr_right.png';
import ShopRepairHistory from '@/Component/BikeManagement/ShopRepairHistory';
import BikeInformationHeader from '@/Component/BikeManagement/BikeInformationHeader';
import BikeInformaitonBody from '@/Component/BikeManagement/BikeInformaitonBody';
import TrashButton from '@/Component/Buttons/TrashButton';
import ModifyButton from '@/Component/Buttons/ModifyButton';
import {changeBikeStatus, deleteBike, getBikeDetail, setBikeDistacne} from '@/API/Bike/Bike';
import {useEffect} from 'react';
import {useState} from 'react';
import BikeChangeCycle from '@/Util/BikeChangeCycle';
import {showToastMessage} from '@/Util/Toast';
import {AlertButton} from '@/Util/Alert';
import numberFormat from '@/Util/numberFormat';
import Loading from '@/Component/Layout/Loading';

export default function BikeDetail({navigation, route}) {
    const {login} = useSelector(state => state);
    const [bikeInformation, setBikeInformation] = useState([]);
    const [bikeDistanceText, setBikeDistacneText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        if (route.params?.mbt_idx == null || route.params?.mbt_idx == undefined) {
            AlertButton('올바른 경로로 접근해 주세요.');
            navigation.goBack();
        }
    }, []);
    useEffect(() => {
        getBikeDetailHandle();
    }, []);

    const getBikeDetailHandle = async () => {
        setIsLoading(true);
        const response = await getBikeDetail({
            _mt_idx: login?.idx,
            mbt_idx: route?.params?.mbt_idx,
        });
        if (response?.data?.result === 'true') {
            setBikeInformation(response?.data?.data?.data);
        }
        setIsLoading(false);
    };

    const deleteBikeHandle = async () => {
        Alert.alert('', '자전거를 삭제하시겠습니까? 삭제하면 복구 할 수 없습니다.', [
            {
                text: '취소',
                onPress: () => {
                    return null;
                },
            },
            {
                text: '확인',
                onPress: async () => {
                    const response = await deleteBike({
                        _mt_idx: login?.idx,
                        mbt_idx: route?.params?.mbt_idx,
                    });

                    if (response.data.result === 'true') {
                        await showToastMessage('삭제되었습니다.');
                        navigation.goBack();
                    }
                },
            },
        ]);
    };

    const changeBikeStatusHandle = async bikeStatus => {
        const response = await changeBikeStatus({
            _mt_idx: login.idx,
            mbt_idx: route?.params?.mbt_idx,
            mbt_flag: bikeStatus,
        });
        if (response?.data?.result === 'true') {
            if (bikeStatus === 'Y') {
                showToastMessage('사용중인 자전거로 변경했습니다.');
            } else {
                showToastMessage('보관중인 자전거로 변경했습니다.');
            }
        } else {
            if (response.data.msg === '사용중인 자전거가 5개 이상입니다.') {
                AlertButton('사용중인 자전거는 5대까지 등록가능합니다.');
            }
        }
        getBikeDetailHandle();
    };

    const setBikeDistacneHandle = async bikeStatus => {
        setBikeDistacneText('');
        await setBikeDistacne({
            _mt_idx: login.idx,
            mbt_idx: route?.params?.mbt_idx,
            mbt_km: bikeDistanceText,
        });
        getBikeDetailHandle();
    };

    const bikeType = [
        {},
        {label: '로드바이크', value: '1'},
        {label: '미니벨로', value: '2'},
        {label: 'MTB', value: '3'},
        {label: '전기자전거', value: '4'},
        {label: '하이브리드', value: '5'},
        {label: '펫바이크', value: '6'},
        {label: '픽시', value: '7'},
    ];

    const {bike, order, bike_km} = bikeInformation;
    const bikeAddDate = new Date(bike?.mbt_wdate);
    const today = new Date();
    const dateDiff = Math.ceil((today.getTime() - bikeAddDate.getTime()) / (1000 * 3600 * 24));

    const bikeInfo = bikeInformation?.bike
        ? {
              brand: bike?.mbt_brand,
              modelName: bike?.mbt_model,
              bikeName: bike?.mbt_nick,
              bikeImage: bike?.mbt_image,
              detail: [
                  {
                      title: '연식',
                      value: bike?.mbt_year ? bike.mbt_year + '년식' : '',
                  },
                  {
                      title: '타입',
                      value: bikeType[bike?.mbt_type]?.label,
                  },
                  {
                      title: '구동계',
                      value: bike.mbt_drive,
                  },
                  {
                      title: '사이즈',
                      value: bike?.mbt_size,
                  },
                  {
                      title: '컬러',
                      value: bike.mbt_color,
                  },
                  {
                      title: '모터',
                      value: bike?.mbt_motor,
                  },
                  {
                      title: '파워',
                      value: bike?.mbt_power,
                  },
                  {
                      title: '차대번호',
                      value: bike?.mbt_serial,
                  },
                  {
                      title: '모델상세',
                      value: bike.mbt_model_detail,
                  },
              ],
          }
        : {};

    const dummyItem = [
        {
            title: '체인 윤활 주기',
            image: chainOil,
            lastChange: BikeChangeCycle(bike_km, 400),
            changeCycle: 400,
        },
        {
            title: '체인 교체 주기',
            image: chain,
            lastChange: BikeChangeCycle(bike_km, 3000),
            changeCycle: 3000,
        },
        {
            title: '타이어 교체 주기',
            image: tire,
            lastChange: BikeChangeCycle(bike_km, 3000),
            changeCycle: 3000,
        },
        {
            title: '케이블 교체 주기',
            image: cable,
            lastChange: BikeChangeCycle(bike_km, 8000),
            changeCycle: 8000,
        },
        {
            title: '바테이프 교체 주기',
            image: handle,
            lastChange: BikeChangeCycle(dateDiff, 365),
            changeCycle: 365,
        },
    ];

    const RightComponent = () => {
        return (
            <RowBox justifyContent="space-between" width="65px" height="100%" alignItems="center">
                <TrashButton onPress={() => deleteBikeHandle()} />
                <ModifyButton onPress={() => navigation.navigate('BikeRegister', {bike: bike})} />
            </RowBox>
        );
    };
    if (isLoading && bikeInformation.length === 0) {
        return <Loading />;
    }

    return (
        <>
            <Header title="자전거 상세" RightComponent={RightComponent} />
            <Box flex={1}>
                <ScrollBox flex={1} width={412} pd="0px 16px" keyboardShouldPersistTaps="handled">
                    <BikeInformationHeader item={bikeInfo} />
                    <Box>
                        <RowBox width="380px" justifyContent="space-between">
                            {bikeInfo.detail?.filter(item => item.value)?.length > 0 ? <DarkText fontWeight={Theme.fontWeight.medium}>자전거 정보</DarkText> : <Box />}

                            <RowBox>
                                {bike?.mbt_flag === 'Y' ? (
                                    <TouchableOpacity onPress={() => changeBikeStatusHandle('N')}>
                                        <BorderButton width="87px">자전거 보관</BorderButton>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => changeBikeStatusHandle('Y')}>
                                        <BorderButton width="87px">자전거 사용</BorderButton>
                                    </TouchableOpacity>
                                )}
                            </RowBox>
                        </RowBox>
                        <BikeInformaitonBody bikeInfoDetail={bikeInfo.detail} />
                    </Box>
                    <Box>
                        <RowBox>
                            <DarkText fontWeight={Theme.fontWeight.medium}>주행거리</DarkText>
                        </RowBox>
                        <RowBox mg="10px 0px 20px">
                            <DefaultInput
                                value={bikeDistanceText}
                                changeFn={text => setBikeDistacneText(text)}
                                width="310px"
                                placeHolder="주행거리를 입력하세요"
                                mg="0px 10px 0px 0px"
                                maxLength={4}
                                keyboardType={'number-pad'}
                            />
                            <LinkButton width="60px" height="44px" content="저장" to={() => setBikeDistacneHandle()} />
                        </RowBox>
                    </Box>
                    <Box>
                        <RowBox width="380px" justifyContent="space-between">
                            <DarkText fontWeight={Theme.fontWeight.medium}>정비 주기</DarkText>
                            <RowBox>
                                <DarkText fontWeight={Theme.fontWeight.medium} mg="0px 10px 0px 0px">
                                    총 주행거리
                                </DarkText>
                                <DarkText fontWeight={Theme.fontWeight.medium}>{numberFormat(bike_km)}km</DarkText>
                            </RowBox>
                        </RowBox>
                        {dummyItem.map((item, index) => {
                            return <RepairCycle key={item + index} item={item} />;
                        })}
                    </Box>
                    <Box>
                        <TouchableOpacity onPress={() => navigation.navigate('RepairHistory')}>
                            <RowBox mg="20px 0px 0px" alignItems="center" justifyContent="space-between" width="380px">
                                <DarkText fontWeight={Theme.fontWeight.medium}>정비이력</DarkText>
                                <RowBox>
                                    <DarkText fontWeight={Theme.fontWeight.medium}>전체 목록 보기</DarkText>

                                    <DefaultImage source={ArrowRightIcon} width="24px" height="24px" />
                                </RowBox>
                            </RowBox>
                        </TouchableOpacity>
                        <Box>
                            {order?.length ? (
                                order?.map((item, index) => {
                                    const shopItem = bikeInformation?.order
                                        ? {
                                              shopName: item.mst_name,
                                              product: item.pt_title,
                                              date: item.ot_pt_date + ' ' + item.ot_pt_time.slice(0, 5),
                                              status: item.ot_status ? item.ot_status : 'test',
                                          }
                                        : {};
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('RepairHistoryDetail', {item});
                                            }}>
                                            <ShopRepairHistory key={index} item={shopItem} />
                                        </TouchableOpacity>
                                    );
                                })
                            ) : (
                                <Box alignItems="center" justifyContent="space-between" width="380px" mg="30px 0px 30px 0px">
                                    <DarkText>정비이력이 없습니다.</DarkText>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </ScrollBox>
            </Box>
        </>
    );
}
