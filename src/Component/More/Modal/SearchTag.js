import {BetweenBox, Box, PositionBox, ScrollBox} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import SearchIcon from '@assets/image/ic_search.png';
import {DefaultInput} from '@/assets/global/Input';
import DefaultImage from '@/assets/global/Image';
import {getTagList} from '@/API/More/More';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useEffect} from 'react';
import Theme from '@/assets/global/Theme';
import {BorderButton, LinkButton} from '@/assets/global/Button';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {useLayoutEffect} from 'react';
import {modalClose} from '@/Store/modalState';

export default function SearchTag({setShopInformation, shopInformation}) {
  const dispatch = useDispatch();
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [selectList, setSelectList] = useState(
    shopInformation?.mst_tag?.length
      ? shopInformation?.mst_tag?.split(', ')?.map(item => ({
          st_title: item,
        }))
      : [],
  );

  useEffect(() => {
    getTagList()
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => {
        setTagList(data);
      });
    if (shopInformation?.mst_tag) {
      setSelectList(shopInformation?.mst_tag?.split(', '));
    }
  }, []);

  useUpdateEffect(() => {
    setShopInformation(prev => ({...prev, mst_tag: selectList?.join(', ')}));
  }, [selectList]);

  const onPressSearch = () => {
    getTagList({
      search_txt: tag,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => {
        setTagList(data);
      });
  };

  let selectListCopy = selectList?.length > 0 ? selectList.concat() : [];
  return (
    <>
      <ModalTitleBox
        title="태그 검색"
        onclose={() => {
          setShopInformation(prev => ({...prev, mst_tag: selectList?.join(', ')}));
        }}
      />
      <Box width={`${412 - 32 - 40}px`}>
        <DefaultInput
          placeHolder="태그를 입력해주세요."
          width={`${412 - 32 - 40}px`}
          changeFn={item => setTag(item)}
          value={tag}
        />
        <PositionBox right="15px" bottom="11px" backgroundColor="#0000">
          <TouchableOpacity onPress={onPressSearch}>
            <DefaultImage source={SearchIcon} width="21px" height="21px" />
          </TouchableOpacity>
        </PositionBox>
      </Box>
      <Box height="200px" mg="5px 0px">
        <ScrollBox keyboardShouldPersistTaps="handled">
          {tagList?.map((item, index) => {
            const isSelect = selectListCopy?.find((findItem, findIndex) => {
              if (findItem === item.st_title) {
                selectListCopy.splice(findIndex, 1);
                return true;
              }
            });
            return (
              <TouchableOpacity
                onPress={() => {
                  if (!isSelect) {
                    setSelectList(prev => [...prev, item.st_title]);
                  } else {
                    setSelectList(prev => prev.filter(filterItem => filterItem !== item.st_title));
                  }
                }}
                key={index}>
                <BetweenBox
                  width="340px"
                  height="35px"
                  pd="0px 5px"
                  backgroundColor={Theme.color.white}
                  alignItems="center"
                  style={borderBottomWhiteGray}>
                  <DarkText>{item.st_title}</DarkText>

                  <BorderButton backgroundColor={isSelect && Theme.color.skyBlue} color={isSelect && Theme.color.white}>
                    선택
                  </BorderButton>
                </BetweenBox>
              </TouchableOpacity>
            );
          })}
        </ScrollBox>
      </Box>
      <LinkButton
        to={() => {
          dispatch(modalClose());
        }}
        content="확인"
        width="350px"
      />
    </>
  );
}
