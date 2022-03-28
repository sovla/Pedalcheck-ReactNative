import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DarkText, IndigoText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SearchIcon from '@assets/image/ic_search.png';
import {DefaultInput} from '@/assets/global/Input';
import DefaultImage from '@/assets/global/Image';
import {getShopList} from '@/API/More/More';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Theme from '@/assets/global/Theme';

export default function SearchShop({setShopInfo}) {
  const {login} = useSelector(state => state);
  const dispatch = useDispatch();
  const [shop, setShop] = useState('');
  const [shopList, setShopList] = useState([]);
  const [text, setText] = useState('');

  const onPressSearch = () => {
    setText('');
    getShopList({mst_name: shop})
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => {
        if (data?.length) {
          setShopList(
            data.filter((value, index) => {
              return value.mst_idx !== login.idx;
            }),
          );
        } else {
          setText('해당 매장명을 가진 매장이 없습니다.');
          setShopList([]);
        }
      });
  };
  return (
    <>
      <ModalTitleBox title="매장 검색" />
      <Box width={`${412 - 32 - 40}px`}>
        <DefaultInput
          placeHolder="매장명을 입력해주세요."
          width={`${412 - 32 - 40}px`}
          changeFn={item => setShop(item)}
          value={shop}
          onSend={onPressSearch}
        />
        <PositionBox right="15px" bottom="11px" backgroundColor="#0000">
          <TouchableOpacity onPress={onPressSearch}>
            <DefaultImage source={SearchIcon} width="21px" height="21px" />
          </TouchableOpacity>
        </PositionBox>
      </Box>
      <Box height="200px">
        <Box width="340px" pd="0px 0px 0px 10px">
          <IndigoText fontSize={Theme.fontSize.fs13}>파트너 매장만 검색 가능합니다.</IndigoText>
        </Box>
        <ScrollBox keyboardShouldPersistTaps="handled">
          {shopList?.map((item, index) => (
            <TouchableOpacity
              onPress={async () => {
                await setShopInfo(item);
                await dispatch(modalClose());
              }}
              key={index}>
              <Box
                width="340px"
                height="35px"
                pd="0px 5px"
                backgroundColor="#0000"
                justifyContent="center"
                style={borderBottomWhiteGray}>
                <DarkText>{item.mst_name}</DarkText>
              </Box>
            </TouchableOpacity>
          ))}
          {text?.length > 0 && (
            <Box width="340px" height="150px" justifyContent="center" alignItems="center">
              <DarkText>{text}</DarkText>
            </Box>
          )}
        </ScrollBox>
      </Box>
    </>
  );
}
