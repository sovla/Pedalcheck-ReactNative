import {Box, PositionBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import React, {useState} from 'react';
import ArrowLeft from '@assets/image/slide_l.png';
import ArrowRight from '@assets/image/slide_r.png';
import {useSelector} from 'react-redux';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {numberCheck} from '@/Page/Repair/RepairHome';
import scrollSlideNumber from '@/Util/scrollSlideNumber';

export default function Swiper({imageArray, width, height, borderRadius = 'Bottom'}) {
  const [imageNumber, setImageNumber] = useState(0);
  const onScrollSlide = e => {
    setImageNumber(scrollSlideNumber(e, size.screenWidth));
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
    <Box width={`${width}px`}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[
          borderRadiusStyle,
          {
            height: getHeightPixel(height),
            width: width,
          },
        ]}
        onMomentumScrollEnd={onScrollSlide}>
        {imageArray.map((item, index) => (
          <DefaultImage
            style={[
              borderRadiusStyle,
              {
                height: getHeightPixel(height),
                width: width,
              },
            ]}
            key={`image_${index}`}
            source={item}
            width={width}
            height={height}></DefaultImage>
        ))}
      </ScrollView>
      <PositionBox
        left="16px"
        bottom="16px"
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
          <DefaultText fontSize={Theme.fontSize.fs12} color={Theme.color.gray}>
            {' '}
            / {numberCheck(imageArray.length)}
          </DefaultText>
        </DefaultText>
        <DefaultImage source={ArrowRight} width="24px" height="24px" />
      </PositionBox>
    </Box>
  );
}

const styles = StyleSheet.create({
  swiper: {},
});
