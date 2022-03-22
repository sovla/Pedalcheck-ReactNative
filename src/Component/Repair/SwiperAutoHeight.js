import {Box, PositionBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import React, {useState} from 'react';
import ArrowLeft from '@assets/image/slide_l.png';
import ArrowRight from '@assets/image/slide_r.png';
import ArrowLeftDisabled from '@assets/image/slide_l_d.png';
import ArrowRightDisable from '@assets/image/slide_r_d.png';
import {useSelector} from 'react-redux';
import {Dimensions, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {numberCheck} from '@/Page/Repair/RepairHome';
import scrollSlideNumber from '@/Util/scrollSlideNumber';
import {useRef} from 'react';
import {useEffect} from 'react';
import AutoHeightImage from 'react-native-auto-height-image';

function SwiperComponent({imageArray, width, height, borderRadius = 'Bottom', isRolling = false}) {
  const ref = useRef(null);
  const savedCallback = useRef();
  const transformWidth = typeof width === 'string' ? parseInt(width.split('px')[0]) : width;
  const transformHeight = typeof height === 'string' ? parseInt(height.split('px')[0]) : height;
  const [imageNumber, setImageNumber] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const onScrollSlide = e => {
    if (typeof width === 'string') {
      setImageNumber(scrollSlideNumber(e, +width.split('px')[0]));
    } else {
      setImageNumber(scrollSlideNumber(e, width));
    }
  };

  const onPressArrow = type => {
    if (type === 'prev' && imageNumber > 0) {
      setImageNumber(prev => prev - 1);
      ref.current.scrollToIndex({
        index: imageNumber - 1,
      });
    } else if (type === 'next' && imageLength - 1 > imageNumber) {
      setImageNumber(prev => prev + 1);
      ref.current.scrollToIndex({
        index: imageNumber + 1,
      });
    }
  };

  const borderRadiusStyle =
    borderRadius === 'Bottom'
      ? {
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }
      : {
          borderRadius: 10,
        };

  const imageLength = imageArray?.length;
  const callback = () => {
    if (imageLength - 1 > imageNumber) {
      if (isRolling) {
        ref.current.scrollToIndex({
          index: imageNumber + 1,
        });
      }

      setImageNumber(prev => prev + 1);
    } else {
      setIsEnd(true);
    }
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
    const timer = setInterval(tick, 3000);
    if (isEnd || !isRolling) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isEnd]);
  if (imageArray?.length < 1) {
    return null;
  }

  return (
    <Box flex={1}>
      <FlatList
        horizontal
        pagingEnabled
        initialNumToRender={15}
        showsHorizontalScrollIndicator={false}
        data={imageArray}
        ref={ref}
        renderItem={({item, index}) => (
          <AutoHeightImage style={borderRadiusStyle} key={`image_${index}`} source={item} width={transformWidth} />
        )}
        style={[
          borderRadiusStyle,
          {
            flex: 1,
          },
        ]}
        onMomentumScrollEnd={onScrollSlide}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            ref.current?.scrollToIndex({index: info.index, animated: true});
          });
        }}
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
        <TouchableOpacity
          disabled={imageNumber === 0}
          onPress={() => {
            onPressArrow('prev');
          }}>
          <DefaultImage source={imageNumber === 0 ? ArrowLeftDisabled : ArrowLeft} width="24px" height="24px" />
        </TouchableOpacity>
        <DefaultText fontSize={Theme.fontSize.fs12}>
          {numberCheck(imageNumber + 1)}{' '}
          <GrayText fontSize={Theme.fontSize.fs12}> / {numberCheck(imageArray?.length)}</GrayText>
        </DefaultText>
        <TouchableOpacity
          disabled={imageLength - 1 === imageNumber}
          onPress={() => {
            onPressArrow('next');
          }}>
          <DefaultImage
            source={imageLength - 1 === imageNumber ? ArrowRightDisable : ArrowRight}
            width="24px"
            height="24px"
          />
        </TouchableOpacity>
      </PositionBox>
    </Box>
  );
}
const SwiperAutoHeight = React.memo(SwiperComponent);

export default SwiperAutoHeight;
