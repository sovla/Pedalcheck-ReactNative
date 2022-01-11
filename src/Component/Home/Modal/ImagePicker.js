import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import Default1 from '@assets/image/default_1.png';
import Default2 from '@assets/image/default_2.png';
import Default3 from '@assets/image/default_3.png';
import Default4 from '@assets/image/default_4.png';
import {LinkWhiteButton} from '@/assets/global/Button';
import {TouchableOpacity} from 'react-native';
import {modalClose} from '@/Store/modalState';

export default function ImagePicker({setSelectImage, setImageType}) {
  const [selectNumber, setSelectNumber] = useState(0);
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();
  const imageWidth = `${(size.designWidth - 32 - 60) / 4}px`;

  const imageSelect = num => {
    setSelectNumber('file' + num + '.png');
  };

  return (
    <>
      <ModalTitleBox size={size} title="기본 이미지 선택" padding={32} />
      <RowBox style={{flexWrap: 'wrap'}} width={size.minusPadding} mg={'0px 0px 10px'}>
        <TouchableOpacity onPress={() => setSelectNumber(1)}>
          <DefaultImage
            source={Default1}
            width={imageWidth}
            height="80px"
            style={selectNumber === 1 && selectBorder}
          />
        </TouchableOpacity>
        <Box width="18px"></Box>
        <TouchableOpacity onPress={() => setSelectNumber(2)}>
          <DefaultImage
            source={Default2}
            width={imageWidth}
            height="80px"
            style={selectNumber === 2 && selectBorder}
          />
        </TouchableOpacity>
        <Box width="18px"></Box>
        <TouchableOpacity onPress={() => setSelectNumber(3)}>
          <DefaultImage
            source={Default3}
            width={imageWidth}
            height="80px"
            style={selectNumber === 3 && selectBorder}
          />
        </TouchableOpacity>
        <Box width="18px"></Box>
        <TouchableOpacity onPress={() => setSelectNumber(4)}>
          <DefaultImage
            source={Default4}
            width={imageWidth}
            height="80px"
            style={selectNumber === 4 && selectBorder}
          />
        </TouchableOpacity>
      </RowBox>
      <LinkWhiteButton
        content="확인"
        to={() => {
          setSelectImage(selectNumber);
          dispatch(modalClose());
        }}
      />
    </>
  );
}

const selectBorder = {
  borderWidth: 2,
  borderColor: '#005475',
  borderRadius: 15,
};
