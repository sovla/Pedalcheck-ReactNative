import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';
import BorderCheckIcon from '@assets/image/ic_complete.png';
import DefaultImage from '@assets/global/Image';
import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {reduceItem} from './ReservationProduct';
import numberFormat from '@/Util/numberFormat';

export default function ReservationPayment({navigation}) {
  const {
    reservationInfo,
    shopInfo: {store_info},
    login,
  } = useSelector(state => state);
  const {
    selectProduct: {selectProduct},
    selectBike,
    selectDate,
    selectPayment,
  } = reservationInfo;

  const firstProduct = selectProduct[0]?.item?.pt_title;
  const totalPrice = reduceItem(selectProduct, 'pt_dc_price');

  const reservationTime = `${selectDate?.date} ${selectDate?.time}`;

  const paymentObject = [
    {title: '매장명', content: store_info?.mst_name},
    {
      title: '정비상품',
      content:
        selectProduct?.length > 1
          ? `${firstProduct} 외 ${selectProduct.length - 1}건`
          : firstProduct,
    },
    {title: '결제금액', content: numberFormat(totalPrice) + '원'},
    {title: '예약시간', content: reservationTime},
    {title: '예약자 이름', content: login?.mt_name},
    {title: '이메일', content: login?.mt_id},
    {title: '전화번호', content: login?.mt_sms},
    {title: '요청사항', content: selectPayment?.repairRequest},
  ];
  return (
    <>
      <Header title="정비예약" />
      <Box style={{flex: 1}}>
        <ScrollBox>
          <RepairReservationHeader step={5} content="결제완료" />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <RowBox justifyContent="center" alignItems="center" mg="33px 0px">
            <DefaultImage source={BorderCheckIcon} width="20px" height="20px" />
            <DarkBoldText mg="0px 0px 0px 7px">예약이 접수되었습니다.</DarkBoldText>
          </RowBox>
          <Box mg="0px 16px">
            {paymentObject.map(item => {
              if (!item?.content) {
                return null;
              }
              return (
                <RowBox key={item.title} justifyContent="space-between" mg="0px 0px 10px">
                  <DarkBoldText width="100px">{item.title}</DarkBoldText>
                  <DarkText>{item.content}</DarkText>
                </RowBox>
              );
            })}
          </Box>
        </ScrollBox>
      </Box>
      <Box mg="0px 16px 20px">
        <LinkWhiteButton content="장비 신청 확인하기"></LinkWhiteButton>
        <LinkButton
          mg="10px 0px 0px 0px"
          to={() => navigation.navigate('RepairHome')}
          content="홈으로 돌아가기"
        />
      </Box>
    </>
  );
}
