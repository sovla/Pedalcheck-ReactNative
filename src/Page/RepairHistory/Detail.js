import {BorderButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {initCheckList} from '@/assets/global/dummy';
import {DarkBoldText, DarkMediumText, DarkText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Badge from '@/Component/BikeManagement/Badge';
import BikeInformaitonBody from '@/Component/BikeManagement/BikeInformaitonBody';
import BikeInformationHeader from '@/Component/BikeManagement/BikeInformationHeader';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import Photo from '@/Component/Repair/Photo';
import CheckList from '@/Component/ReservationManagement/CheckList';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {imageAddress} from '@assets/global/config';

// rejection: item.ot_cmemo, // 수정 필요 API 값없음

export default function Detail({navigation, route}) {
  const {size} = useSelector(state => state);
  const [checkList, setCheckList] = useState(initCheckList);
  const [isCheckListShow, setIsCheckListShow] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const item = route?.params?.item;
  const changeItem = {
    status: item.ot_status,
    productName: item.ot_title,
    reservationDate: item.ot_pt_date + ' ' + item.ot_pt_time.substring(0, 5),
    request: item.ot_memo,
    rejection: item.ot_cmemo, // 수정 필요 API 값없음
    totalPrice: item.ot_price,
    salePrice: item.ot_sprice,
    customerName: item.mt_name,
    customerEmail: item.mt_email,
    customerTel: item.mt_hp,
    customerLevel: item.mt_status,
  };
  const changeBikeItem = {
    bikeImage: item.bike_img,
    brand: item.ot_bike_brand,
    modelName: item.ot_bike_model,
    bikeName: item.ot_bike_nick,
    detail: [
      {
        title: '차대번호',
        value: item.mbt_serial,
      },
      {
        title: '연식',
        value: item.mbt_year,
      },
      {
        title: '타입',
        value: item.mbt_type,
      },
      {
        title: '구동계',
        value: item.mbt_drive,
      },
      {
        title: '사이즈',
        value: item.mbt_size,
      },
      {
        title: '컬러',
        value: item.mbt_color,
      },
      {
        title: '모델상세',
        value: item.mbt_model_detial,
      },
    ],
  };
  const setCheckListHandle = () => {
    try {
      const data = item?.ot_proc;
      let notNullCount = 0;
      setCheckList(prev =>
        prev.map((firstValue, firstIndex) => {
          let tmpValue = firstValue.item.map((secondValue, secondIndex) => {
            try {
              if (data[secondValue.indexName] === '1') {
                notNullCount++;
                return {...secondValue, select: '양호'};
              } else if (data[secondValue.indexName] === '2') {
                notNullCount++;
                return {...secondValue, select: '정비 요망'};
              } else {
                return {...secondValue};
              }
            } catch (error) {}
          });
          return {...firstValue, item: tmpValue};
        }),
      );
      if (notNullCount === 0) {
        setIsCheckListShow(false);
      } else {
        setIsCheckListShow(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    setCheckListHandle();
  }, []);

  return (
    <>
      <Header title="상세보기" />
      <Box flex={1}>
        <ScrollBox flex={1} pd="0px 16px">
          <Box style={borderBottomWhiteGray} pd="0px 0px 20px">
            <RowBox mg="20px 0px 0px" alignItems="center">
              <Badge badgeContent={changeItem.status} />
              <DarkBoldText mg="0px 0px 0px 10px">{changeItem.productName}</DarkBoldText>
            </RowBox>
            <RowBox mg="20px 0px 10px">
              <DarkMediumText width="110px">예약시간</DarkMediumText>
              <RowBox width="270px" alignItems="center">
                <DarkText mg="0px 10px 0px 0px">{changeItem.reservationDate} </DarkText>
              </RowBox>
            </RowBox>
            {changeItem?.request?.length > 0 && (
              <RowBox mg="0px 0px 10px">
                <DarkMediumText width="110px">요청사항</DarkMediumText>
                <DarkText width="270px">{changeItem.request}</DarkText>
              </RowBox>
            )}
            {item?.ot_proc?.ot_cdate?.length > 0 && (
              <RowBox mg="0px 0px 10px">
                <DarkMediumText width="110px">완료시간</DarkMediumText>
                <DarkText width="270px">{item?.ot_proc?.ot_cdate?.substring(0, 16)}</DarkText>
              </RowBox>
            )}
            {item?.ot_code?.length > 0 && (
              <RowBox>
                <DarkMediumText width="110px">주문 번호</DarkMediumText>
                <DarkText width="270px">{item?.ot_code}</DarkText>
              </RowBox>
            )}
          </Box>
          <Box mg="20px 0px 0px">
            <DarkBoldText>정비 자전거 정보</DarkBoldText>
            <BikeInformationHeader item={changeBikeItem} mg="10px 0px" />
            <BikeInformaitonBody bikeInfoDetail={changeBikeItem.detail} />
          </Box>
          {item?.ot_proc?.opt_img?.length > 0 && (
            <Box>
              <DarkBoldText>정비 사진</DarkBoldText>
              <Box height="10px" />
              <Photo imageArray={item?.ot_proc?.opt_img.map(v => ({uri: imageAddress + v}))} isView isTouch />
            </Box>
          )}
          {item?.ot_proc?.ot_note?.length > 0 && (
            <Box>
              <DarkBoldText>정비 노트</DarkBoldText>
              <Box height="10px" />
              <DarkText>{item?.ot_proc?.ot_note}</DarkText>
            </Box>
          )}
          {isCheckListShow && (
            <Box>
              <CheckList disabled checkList={checkList} isShow={isShow} setIsShow={setIsShow} />
            </Box>
          )}
          {item.ot_use_coupon !== '0' ? (
            <>
              <Box mg="10px 0px 0px" style={borderBottomWhiteGray}>
                <DarkBoldText>결제정보</DarkBoldText>

                <BetweenBox mg="10px 0px 0px" width={size.minusPadding}>
                  <DarkMediumText fontSize={Theme.fontSize.fs15}>결제 방식</DarkMediumText>
                  <RowBox alignItems="center">
                    <Badge badgeContent="쿠폰" />
                  </RowBox>
                </BetweenBox>
                <RowBox mg="10px 0px" width="380px" justifyContent="flex-end"></RowBox>
              </Box>
            </>
          ) : (
            <>
              <Box mg="10px 0px 0px" style={borderBottomWhiteGray}>
                <DarkBoldText>결제정보</DarkBoldText>
                <BetweenBox mg="10px 0px 0px" width={size.minusPadding}>
                  <DarkMediumText fontSize={Theme.fontSize.fs15}>가격</DarkMediumText>
                  <RowBox alignItems="center">
                    {changeItem.salePrice * 1 - changeItem.totalPrice * 1 > 0 && (
                      <MoneyText disabled money={changeItem?.salePrice} />
                    )}
                    <MoneyText
                      mg="0px 0px 0px 10px"
                      fontSize={Theme.fontSize.fs15}
                      fontWeight={Theme.fontWeight.bold}
                      color={Theme.color.black}
                      money={changeItem.totalPrice}
                    />
                  </RowBox>
                </BetweenBox>
                <BetweenBox mg="10px 0px 0px" width={size.minusPadding}>
                  <DarkMediumText fontSize={Theme.fontSize.fs15}>할인</DarkMediumText>
                  <RowBox alignItems="center">
                    <MoneyText
                      mg="0px 0px 0px 10px"
                      fontSize={Theme.fontSize.fs15}
                      color={Theme.color.black}
                      money={
                        +changeItem.salePrice - +changeItem.totalPrice > 0
                          ? (+changeItem.salePrice - +changeItem.totalPrice) * -1
                          : 0
                      }
                    />
                  </RowBox>
                </BetweenBox>
                <RowBox mg="10px 0px" width="380px" justifyContent="flex-end"></RowBox>
              </Box>
              <BetweenBox style={borderBottomWhiteGray} width="380px" height="55px" alignItems="center">
                <DarkBoldText fontSize={Theme.fontSize.fs15}>결제 금액</DarkBoldText>
                <MoneyText
                  money={changeItem.totalPrice}
                  color={Theme.color.black}
                  fontSize={Theme.fontSize.fs18}
                  fontWeight={Theme.fontWeight.bold}
                />
              </BetweenBox>
            </>
          )}

          <Box mg="20px 0px 0px">
            <DarkBoldText>고객정보</DarkBoldText>
            <Box width={size.minusPadding}>
              <RowBox mg="10px 0px 0px" alignItems="center">
                <DarkMediumText width="65px">이름</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{changeItem.customerName}</DarkText>
                <BorderButton
                  width={changeItem.customerLevel?.length === 4 ? '65px' : '38px'}
                  fontSize="13px"
                  borderColor={Theme.borderColor.whiteGray}
                  color={Theme.color.black}
                  borderRadius="3px">
                  {changeItem.customerLevel}
                </BorderButton>
              </RowBox>
              <RowBox mg="10px 0px 0px">
                <DarkMediumText width="65px">이메일</DarkMediumText>
                <DarkText mg="0px 10px 0px 0px">{changeItem.customerEmail}</DarkText>
              </RowBox>
              <RowBox mg="10px 0px 20px">
                <DarkMediumText width="65px">연락처</DarkMediumText>

                <DarkText mg="0px 10px 0px 0px">{changeItem.customerTel}</DarkText>
              </RowBox>
            </Box>
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}
