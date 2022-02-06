import React, {useLayoutEffect} from 'react';
/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from '@Component/Layout/Loading';
import {ButtonTouch} from '@/assets/global/Button';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {sendOrder} from '@/API/Shop/Shop';
import {AlertButton} from '@/Util/Alert';

export function Payment({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setresponseData] = useState(null);
  const {reservationInfo, login, shopInfo} = useSelector(state => state);

  const {selectBike, selectDate, selectPayment, selectProduct} = reservationInfo;
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    console.log(response);
    if (response.imp_success === 'true') {
      navigation.replace('ReservationPayment', response);
    } else {
      if (response.error_msg?.includes('F0005')) {
        AlertButton('결제를 취소 했습니다.');
      } else {
        AlertButton('결제 실패했습니다. 다시 시도해주세요.');
      }

      navigation.goBack();
    }
    // 결제완료
  }

  const changePayment = (payment, type = 'api') => {
    // card:신용카드/trans:계좌이체/kakaopay:카카오페이/vbank:무통장

    switch (payment) {
      case '신용카드':
        return 'card';
      case '실시간 계좌이체':
        return 'trans';
      case '카카오페이':
        return type === 'api' ? 'kakaopay' : 'card';
      case '무통장 입금':
        return 'vbank';
    }
  };
  useLayoutEffect(() => {
    if (!responseData) {
      const pt_idx = [];
      const pt_title = [];
      const pt_price = [];
      const pt_sprice = [];

      selectProduct.selectProduct.forEach(forItem => {
        pt_idx.push(forItem.item.pt_idx);
        pt_title.push(forItem.item.pt_title);
        pt_price.push(forItem.item.pt_dc_price);
        pt_sprice.push(forItem.item.pt_price);
      });
      sendOrder({
        _mt_idx: login.idx,
        mbt_idx: selectBike.selectItem !== 2000 && selectBike.selectBike.mbt_idx,
        ot_bike_nick: selectBike.selectItem !== 2000 && selectBike.selectBike.mbt_nick,
        ot_bike_brand: selectBike.selectItem === 2000 && selectBike.selectBike.bikeBrand,
        ot_bike_model: selectBike.selectItem === 2000 && selectBike.selectBike.bikeModel,
        mst_idx: shopInfo.store_info.mst_idx,
        ot_pt_date: selectDate.date,
        ot_pt_time: selectDate.time,
        ot_pay_type: changePayment(selectPayment.selectPayment),
        ot_price: selectProduct.totalPrice,
        // ot_pdate:2022-01-06 18:06:42,
        ot_memo: selectPayment?.repairRequest,
        pt_idx: pt_idx,
        pt_title: pt_title,
        pt_price: pt_price,
        pt_sprice: pt_sprice,
      })
        .then(res => res.data?.result === 'true' && res.data.data.data)
        .then(data => {
          if (data) {
            if (data?.price_zero && data?.price_zero === 'true') {
              navigation.replace('ReservationPayment', {
                price_zero: true,
              });
            }
            setresponseData(data);
          }
        });
    }
  });

  if (responseData?.ot_code && isLoading) {
    //  useLayoutEffect 내에 api 치고 나서 데이터가 있고 로딩인 경우 로딩 제거
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loading />;
  }
  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  console.log(selectProduct.totalPrice);

  const data = {
    pg: selectPayment.selectPayment === '카카오페이' ? 'kakaopay' : 'html5_inicis',
    pay_method: changePayment(selectPayment.selectPayment, 'non-api'),
    name: `페달체크 결제`,
    merchant_uid: responseData.ot_code,
    amount: `${parseInt(selectProduct?.totalPrice)}`,
    buyer_name: login?.mt_name ?? '없음',
    buyer_tel: login?.mt_tel ?? '없음',
    buyer_email: login?.mt_id ?? '없음',
    buyer_addr: login?.mt_addr ?? '없음',
    buyer_postcode: login?.mt_zip ?? '없음',
    app_scheme: 'example', //  https://github.com/iamport/iamport-manual/blob/master/%EC%9D%B8%EC%A6%9D%EA%B2%B0%EC%A0%9C/README.md
    // [Deprecated v1.0.3]: m_redirect_url
  };

  return (
    <IMP.Payment
      userCode={'imp95046650'} // 가맹점 식별코드
      // 티어 코드: agency 기능 사용자에 한함
      loading={<Loading />} // 로딩 컴포넌트
      data={data} // 결제 데이터
      callback={callback} // 결제 종료 후 콜백
    />
  );
}

export default Payment;
