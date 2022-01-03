import {BetweenBox, Box} from '@/assets/global/Container';
import {DarkBoldText, DarkText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import {useSelector} from 'react-redux';
import DefaultImage from '@/assets/global/Image';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {TouchableOpacity} from 'react-native';

export default function PostItem({item, index, selectPost, setSelectPost}) {
  const {size} = useSelector(state => state);
  const onPressPost = title => {
    if (selectPost.find(findItem => findItem === title)) {
      setSelectPost(selectPost.filter(filterItem => filterItem !== title));
    } else {
      setSelectPost(prev => [...prev, title]);
    }
  };

  const isSelect = selectPost.find(findItem => findItem === item.title);
  return (
    <Box key={index} alignItems="center" style={isSelect && borderBottomWhiteGray}>
      <TouchableOpacity onPress={() => onPressPost(item.title)}>
        <BetweenBox pd="16p 10px" width={size.minusPadding} style={borderBottomWhiteGray}>
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
      {isSelect && (
        <>
          {item.image && (
            <Box mg="15px 0px 0px">
              <DefaultImage
                style={{borderRadius: 15}}
                source={item.image}
                width="360px"
                height="150px"
              />
            </Box>
          )}

          <Box width="360px" mg="15px 0px 20px">
            <DarkText fontSize={Theme.fontSize.fs15}>{item.content}</DarkText>
          </Box>
        </>
      )}
    </Box>
  );
}