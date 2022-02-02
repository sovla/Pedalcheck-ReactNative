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

export default function BikeModel() {
  const {
    size,
    modal: {modalProp},
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const isProp = modalProp !== undefined; //

  const [bikeModel, setBikeModel] = useState([]);
  const [searchText, setSearchText] = useState('');

  const onPressBrand = item => {
    if (isProp) {
      dispatch(
        setModalProp({
          modalProp: modalProp + '  ' + item,
          isDone: true,
        }),
      );
      dispatch(modalClose());
    } else {
      dispatch(
        setModalProp({
          modalProp: item,
          isDone: false,
        }),
      );
      dispatch(modalOpen('bikeModelStepTwo'));
    }
  };

  useEffect(() => {
    getBikeModelHandle();
  }, [isProp]);

  const getBikeModelHandle = () => {
    getBikeModel({
      bt_step: 1,
      bt_brand: isProp ? modalProp : '',
      search_txt: searchText,
    }).then(res => setBikeModel(res?.data?.data?.data));
    setSearchText('');
  };

  return (
    <>
      <ModalTitleBox title="모델 검색"></ModalTitleBox>
      <Box>
        <Box width={`${size.designWidth - 32 - 40}px`}>
          {isProp && (
            <RowBox alignItems="center">
              <DefaultText color={Theme.color.skyBlue}>{modalProp}</DefaultText>
              <DefaultImage source={ArrowRightIcon} width="24px" height="24px" />
              <DarkText>모델 선택</DarkText>
            </RowBox>
          )}
          <DefaultInput
            title={isProp && '브랜드 선택'}
            placeHolder="브랜드명을 입력해주세요"
            width={`${size.designWidth - 32 - 40}px`}
            changeFn={item => setSearchText(item)}
            value={searchText}
          />
          <PositionBox right="15px" bottom="11px" backgroundColor="#0000">
            <TouchableOpacity onPress={() => getBikeModelHandle()}>
              <DefaultImage source={SearchIcon} width="21px" height="21px" />
            </TouchableOpacity>
          </PositionBox>
        </Box>
        <ScrollBox maxHeight="200px">
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
