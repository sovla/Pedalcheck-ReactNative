import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DefaultImage from '@assets/global/Image';
import SearchIcon from '@assets/image/ic_search.png';
import Theme from '@/assets/global/Theme';
import {DarkText, DefaultText} from '@/assets/global/Text';
import {modalClose, modalOpen, setModalProp} from '@/Store/modalState';
import ArrowRightIcon from '@assets/image/arr_right.png';
import {useEffect} from 'react';
import {useState} from 'react';
import {getBikeModel} from '@/API/Bike/Bike';
import Loading from '@/Component/Layout/Loading';

export default function BikeModel() {
  const {modal} = useSelector(state => state);
  const dispatch = useDispatch();

  const [bikeModel, setBikeModel] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onPressBrand = async item => {
    modal.modalProp.setBikeInfo(modal?.modalProp.brand + '\t\t' + item);
    dispatch(modalClose());
  };

  useEffect(() => {
    getBikeModelHandle();
  }, []);

  const getBikeModelHandle = () => {
    setIsLoading(true);
    getBikeModel({
      bt_step: 2,
      bt_brand: modal?.modalProp?.brand ?? '',
      search_txt: searchText,
    }).then(res => setBikeModel(res?.data?.data?.data));
    setSearchText('');
    setIsLoading(false);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <ModalTitleBox title="모델 검색"></ModalTitleBox>
      <Box>
        <Box width={`${412 - 32 - 40}px`}>
          {modal?.modalProp?.brand !== '' && modal?.modalProp?.brand !== undefined && (
            <RowBox alignItems="center">
              <DefaultText color={Theme.color.skyBlue}>{modal.modalProp.brand}</DefaultText>
              <DefaultImage source={ArrowRightIcon} width="24px" height="24px" />
              <DarkText>모델 선택</DarkText>
            </RowBox>
          )}
          <DefaultInput
            title={modal?.modalProp?.brand}
            placeHolder="모델명을 입력해주세요"
            width={`${412 - 32 - 40}px`}
            changeFn={item => setSearchText(item)}
            value={searchText}
          />
          <PositionBox right="15px" bottom="11px" backgroundColor="#0000">
            <TouchableOpacity onPress={() => getBikeModelHandle()}>
              <DefaultImage source={SearchIcon} width="21px" height="21px" />
            </TouchableOpacity>
          </PositionBox>
        </Box>
        <ScrollBox maxHeight="200px" keyboardShouldPersistTaps="handled">
          {bikeModel?.map((item, index) => (
            <TouchableOpacity onPress={() => onPressBrand(item.bt_model)} key={item.bt_model + index}>
              <Box
                width="340px"
                height="35px"
                pd="0px 5px"
                backgroundColor="#0000"
                justifyContent="center"
                style={{borderBottomWidth: 1, borderBottomColor: Theme.borderColor.whiteGray}}>
                <DarkText>{item.bt_model}</DarkText>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollBox>
      </Box>
    </>
  );
}
