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
import {modalClose, modalOpen, modalOpenAndProp, setModalProp} from '@/Store/modalState';
import ArrowRightIcon from '@assets/image/arr_right.png';
import {useEffect} from 'react';
import {useState} from 'react';
import {getBikeModel} from '@/API/Bike/Bike';
import Loading from '@/Component/Layout/Loading';

export default function BikeBrand() {
  const {modal} = useSelector(state => state);
  const dispatch = useDispatch();

  const [bikeModel, setBikeModel] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onPressBrand = item => {
    dispatch(
      modalOpenAndProp({
        modalComponent: 'bikeModelStepTwo',
        setBikeInfo: modal?.modalProp?.setBikeInfo,
        brand: item,
      }),
    );
  };

  useEffect(() => {
    getBikeModelHandle();
  }, []);

  const getBikeModelHandle = () => {
    setIsLoading(true);
    getBikeModel({
      bt_step: 1,
      bt_brand: '',
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
      <ModalTitleBox title="브랜드 검색"></ModalTitleBox>
      <Box>
        <Box width={`${412 - 32 - 40}px`}>
          <DefaultInput
            title={'브랜드 선택'}
            placeHolder="브랜드명을 입력해주세요"
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
            <TouchableOpacity onPress={() => onPressBrand(item.bt_brand)} key={item.bt_brand + index}>
              <Box
                width="340px"
                height="35px"
                pd="0px 5px"
                backgroundColor="#0000"
                justifyContent="center"
                style={{borderBottomWidth: 1, borderBottomColor: Theme.borderColor.whiteGray}}>
                <DarkText>{item.bt_brand}</DarkText>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollBox>
      </Box>
    </>
  );
}
