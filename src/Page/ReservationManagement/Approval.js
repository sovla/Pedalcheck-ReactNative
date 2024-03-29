import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, DarkText, IndigoText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {FooterButton} from '@/assets/global/Button';
import Photo from '@/Component/Repair/Photo';
import CheckList from '@/Component/ReservationManagement/CheckList';
import {RequireFieldText} from '../Home/RegisterInformation';
import {reservationComplete} from '@/API/ReservationManagement/ReservationManagement';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {showToastMessage} from '@/Util/Toast';
import {AlertButton} from '@/Util/Alert';
import numberFormat from '@/Util/numberFormat';
import Loading from '@/Component/Layout/Loading';

export default function Approval({navigation, route: {params}}) {
    const {login} = useSelector(state => state);
    const [isShow, setIsShow] = useState(false);
    const [checkList, setCheckList] = useState(initCheckList);
    const [imageArray, setImageArray] = useState([]);
    const [selectWages, setSelectWages] = useState('없음');
    const [memo, setMemo] = useState('');
    const [wages, setWages] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const onPressCancle = () => {
        navigation.goBack();
    };

    const onPressComfirm = () => {
        if (selectWages !== '없음') {
            if (wages === '') {
                AlertButton(`${selectWages}를 입력해주세요.`);
                return null;
            }
        }
        setIsLoading(true);
        const [result, proc_chk] = changeCheckList(checkList);
        reservationComplete({
            _mt_idx: login.idx,
            od_idx: params.od_idx,
            opt_return: selectWages === '반환공임비' ? 'R' : selectWages === '추가공임비' ? 'A' : 'N', // 추가/반환 공임비 N:없음/A:추가공임비/R:반환공임비
            opt_return_price: wages ?? '',
            opt_note: memo,
            opt_image: imageArray,
            ...result,
            proc_chk: proc_chk,
        })
            .then(res => {
                const {data} = res;
                if (data.result === 'true') {
                    //  수정필요  정비내역 정비이력으로 이동 추가 확인 필요
                    showToastMessage('정비 처리완료 되었습니다.');
                    navigation.navigate('RepairHistoryHome', {
                        menu: '정비이력',
                    });
                } else {
                    showToastMessage(data.msg);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        // navigation.navigate('ReservationManagement');
    };
    useUpdateEffect(() => {
        setWages('');
    }, [selectWages]);
    const menuItem = ['없음', '추가공임비', '반환공임비'];
    return (
        <>
            {isLoading && <Loading isAbsolute />}
            <Header title="처리완료" />
            <Box flex={1}>
                <ScrollBox flex={1} pd="0px 16px" keyboardShouldPersistTaps="handled">
                    <Box mg="20px 0px 0px" flex={1} style={borderBottomWhiteGray}>
                        <DarkBoldText>결제정보</DarkBoldText>
                        <RowBox mg="10px 0px 20px" width="380px" justifyContent="space-between">
                            <DarkText>가격</DarkText>
                            <MoneyText money={params?.ot_price} color={Theme.color.black} fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.bold} />
                        </RowBox>
                    </Box>
                    <Box flex={1} style={borderBottomWhiteGray}>
                        <RowBox mg="20px 0px 20px">
                            <RequireFieldText />
                        </RowBox>
                    </Box>
                    <Box>
                        <DarkBoldText mg="20px 0px 12px">추가/반환 공임비</DarkBoldText>
                        <RowBox mg="0px 0px 10px" width="380px">
                            {menuItem.map(item => (
                                <SelectItem content={item} onPress={setSelectWages} select={selectWages} key={item} />
                            ))}
                        </RowBox>
                        {selectWages !== '없음' && (
                            <RowBox mg="10px 0px 30px" alignItems="center">
                                <DefaultInput
                                    placeHolder={`${selectWages}를 입력해주세요.`}
                                    width="340px"
                                    value={numberFormat(wages)}
                                    changeFn={text => {
                                        setWages(text.split(',').reduce((prev, curr) => prev + curr));
                                    }}
                                    keyboardType={'numeric'}
                                />
                                <DarkMediumText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15}>
                                    원
                                </DarkMediumText>
                            </RowBox>
                        )}
                    </Box>
                    <Box style={borderBottomWhiteGray}>
                        <DarkBoldText mg="0px 0px 20px">선택 입력 항목</DarkBoldText>
                    </Box>
                    <Box>
                        <RowBox mg="20px 0px 10px" width="380px" justifyContent="space-between" alignItems="center">
                            <DarkMediumText>정비사진 업로드</DarkMediumText>
                            <IndigoText fontSize={Theme.fontSize.fs14}>최대 15장까지 등록가능</IndigoText>
                        </RowBox>
                        <Photo imageArray={imageArray} setImageArray={setImageArray} imageCount={15} isMulti />
                    </Box>
                    <Box mg="20px 0px 0px">
                        <DefaultInput width="380px" height="150px" placeHolder="정비노트를 입력해주세요" isAlignTop multiline value={memo} changeFn={setMemo} />
                    </Box>
                    <CheckList isShow={isShow} setIsShow={setIsShow} checkList={checkList} setCheckList={setCheckList} />
                    <Box mg="10px 0px 20px">
                        <FooterButton isRelative isChange leftContent="확인" rightContent="취소" leftPress={onPressComfirm} rightPress={onPressCancle} />
                    </Box>
                </ScrollBox>
            </Box>
        </>
    );
}

const SelectItem = ({content, onPress, select}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                onPress(content);
            }}>
            <RowBox>
                <DefaultCheckBox isRadio isDisabled isCheck={select === content} />
                <DarkText mg="0px 40px 0px 10px" fontSize={Theme.fontSize.fs15}>
                    {content}
                </DarkText>
            </RowBox>
        </TouchableOpacity>
    );
};

