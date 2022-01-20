import {Box, PositionBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import React, {useState} from 'react';
import ArrowLeft from '@assets/image/slide_l.png';
import ArrowRight from '@assets/image/slide_r.png';
import {useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native';
import {numberCheck} from '@/Page/Repair/RepairHome';
import scrollSlideNumber from '@/Util/scrollSlideNumber';

export default function Swiper({imageArray, width, height, borderRadius = 'Bottom'}) {
  const transformWidth = typeof width === 'string' ? parseInt(width.split('px')[0]) : width;
  const transformHeight = typeof height === 'string' ? parseInt(height.split('px')[0]) : height;
  const [imageNumber, setImageNumber] = useState(0);
  const onScrollSlide = e => {
    setImageNumber(scrollSlideNumber(e, size.designWidth));
  };

  const {size} = useSelector(state => state);
  const borderRadiusStyle =
    borderRadius === 'Bottom'
      ? {
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }
      : {
          borderRadius: 10,
        };
  return (
    <Box
      width={`${transformWidth}px`}
      height={`${transformHeight}px`}
      style={{
        maxHeight: getPixel(transformHeight),
      }}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={imageArray}
        renderItem={({item, index}) => (
          <DefaultImage
            style={[borderRadiusStyle]}
            key={`image_${index}`}
            source={item}
            width={`${transformWidth}px`}
            height={`${transformHeight}px`}
            resizeMode="cover"
          />
        )}
        style={[
          borderRadiusStyle,
          {
            maxHeight: getPixel(transformHeight),
            width: getPixel(transformWidth),
          },
        ]}
        onMomentumScrollEnd={onScrollSlide}
      />
      <PositionBox
        left="16px"
        bottom="18px"
        width="128px"
        height="24px"
        borderRadius="50px"
        backgroundColor="rgba(33,33,33,0.6)"
        justifyContent="space-between"
        alignItems="center"
        style={{flexDirection: 'row'}}>
        <DefaultImage source={ArrowLeft} width="24px" height="24px" />
        <DefaultText fontSize={Theme.fontSize.fs12}>
          {numberCheck(imageNumber + 1)}{' '}
          <GrayText fontSize={Theme.fontSize.fs12}> / {numberCheck(imageArray?.length)}</GrayText>
        </DefaultText>
        <DefaultImage source={ArrowRight} width="24px" height="24px" />
      </PositionBox>
    </Box>
  );
}
