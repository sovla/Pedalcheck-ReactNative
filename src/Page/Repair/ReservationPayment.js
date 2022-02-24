import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';
import BorderCheckIcon from '@assets/image/ic_complete.png';
import DefaultImage from '@assets/global/Image';
import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import numberFormat from '@/Util/numberFormat';
import {reduceItem} from '@/Util/reduceItem';
import {useState} from 'react';
import Loading from '@/Component/Layout/Loading';
import {useLayoutEffect} from 'react';
import {getOrderCheck} from '@/API/Shop/Shop';
import {AlertButton} from '@/Util/Alert';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useIsFocused, useNavigationState} from '@react-navigation/native';
import {clearReservation} from '@/Store/reservationState';

export default function ReservationPayment({navigation, route: {params}}) {
  const [isLoading, setIsLoading] = useState(true);
  const [virtualAccount, setVirtualAccount] = useState({
    ot_pay_status: '',
    ot_pay_type: '',
    ot_vbank: '',
    ot_vbank_date: 0,
    ot_vbank_name: '',
    ot_vbank_num: '',
  });

  const [orderIdx, setOrderIdx] = useState('');
  const dispatch = useDispatch();

  const {
    reservationInfo,
    shopInfo: {store_info},
    login,
  } = useSelector(state => state);

  const selectProduct = reservationInfo?.selectProduct?.selectProduct;
  const selectBike = reservationInfo?.selectBike;
  const selectDate = reservationInfo?.selectDate;
  const selectPayment = reservationInfo?.selectPayment;

  const firstProduct = selectProduct?.length > 0 ? selectProduct[0]?.item?.pt_title : '';
  const totalPrice = reduceItem(selectProduct, 'pt_dc_price');

  const reservationTime = `${selectDate?.date} ${selectDate?.time}`;

  const paymentObject = [
    {title: '매장명', content: store_info?.mst_name},
    {
      title: '정비상품',
      content: selectProduct?.length > 1 ? `${firstProduct} 외 ${selectProduct?.length - 1}건` : firstProduct,
    },
    {title: '결제금액', content: numberFormat(totalPrice) + '원'},
    {title: '예약시간', content: reservationTime},
    {title: '예약자 이름', content: login?.mt_name},
    {title: '이메일', content: login?.mt_id},
    {title: '전화번호', content: login?.mt_sms},
    {title: '요청사항', content: selectPayment?.repairRequest},
  ];

  const getOrderCheckHandle = async () => {
    let result = false;
    let i = 0;
    while (!result) {
      if (i > 10) {
        //  간혹가다 결제 API 실패 사례 10번까지 시도후 정비소 메인으로
        AlertButton('결제 실패했습니다. 다시 시도해주세요.', '확인', () => {
          navigation.navigate('RepairHome');
        });
        break;
      }
      await getOrderCheck({
        ot_code: params.merchant_uid,
      })
        .then(res => {
          if (res.data?.result === 'true') {
            result = true;
            const {data} = res.data.data;

            setOrderIdx(data?.od_idx);
            if (data.ot_pay_type === 'vbank') {
              //  가상계좌일때
              setVirtualAccount(data);
              setIsLoading(false);
            } else {
              // 가상계좌 아닐때
              if (data.ot_pay_status === 'ready') {
                //  결제 준비 상태이면 실패 리턴
                AlertButton('결제 실패했습니다. 다시 시도해주세요.', '확인', () => {
                  navigation.goBack();
                });
              } else {
                setIsLoading(false);
              }
            }
          } else {
            // 결제실패시 리턴
            AlertButton('결제 실패했습니다. 다시 시도해주세요.', '확인', () => {
              navigation.goBack();
            });
          }
        })
        .catch(err => {});
      i++;
    }
  };

  useLayoutEffect(() => {
    if (params?.merchant_uid) {
      //  가상계좌 일때
      //  ot_pay_status : "ready" 넘기기
      //  ot_pay_status : "paid" // 결제 완료상태
      getOrderCheckHandle();
    } else {
      params?.price_zero && setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    return () => {
      dispatch(clearReservation());
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header title="정비예약" isGoBack={false} />
      <Box style={{flex: 1}}>
        <ScrollBox>
          <RepairReservationHeader step={5} content="결제완료" />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <RowBox justifyContent="center" alignItems="center" mg="33px 0px">
            <DefaultImage source={BorderCheckIcon} width="20px" height="20px" />
            <DarkBoldText mg="0px 0px 0px 7px">예약이 접수되었습니다.</DarkBoldText>
          </RowBox>
          <Box mg="0px 16px">
            {virtualAccount?.ot_vbank !== '' && <VirtualAccountItem {...virtualAccount} />}

            {paymentObject.map(item => {
              if (!item?.content) {
                return null;
              }
              return (
                <RowBox key={item.title} mg="0px 0px 10px">
                  <DarkBoldText width="100px">{item.title}</DarkBoldText>
                  <RowBox width="240px">
                    <DarkText accessibilityState={{selected: true}}>{item.content}</DarkText>
                  </RowBox>
                </RowBox>
              );
            })}
          </Box>
          {/* 가상계좌 정보 뿌리기 */}
        </ScrollBox>
      </Box>
      <Box mg="0px 16px 20px">
        <LinkWhiteButton
          to={() => {
            navigation.navigate('RepairHistoryDetail', {
              item: {
                od_idx: orderIdx,
              },
            });
          }}
          content="정비 신청 확인하기"></LinkWhiteButton>
        <LinkButton
          mg="10px 0px 0px 0px"
          to={() => {
            navigation.replace('RepairHome', {mst_name: store_info?.mst_name});
          }}
          content="홈으로 돌아가기"
        />
      </Box>
    </>
  );
}

export const VirtualAccountItem = ({ot_vbank, ot_vbank_date, ot_vbank_name, ot_vbank_num, isDetail}) => {
  return (
    <Box width="380px" mg="0px 0px 15px" style={borderBottomWhiteGray}>
      <RowBox justifyContent="space-between" mg="0px 0px 10px">
        {isDetail ? <DarkText width="100px">은행명</DarkText> : <DarkBoldText width="100px">은행명</DarkBoldText>}

        <DarkText selectable>{ot_vbank}</DarkText>
      </RowBox>
      <RowBox justifyContent="space-between" mg="0px 0px 10px">
        {isDetail ? <DarkText width="100px">계좌번호</DarkText> : <DarkBoldText width="100px">계좌번호</DarkBoldText>}
        <DarkText selectable>{ot_vbank_num}</DarkText>
      </RowBox>
      <RowBox justifyContent="space-between" mg="0px 0px 10px">
        {isDetail ? <DarkText width="100px">예금주</DarkText> : <DarkBoldText width="100px">예금주</DarkBoldText>}
        <DarkText selectable>{ot_vbank_name}</DarkText>
      </RowBox>
      <RowBox justifyContent="space-between" mg="0px 0px 10px">
        {isDetail ? <DarkText width="100px">입금기간</DarkText> : <DarkBoldText width="100px">입금기간</DarkBoldText>}
        <DarkText>{ot_vbank_date}</DarkText>
      </RowBox>
    </Box>
  );
};