const initCheckList = [
    {
        title: '휠/허브',
        item: [
            {
                itemTitle: '휠 정렬',
                select: '1',
            },
            {
                itemTitle: '구름성',
                select: '1',
            },
        ],
    },
    {
        title: '핸들',
        item: [
            {
                itemTitle: '헤드셋 유격',
                select: '1',
            },
            {
                itemTitle: '핸들바 위치',
                select: '1',
            },
            {
                itemTitle: '바테입',
                select: '1',
            },
        ],
    },
    {
        title: '프레임',
        item: [
            {
                itemTitle: '세척상태',
                select: '1',
            },
            {
                itemTitle: '녹 발생',
                select: '1',
            },
            {
                itemTitle: '프레임 외관',
                select: '1',
            },
        ],
    },
    {
        title: '비비/페달',
        item: [
            {
                itemTitle: '비비 유격',
                select: '1',
            },
            {
                itemTitle: '페달 조립',
                select: '1',
            },
            {
                itemTitle: '구름성',
                select: '1',
            },
        ],
    },
    {
        title: '타이어',
        item: [
            {
                itemTitle: '공기압',
                select: '1',
            },
            {
                itemTitle: '마모상태(프론트)',
                select: '1',
            },
            {
                itemTitle: '마모상태(리어)',
                select: '1',
            },
        ],
    },
    {
        title: '안장',
        item: [
            {
                itemTitle: '안장 위치',
                select: '1',
            },
            {
                itemTitle: '싯클램프 체결',
                select: '1',
            },
        ],
    },
    {
        title: '체인/기어',
        item: [
            {
                itemTitle: '체인 윤활',
                select: '1',
            },
            {
                itemTitle: '체인 수명',
                select: '1',
            },
            {
                itemTitle: '체인 청소상태',
                select: '1',
            },
            {
                itemTitle: '스프라켓 청소상태',
                select: '1',
            },
            {
                itemTitle: '기어 변속',
                select: '1',
            },
        ],
    },
];

export function changeCheckList(object) {
    let data = {};
    let result = false;

    const apiDataString = 'opt_chk_';

    for (let i = 0; i < checkList.length; i++) {
        const item = checkList[i]?.item;
        for (let j = 0; j < item.length; j++) {
            const select = item[j]?.select;
            if (select === '양호' || select === '정비 요망') {
                result = true;
            }

            Object.assign(data, {
                [`${apiDataString}${i + 1}_${j + 1}`]: select === '양호' ? 1 : select === '정비 요망' ? 2 : 0,
            });
        }
    }
    return [data, result];
}
