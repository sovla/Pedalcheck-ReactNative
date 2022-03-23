import {FooterButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {modalClose} from '@/Store/modalState';
import numberFormat from '@/Util/numberFormat';
import {reduceItem} from '@/Util/reduceItem';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function PaymentInformationCheck({onPressComplete}) {
  const {
    shopInfo: {store_info},
    login,
    reservationInfo,
  } = useSelector(state => state);

  const dispatch = useDispatch();
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
      content: selectProduct?.length > 1 ? `${firstProduct} 외 ${selectProduct.length - 1}건` : firstProduct,
    },
    {title: '결제금액', content: numberFormat(totalPrice) + '원'},
    {title: '예약시간', content: reservationTime},
    {title: '예약자 이름', content: login?.mt_name},
    {
      title: '브랜드 - 모델',
      content:
        selectBike.selectItem === 2000
          ? selectBike.bikeName.bikeBrand + ' - ' + selectBike.bikeName.bikeModel
          : selectBike.selectBike.mbt_brand + ' - ' + selectBike.selectBike.mbt_model,
    },
    {title: '전화번호', content: login?.mt_sms},
    {title: '요청사항', content: selectPayment?.repairRequest},
  ];
  return (
    <>
      <ModalTitleBox title="결제정보 확인" padding={64} />
      <Box width={'100%'}>
        {paymentObject.map(item => {
          if (!item.content) {
            return null;
          }
          return (
            <RowBox key={item.title} mg="0px 0px 10px">
              <DarkBoldText width="100px">{item.title}</DarkBoldText>
              <RowBox width="240px">
                <DarkText numberOfLines={4}>{item.content}</DarkText>
              </RowBox>
            </RowBox>
          );
        })}
        <Box mg="10px 0px" height="50px" />
        <FooterButton
          width={412 - 64}
          buttonWidth={(412 - 74) / 2}
          leftContent="확인"
          rightContent="취소"
          leftPress={onPressComplete}
          rightPress={() => dispatch(modalClose())}
          isChange
        />
      </Box>
    </>
  );
}

export const paymentInfo = [
  {title: '매장명', content: '인천신스'},
  {title: '정비상품', content: '정비 - 오버홀'},
  {title: '결제금액', content: '20,000원'},
  {title: '예약시간', content: '2021-10-14 10:58'},
  {title: '예약자 이름', content: '홍길동'},
  {title: '이메일', content: 'pedalee@pedalcheck.co.kr'},
  {title: '전화번호', content: '010-1234-5678'},
  {title: '요청사항', content: '요청사항 입력 내용'},
];
