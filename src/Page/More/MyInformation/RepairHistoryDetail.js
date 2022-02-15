import {LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import {initCheckList} from '@/assets/global/dummy';
import {DarkBoldText, DarkMediumText, DarkText, IndigoText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Badge from '@/Component/BikeManagement/Badge';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import Photo from '@/Component/Repair/Photo';
import CheckList from '@/Component/ReservationManagement/CheckList';
import {modalOpen, modalOpenAndProp} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {cancelOrder, getRepairHistoryDetail} from '@/API/More/More';
import {useLayoutEffect} from 'react';
import {AlertButtons} from '@/Util/Alert';
import {showToastMessage} from '@/Util/Toast';
import {imageAddress} from '@assets/global/config';

/**
 * 2022-02-09 15:51:54
 * 현태
 * 정비이력 푸시 터치시 API수정
 *
 */
export default function RepairHistoryDetail({route: {params}}) {
  const {size, login} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = navigation.isFocused();

  const [isShow, setIsShow] = useState(false);
  const [repair, setRepair] = useState({});
  const [checkList, setCheckList] = useState(initCheckList);
  const [isCheckListShow, setIsCheckListShow] = useState(true);
  const onPressReservationCancle = async () => {
    if (repair?.ot_pay_type === 'vbank' && repair?.ot_pay_status !== 'ready') {
      dispatch(
        modalOpenAndProp({
          modalComponent: 'reservationCancle',
          ot_code: repair?.ot_code,
          cancelComplete: () => {
            navigation.goBack();
          },
        }),
      );
    } else {
      AlertButtons(
        '정비예약을 취소 하시겠습니까?',
        '확인',
        '취소',
        () => {
          cancelOrderApi();
        },
        () => {},
      );
    }
  };
  const onPressReview = () => {
    if (repair?.ot_review === 'N') {
      navigation.navigate('ReviewWrite', {
        navigate: 'RepairHistory',
        item: {
          title: repair?.mst_name,
          date: repair?.ot_pt_date,
          product: repair?.pt_title,
          price: repair?.ot_price,
          od_idx: params?.item?.od_idx ?? params?.od_idx,
          mst_idx: repair?.mst_idx,
        },
      });
    } else {
      showToastMessage('이미 작성된 주문건입니다.');
    }
  };
  const cancelOrderApi = async () => {
    const response = await cancelOrder({
      _mt_idx: login?.idx,
      ot_code: repair?.ot_code,
    });

    if (response?.data?.result === 'true') {
      showToastMessage('취소되었습니다.');
      navigation?.goBack();
    }
  };

  useLayoutEffect(() => {
    getRepairHistoryDetail({
      _mt_idx: login?.idx,
      od_idx: params?.item?.od_idx ?? params?.od_idx,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => {
        let notNullCount = 0;
        setRepair(data);
        setCheckList(prev =>
          prev.map((firstValue, firstIndex) => {
            let tmpValue = firstValue.item.map((secondValue, secondIndex) => {
              if (data[secondValue.indexName] === '1') {
                notNullCount++;
                return {...secondValue, select: '양호'};
              } else if (data[secondValue.indexName] === '2') {
                notNullCount++;
                return {...secondValue, select: '정비 요망'};
              } else {
                return {...secondValue};
              }
            });
            return {...firstValue, item: tmpValue};
          }),
        );
        if (notNullCount === 0) {
          setIsCheckListShow(false);
        } else {
          setIsCheckListShow(true);
        }
      });
  }, [isFocused]);
  return (
    <>
      <Header title="정비이력 상세" />
      <Container>
        {Object.keys(repair)?.length > 0 && (
          <>
            <ScrollBox flex={1}>
              <RepairHistoryDetailHeader
                status={repair?.ot_status}
                productName={[repair?.pt_title]}
                shopName={repair?.mst_name}
                rejectionReason={repair?.ot_cmemo ? repair?.ot_cmemo : ''}
                completeDate={repair?.ot_status === '처리완료' ? repair?.ot_cdate?.slice(0, 16) : ''}
                // 수정 필요
              />
              <Box height="20px" />
              {repair?.opt_img?.length > 0 && (
                <Box mg="0px 16px 20px">
                  <DarkBoldText>정비사진</DarkBoldText>
                  <Box height="10px" />
                  <Photo imageArray={repair?.opt_img.map(item => ({path: imageAddress + item}))} isView />
                </Box>
              )}
              {repair?.ot_note && (
                <Box mg="0px 16px 20px">
                  <DarkBoldText>정비노트</DarkBoldText>
                  <DarkText width={size.minusPadding} fontSize={Theme.fontSize.fs15}>
                    {repair?.ot_note}
                  </DarkText>
                </Box>
              )}
              {isCheckListShow && (
                <Box mg="0px 16px">
                  <CheckList disabled checkList={checkList} isShow={isShow} setIsShow={setIsShow} />
                </Box>
              )}
              <Box mg="0px 16px">
                <RowBox>
                  <DarkBoldText>정비요청 정보</DarkBoldText>
                </RowBox>
                <RowBox mg="10px 0px">
                  <DarkMediumText width="110px" fontSize={Theme.fontSize.fs15}>
                    정비 자전거
                  </DarkMediumText>
                  <DarkText style={{flex: 1}} fontSize={Theme.fontSize.fs15}>
                    {repair?.ot_bike_nick}
                  </DarkText>
                </RowBox>
                <RowBox>
                  <DarkMediumText width="110px" fontSize={Theme.fontSize.fs15}>
                    예약시간
                  </DarkMediumText>
                  <DarkText style={{flex: 1}} fontSize={Theme.fontSize.fs15}>
                    {repair?.ot_pt_date}&nbsp;{repair?.ot_pt_time?.slice(0, 5)}
                  </DarkText>
                </RowBox>

                {repair?.ot_memo && repair?.ot_memo !== '' ? (
                  <RowBox mg="10px 0px">
                    <DarkMediumText width="110px" fontSize={Theme.fontSize.fs15}>
                      요청사항
                    </DarkMediumText>
                    <DarkText style={{flex: 1}} fontSize={Theme.fontSize.fs15}>
                      {repair?.ot_memo}
                    </DarkText>
                  </RowBox>
                ) : (
                  <Box mg="10px 0px" />
                )}
              </Box>
              {(repair?.ot_return === 'A' || repair?.ot_return === 'R') && ( // 추가/반환 공임비 N:없음/A:추가공임비/R:반환공임비
                <Box mg="10px 16px 0px">
                  <RowBox>
                    <DarkBoldText>추가/반환 공임비</DarkBoldText>
                  </RowBox>
                  <BetweenBox mg="10px 0px" width={size.minusPadding}>
                    <DarkMediumText fontSize={Theme.fontSize.fs15}>
                      {repair?.ot_return === 'A' ? '추가' : '반환'} 공임비
                    </DarkMediumText>
                    <MoneyText
                      money={repair?.ot_return_price}
                      fontSize={Theme.fontSize.fs15}
                      color={Theme.color.black}
                    />
                  </BetweenBox>
                </Box>
              )}
              <Box mg="10px 16px 0px" style={borderBottomWhiteGray}>
                <RowBox>
                  <DarkBoldText>결제정보</DarkBoldText>
                </RowBox>
                <BetweenBox mg="10px 0px" width={size.minusPadding}>
                  <DarkMediumText fontSize={Theme.fontSize.fs15}>결제수단</DarkMediumText>
                  <DarkText fontSize={Theme.fontSize.fs15}>
                    {repair?.ot_pay_type === 'card'
                      ? '카드'
                      : repair?.ot_pay_type === 'trans'
                      ? '계좌이체'
                      : repair?.ot_pay_type === 'kakaopay'
                      ? '카카오 페이'
                      : repair?.ot_pay_type === 'vbank'
                      ? '무통장'
                      : '쿠폰 예약'}
                  </DarkText>
                </BetweenBox>
                {repair?.ot_use_coupon === '0' && (
                  <>
                    <BetweenBox width={size.minusPadding}>
                      <DarkMediumText fontSize={Theme.fontSize.fs15}>가격</DarkMediumText>
                      <MoneyText
                        money={repair?.ot_sprice}
                        fontSize={Theme.fontSize.fs15}
                        color={Theme.color.black}
                        fontWeight={Theme.fontWeight.bold}
                      />
                    </BetweenBox>
                    <BetweenBox width={size.minusPadding} mg="10px 0px 15px">
                      <DarkMediumText fontSize={Theme.fontSize.fs15}>할인</DarkMediumText>
                      <MoneyText
                        money={(+repair?.ot_sprice - repair?.ot_price) * -1}
                        fontSize={Theme.fontSize.fs15}
                        color={Theme.color.black}
                      />
                    </BetweenBox>
                  </>
                )}
              </Box>
              {repair?.ot_use_coupon === '0' && (
                <Box mg="0px 16px" style={borderBottomWhiteGray}>
                  <BetweenBox mg="20px 0px" width={size.minusPadding}>
                    <DarkBoldText>결제 금액</DarkBoldText>
                    <RowBox alignItems="center">
                      {repair?.ot_status !== '예약취소' && repair?.ot_status !== '환불' && (
                        <Badge badgeContent={payState(repair?.ot_pay_status)} />
                      )}
                      <MoneyText
                        mg="0px 0px 0px 10px"
                        fontSize={Theme.fontSize.fs18}
                        fontWeight={Theme.fontWeight.bold}
                        color={Theme.color.black}
                        money={repair?.ot_price}
                      />
                    </RowBox>
                  </BetweenBox>
                </Box>
              )}

              <RowBox mg="20px 16px">
                {/* <FooterButton
                  isRelative
                  leftContent="예약 취소"
                  rightContent="리뷰작성"
                  leftPress={onPressReservationCancle}
                  rightPress={onPressReview}
                /> */}
              </RowBox>
            </ScrollBox>

            <RowBox width="412px" pd="0px 16px 20px" justifyContent="flex-end">
              {(repair?.ot_status === '예약' || repair?.ot_status === '승인완료') && (
                <LinkWhiteButton width="185px" content="예약 취소" to={onPressReservationCancle} />
              )}

              {repair?.ot_status === '처리완료' && repair?.ot_review === 'N' ? (
                <LinkButton to={onPressReview} width="185px" content="리뷰작성" />
              ) : null}
            </RowBox>
          </>
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
  completeDate,
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
      {/* // 수정 필요 */}
      {rejectionReason !== '' && (
        <RowBox mg="0px 0px 10px">
          <DarkMediumText width="110px">승인취소 사유</DarkMediumText>
          <DarkText width="275px">{rejectionReason}</DarkText>
        </RowBox>
      )}
      {/* // 수정 필요 */}
      {completeDate !== '' && (
        <RowBox>
          <DarkMediumText width="110px">완료시간</DarkMediumText>
          <DarkText width="275px">{completeDate}</DarkText>
        </RowBox>
      )}
    </Box>
  );
};

export const payState = state => {
  //ready / paid / failed
  switch (state) {
    case 'ready':
      return '결제대기';
    case 'paid':
      return '결제완료';
    case 'failed':
      return '결제취소';
    case 'cancelled':
      return '환불완료';
    default:
      return '';
  }
};
