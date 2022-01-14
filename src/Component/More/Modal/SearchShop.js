import {FooterButton} from '@/assets/global/Button';
import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import FooterButtons from '@/Component/Layout/FooterButtons';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import SearchIcon from '@assets/image/ic_search.png';
import {DefaultInput} from '@/assets/global/Input';
import DefaultImage from '@/assets/global/Image';
import {getShopList} from '@/API/More/More';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

export default function SearchShop({setShopInfo}) {
  const dispatch = useDispatch();
  const [shop, setShop] = useState('');
  const [shopList, setShopList] = useState([]);

  const onPressSearch = () => {
    getShopList({mst_name: shop})
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => setShopList(data));
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
        />
        <PositionBox right="15px" bottom="11px" backgroundColor="#0000">
          <TouchableOpacity onPress={onPressSearch}>
            <DefaultImage source={SearchIcon} width="21px" height="21px" />
          </TouchableOpacity>
        </PositionBox>
      </Box>
      <Box height="200px">
        <ScrollBox>
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
        </ScrollBox>
      </Box>
    </>
  );
}
