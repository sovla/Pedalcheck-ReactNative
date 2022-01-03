import {FooterButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import {initCheckList} from '@/assets/global/dummy';
import {DarkBoldText, DarkMediumText, DarkText, IndigoText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Badge from '@/Component/BikeManagement/Badge';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import Photo from '@/Component/Repair/Photo';
import CheckList from '@/Component/ReservationManagement/CheckList';
import {modalOpen} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import Dummy1 from '@assets/image/dummy1.png';
import Dummy2 from '@assets/image/dummy2.png';
import Dummy3 from '@assets/image/dummy3.png';
import Dummy4 from '@assets/image/dummy4.png';
import Dummy5 from '@assets/image/dummy5.png';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getRepairHistoryDetail} from '@/API/More/More';

// 2022-01-03 14:50:20
// Junhan
// 승인거절 등 여러 상태에 대한 더미가 있어야 작업가능

export default function RepairHistoryDetail({route: {params}}) {
  const {size, login} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = navigation.isFocused();

  const [isShow, setIsShow] = useState(false);
  const [repair, setRepair] = useState({});
  const checkList = initCheckList;
  const onPressReservationCancle = () => {
    dispatch(modalOpen('reservationCancle'));
  };
  const onPressReview = () => {
    navigation.navigate('ReviewWrite', {
      navigate: 'RepairHistory',
    });
  };

  useEffect(() => {
    getRepairHistoryDetail({
      _mt_idx: login?.idx,
      od_idx: params?.item?.od_idx,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => setRepair(data));
  }, [isFocused]);
  console.log(repair);

  return (
    <>
      <Header title="정비이력 상세" />
      <Container>
        {Object.keys(repair)?.length > 0 && (
          <ScrollBox flex={1}>
            <RepairHistoryDetailHeader
              status={repair?.ot_status}
              productName={[repair?.pt_title]}
              shopName={repair?.pt_title}
              rejectionReason="승인거절 사유 노출 영역 승인거절 사유노출 영역 승인거절 사유 노출 영역"
              completeDate="2021-10-14 10:58"
            />
            <Box mg="20px 16px">
              <DarkBoldText>정비사진</DarkBoldText>
              <Photo imageArray={[Dummy1, Dummy2, Dummy3, Dummy4, Dummy5]} isView />
            </Box>
            <Box mg="0px 16px 20px">
              <DarkBoldText>정비노트</DarkBoldText>
              <DarkText width={size.minusPadding} fontSize={Theme.fontSize.fs15}>
                정비노트 노출 영역 정비노트 노출 영역 정비노트 노출 영역 정비노트 노출 영역 정비노트
                노출 영역 정비노트 노출 영역 정비노트 노출 영역 정비노트 노출 영역
              </DarkText>
            </Box>
            <Box mg="0px 16px">
              <CheckList disabled checkList={checkList} isShow={isShow} setIsShow={setIsShow} />
            </Box>
            <Box mg="0px 16px">
              <RowBox>
                <DarkBoldText>정비요청 정보</DarkBoldText>
              </RowBox>
              <RowBox mg="10px 0px">
                <DarkMediumText width="110px" fontSize={Theme.fontSize.fs15}>
                  정비 자전거
                </DarkMediumText>
                <DarkText style={{flex: 1}} fontSize={Theme.fontSize.fs15}>
                  따릉이
                </DarkText>
              </RowBox>
              <RowBox>
                <DarkMediumText width="110px" fontSize={Theme.fontSize.fs15}>
                  예약시간
                </DarkMediumText>
                <DarkText style={{flex: 1}} fontSize={Theme.fontSize.fs15}>
                  2021-10-20 10:08
                </DarkText>
              </RowBox>

              <RowBox mg="10px 0px">
                <DarkMediumText width="110px" fontSize={Theme.fontSize.fs15}>
                  요청사항
                </DarkMediumText>
                <DarkText style={{flex: 1}} fontSize={Theme.fontSize.fs15}>
                  요청사항 영역입니다
                </DarkText>
              </RowBox>
            </Box>
            <Box mg="10px 16px 0px">
              <RowBox>
                <DarkBoldText>추가/반환 공임비</DarkBoldText>
              </RowBox>
              <BetweenBox mg="10px 0px" width={size.minusPadding}>
                <DarkMediumText fontSize={Theme.fontSize.fs15}>추가 공임비</DarkMediumText>
                <MoneyText money={8000} fontSize={Theme.fontSize.fs15} color={Theme.color.black} />
              </BetweenBox>
            </Box>
            <Box mg="10px 16px 0px" style={borderBottomWhiteGray}>
              <RowBox>
                <DarkBoldText>결제정보</DarkBoldText>
              </RowBox>
              <BetweenBox mg="10px 0px" width={size.minusPadding}>
                <DarkMediumText fontSize={Theme.fontSize.fs15}>결제수단</DarkMediumText>
                <DarkText fontSize={Theme.fontSize.fs15}>실시간 계좌이체</DarkText>
              </BetweenBox>
              <BetweenBox width={size.minusPadding}>
                <DarkMediumText fontSize={Theme.fontSize.fs15}>가격</DarkMediumText>
                <MoneyText
                  money={50000}
                  fontSize={Theme.fontSize.fs15}
                  color={Theme.color.black}
                  fontWeight={Theme.fontWeight.bold}
                />
              </BetweenBox>
              <BetweenBox width={size.minusPadding} mg="10px 0px 15px">
                <DarkMediumText fontSize={Theme.fontSize.fs15}>할인</DarkMediumText>
                <MoneyText money={-4000} fontSize={Theme.fontSize.fs15} color={Theme.color.black} />
              </BetweenBox>
            </Box>
            <Box mg="0px 16px" style={borderBottomWhiteGray}>
              <BetweenBox mg="20px 0px" width={size.minusPadding}>
                <DarkBoldText>결제 금액</DarkBoldText>
                <RowBox alignItems="center">
                  <Badge badgeContent="결제완료" />
                  <MoneyText
                    mg="0px 0px 0px 10px"
                    fontSize={Theme.fontSize.fs18}
                    fontWeight={Theme.fontWeight.bold}
                    color={Theme.color.black}
                    money={50000}
                  />
                </RowBox>
              </BetweenBox>
            </Box>
            <RowBox mg="20px 16px">
              <FooterButton
                isRelative
                leftContent="예약 취소"
                rightContent="리뷰작성"
                leftPress={onPressReservationCancle}
                rightPress={onPressReview}
              />
            </RowBox>
          </ScrollBox>
        )}
      </Container>
    </>
  );
}

const RepairHistoryDetailHeader = ({
  status = '예약',
  productName = ['정비-오버홀'],
  shopName = '인천신스',
  rejectionReason = '승인거절 사유 노출 영역 승인거절 사유노출 영역 승인거절 사유 노출 영역',
  completeDate = '2021-10-14 10:58',
}) => {
  return (
    <Box mg="0px 16px" pd="20px 0px" style={borderBottomWhiteGray}>
      <RowBox mg="0px 0px 20px">
        <Badge badgeContent={status} />
        <Box mg="0px 0px 0px 10px">
          {productName.map((item, index) => (
            <DarkBoldText key={item + index}>{item}</DarkBoldText>
          ))}
          <IndigoText fontSize={Theme.fontSize.fs15}>{shopName} </IndigoText>
        </Box>
      </RowBox>
      <RowBox mg="0px 0px 10px">
        <DarkMediumText width="110px">승인거절 사유</DarkMediumText>
        <DarkText width="275px">{rejectionReason}</DarkText>
      </RowBox>
      <RowBox>
        <DarkMediumText width="110px">완료시간</DarkMediumText>
        <DarkText width="275px">{completeDate}</DarkText>
      </RowBox>
    </Box>
  );
};
