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
import {useRef} from 'react';
import {useEffect} from 'react';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
function SwiperComponent({imageArray, width, height, borderRadius = 'Bottom', isRolling}) {
  const ref = useRef(null);
  const savedCallback = useRef();
  const transformWidth = typeof width === 'string' ? parseInt(width.split('px')[0]) : width;
  const transformHeight = typeof height === 'string' ? parseInt(height.split('px')[0]) : height;
  const [imageNumber, setImageNumber] = useState(0);

  const [isEnd, setIsEnd] = useState(false);
  const imageLength = imageArray?.length;
  const callback = () => {
    if (imageLength - 1 > imageNumber) {
      if (isRolling)
        ref.current.scrollToIndex({
          index: imageNumber + 1,
        });
      setImageNumber(prev => prev + 1);
    } else {
      setIsEnd(true);
    }
  };

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

  useEffect(() => {
    savedCallback.current = callback;
    //  리액트 내에서 setInterval 할경우 setInterval 클로져가 imageNumber을 초기값 0 으로 기억하고 있는 문제가 발생해서
    //  Ref 를 통해 callback을 불러 값을 올려주고 그 값을 이용하도록 지정
  });
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    const timer = setInterval(tick, 2000);
    if (isEnd) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isEnd]);

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
        initialNumToRender={15}
        showsHorizontalScrollIndicator={false}
        data={imageArray}
        ref={ref}
        renderItem={({item, index}) => (
          <DefaultImage
            style={[borderRadiusStyle]}
            key={`image_${index}`}
            source={item}
            width={`${transformWidth}px`}
            height={`${transformHeight}px`}
            resizeMode="stretch"
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
const Swiper = React.memo(SwiperComponent);

export default Swiper;
