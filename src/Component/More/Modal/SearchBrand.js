import {BetweenBox, Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import SearchIcon from '@assets/image/ic_search.png';
import {DefaultInput} from '@/assets/global/Input';
import DefaultImage from '@/assets/global/Image';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {getBikeModel} from '@/API/Bike/Bike';
import {useEffect} from 'react';
import Theme from '@/assets/global/Theme';
import {BorderButton, Button, DisabledBorderButton, FooterButton, LinkButton} from '@/assets/global/Button';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {useDispatch} from 'react-redux';

export default function SearchBrand({setShopInformation, shopInformation}) {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [brandList, setBrandList] = useState([]);
  const [selectList, setSelectList] = useState(
    shopInformation?.mst_brand?.length ? shopInformation?.mst_brand?.split(',') : [],
  );
  useEffect(() => {
    getBikeModel({bt_step: 1})
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => {
        setBrandList(data);
      });
    if (shopInformation?.mst_brand) {
      setSelectList(shopInformation?.mst_brand?.split(','));
    }
  }, []);

  useUpdateEffect(() => {
    setShopInformation(prev => ({...prev, mst_brand: selectList?.join(',')}));
  }, [selectList]);

  const onPressSearch = () => {
    getBikeModel({search_txt: brand, bt_step: 1})
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => setBrandList(data));
  };
  let selectListCopy = selectList?.length > 0 ? selectList.concat() : [];
  return (
    <>
      <ModalTitleBox title="브랜드 검색" />
      <Box width={`${412 - 32 - 40}px`}>
        <DefaultInput
          placeHolder="브랜드을 입력해주세요."
          width={`${412 - 32 - 40}px`}
          changeFn={item => setBrand(item)}
          value={brand}
        />
        <PositionBox right="15px" bottom="11px" backgroundColor="#0000">
          <TouchableOpacity onPress={onPressSearch}>
            <DefaultImage source={SearchIcon} width="21px" height="21px" />
          </TouchableOpacity>
        </PositionBox>
      </Box>
      <Box height="250px" mg="5px 0px">
        <ScrollBox keyboardShouldPersistTaps="handled">
          {brandList?.map((item, index) => {
            const isSelect = selectListCopy?.find((findItem, findIndex) => {
              if (findItem === item.bt_brand) {
                selectListCopy.splice(findIndex, 1);
                return true;
              }
            });
            return (
              <TouchableOpacity
                onPress={async () => {
                  if (!isSelect) {
                    setSelectList(prev => {
                      return [...prev, item.bt_brand];
                    });
                  } else {
                    setSelectList(prev => prev.filter(filterItem => filterItem !== item.bt_brand));
                  }
                }}
                key={index}>
                <BetweenBox
                  width="340px"
                  height="35px"
                  pd="0px 5px"
                  backgroundColor={Theme.color.white}
                  alignItems="center"
                  style={borderBottomWhiteGray}>
                  <DarkText>{item.bt_brand}</DarkText>

                  <BorderButton backgroundColor={isSelect && Theme.color.skyBlue} color={isSelect && Theme.color.white}>
                    선택
                  </BorderButton>
                </BetweenBox>
              </TouchableOpacity>
            );
          })}
        </ScrollBox>
      </Box>
      <LinkButton
        to={() => {
          dispatch(modalClose());
        }}
        content="확인"
        width="350px"
      />
    </>
  );
}
