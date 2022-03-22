import {BetweenBox, Box} from '@/assets/global/Container';
import {DarkBoldText, DarkText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import {useSelector} from 'react-redux';
import DefaultImage from '@/assets/global/Image';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {TouchableOpacity} from 'react-native';
import {imageAddress} from '@assets/global/config';
import AutoHeightImage from 'react-native-auto-height-image';
import {getPixel} from '@/Util/pixelChange';

export default function PostItem({item, index, selectPost, setSelectPost, isImage = true}) {
  const {size} = useSelector(state => state);
  const isIdx = item?.idx !== undefined;
  const onPressPost = (idx, type) => {
    if (selectPost.find(findItem => findItem === idx)) {
      setSelectPost(selectPost.filter(filterItem => filterItem !== idx));
    } else {
      setSelectPost(prev => [...prev, idx]);
    }
  };
  const isSelect = selectPost.find(findItem => findItem === (isIdx ? item.idx : index + 1));
  return (
    <Box key={index} alignItems="center" style={isSelect && borderBottomWhiteGray}>
      <Box style={borderBottomWhiteGray}>
        <TouchableOpacity onPress={() => onPressPost(item?.idx ?? index + 1, item?.idx)}>
          <BetweenBox pd="16p 10px" width="380px">
            <Box>
              <DarkBoldText fontSize={Theme.fontSize.fs15}>{item.title}</DarkBoldText>
              <GrayText fontSize={Theme.fontSize.fs12}>{item.date}</GrayText>
            </Box>
            <DefaultImage
              style={
                !isSelect && {
                  transform: [{rotate: '180deg'}],
                }
              }
              source={ArrowUpIcon}
              width="24px"
              height="24px"
            />
          </BetweenBox>
        </TouchableOpacity>
      </Box>
      {isSelect && (
        <>
          {item?.image && isImage && (
            <Box mg="15px 0px 0px">
              <AutoHeightImage
                style={{borderRadius: 15}}
                source={{uri: imageAddress + item.image}}
                width={getPixel(380)}
              />
            </Box>
          )}

          <Box width="360px" mg="15px 0px 20px 10px">
            <DarkText fontSize={Theme.fontSize.fs15}>{item.content}</DarkText>
          </Box>
        </>
      )}
    </Box>
  );
}
