import {Box} from '@/assets/global/Container';
import {GrayText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React, {useState} from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import BikeNumberImage from '@assets/image/bike_image.png';
import {getPixel} from '@/Util/pixelChange';

export default function VehicleNumber() {
  const [height, setHeight] = useState(300);
  return (
    <>
      <ModalTitleBox title="차대번호" />
      <Box justifyContent="center" alignItems="center" height={`${height}px`}>
        <AutoHeightImage
          source={BikeNumberImage}
          width={getPixel(360)}
          onHeightChange={setHeight}
          style={{borderRadius: 10}}
        />
      </Box>
    </>
  );
}
