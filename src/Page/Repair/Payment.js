import React, {useLayoutEffect} from 'react';
/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from '@Component/Layout/Loading';
import {ButtonTouch} from '@/assets/global/Button';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {sendOrder} from '@/API/Shop/Shop';

export function Payment({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setresponseData] = useState(null);
  const {reservationInfo, login, shopInfo} = useSelector(state => state);

  const {selectBike, selectDate, selectPayment, selectProduct} = reservationInfo;
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    console.log(response);
    navigation.replace('ReservationPayment', response);
  }
  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  console.log(reservationInfo);
  useLayoutEffect(() => {
    if (!responseData) {
      const pt_idx = [];
      const pt_title = [];
      const pt_price = [];

      selectProduct.selectProduct.forEach(foreachItem => {
        pt_idx.push(foreachItem.item.pt_idx);
        pt_title.push(foreachItem.item.pt_title);
        pt_price.push(foreachItem.item.pt_price);
      });
      sendOrder({
        _mt_idx: login.idx,
        mbt_idx: selectBike.selectItem !== 2000 && selectBike.selectBike.mbt_idx,
        ot_bike_nick:
          selectBike.selectItem !== 2000 ? selectBike.selectBike.mbt_nick : selectBike.bikeBrand + bikeModel,
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
      })
        .then(res => res.data?.result === 'true' && res.data.data.data)
        .then(data => {
          if (data) {
            setresponseData(data);
          }
        });
    }
  }, []);

  const changePayment = payment => {
    switch (payment) {
      case '신용카드':
        return '1';
      case '실시간 계좌이체':
        return '2';
      case '카카오페이':
        return '3';
      case '무통장 입금':
        return '4';
      // 1:신용카드/2:계좌이체/3:카카오페이/4:무통장
    }
  };

  if (responseData?.ot_code && isLoading) {
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  const data = {
    pg: 'kakaopay',
    pay_method: 'card',
    name: `페달체크 결제`,
    merchant_uid: responseData.ot_code,
    amount: `${selectProduct?.totalPrice}`,
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
