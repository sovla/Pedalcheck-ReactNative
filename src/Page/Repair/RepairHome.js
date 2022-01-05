import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkMediumText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {Dropdown} from 'react-native-element-dropdown';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WhiteSpannerIcon from '@assets/image/menu01_top.png';
import {WhiteInput} from '@assets/global/Input';
import SearchIcon from '@assets/image/ic_search.png';
import GradientHeader from '@/Component/Layout/GradientHeader';
import PlusIcon from '@assets/image/ic_plus.png';
import BorderBottomBox from '@/Component/Repair/BorderBottomBox';
import {BorderButton, DisabledBorderButton} from '@/assets/global/Button';
import ShopComponent from '@/Component/Repair/ShopComponent';
import ShopDummyImage from '@assets/image/shop_default.png';
import EmptyDot from '@assets/image/mainsld_b.png';
import BlackDot from '@assets/image/mainsld_on.png';
import LocationIcon from '@assets/image/ic_location.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {getPixel} from '@/Util/pixelChange';
import scrollSlideNumber from '@/Util/scrollSlideNumber';
import {useEffect} from 'react';
import {getShopList, shopLike} from '@/API/Shop/Shop';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import {modalOpen} from '@/Store/modalState';
import {DeleteLocation} from '@/Store/locationState';
import {getEventList} from '@/API/Repair/Repair';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {is} from 'immer/dist/internal';

export default function RepairHome() {
  const {location} = useSelector(state => state);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [selectItem, setSelectItem] = useState('전체보기');
  const [sortSelectItem, setSortSelectItem] = useState('인기순');

  const [apiPage, setApiPage] = useState(1); // API Page
  const [selectImage, setSelectImage] = useState(0);
  const {size, login} = useSelector(state => state);
  const [tag, setTag] = useState([]);
  const [innerLocation, setInnerLocation] = useState('부산 금정구');
  const [storeList, setStoreList] = useState([]);

  const [isScroll, setIsScroll] = useState(false);

  const onPressTag = tagName => {
    // By.Junhan tag에 값이 없다면 넣어주고 있다면 제거
    if (tag.find(item => item === tagName)) {
      setTag(tag.filter(item => item !== tagName));
    } else {
      setTag(prev => [...prev, tagName]);
    }
  };

  const onScrollSlide = e => {
    setSelectImage(scrollSlideNumber(e, size.designWidth - 36));
  };

  useEffect(() => {
    if (isFocused && !storeList?.length)
      getShopList({
        _mt_idx: login.idx,
        page: apiPage,
        mst_addr: '', // 위치로 검색
        mst_name: '', // 검색하는 경우 추가
        mst_tag: tag.length > 0 ? tag?.reduce((a, b) => a + ',' + b) : '', // , 콤마 더해서 값 보내기
        mst_type: selectItem === '전체보기' ? '' : '1',
        sorting: sortSelectItem === '정비횟수순' ? 2 : sortSelectItem === '거리순' ? 3 : 1, // 인기순 1 거리순 2 정비횟수순 3
      }).then(res => setStoreList(res.data.data.data.store_list));
  }, [isFocused]);

  useEffect(() => {
    if (location?.name) {
      setInnerLocation(location.name);
    }
  }, [location]);

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <Header
            size={size}
            tag={tag}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
            sortSelectItem={sortSelectItem}
            setSortSelectItem={setSortSelectItem}
            innerLocation={innerLocation}
            selectImage={selectImage}
            onScrollSlide={onScrollSlide}
            onPressTag={onPressTag}
            dispatch={dispatch}
          />
        }
        data={storeList}
        renderItem={({item, index}) => (
          <Box width="380px" mg="0px 16px">
            <ShopComponent
              mg="0px"
              pd="14px 10px"
              item={item}
              shopTitle={item?.mst_name}
              isPartner={item?.mst_type === '1'}
              likeCount={item?.mst_likes ?? 0}
              reviewCount={item?.mst_reviews ?? 0}
              repairCount={item?.mst_orders ?? 0}
              tagList={item.mst_tag.split(',')}
              isImage
            />
          </Box>
        )}
        style={{
          marginBottom: 20,
        }}
      />
      <FooterButtons selectMenu={1} />
    </Container>
  );
}
const Header = ({
  size,
  tag,
  selectItem,
  setSelectItem,
  sortSelectItem,
  setSortSelectItem,
  innerLocation,
  selectImage,
  onScrollSlide,
  onPressTag,
  dispatch,
}) => {
  return (
    <>
      <GradientHeader title="정비소" imageSource={WhiteSpannerIcon}>
        <Box backgroundColor="rgba(0,0,0,0)" mg="20px 0px 0px">
          <WhiteInput
            height="43px"
            width={size.minusPadding}
            placeholder="매장명을 입력해주세요."></WhiteInput>
          <PositionBox top="11px" right="15px">
            <TouchableOpacity>
              <DefaultImage source={SearchIcon} width="21px" height="21px"></DefaultImage>
            </TouchableOpacity>
          </PositionBox>
        </Box>
      </GradientHeader>
      <Box
        pd="20px 16px 0px"
        height="auto"
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <Event />
        <Box height="40px">
          <ScrollView horizontal style={{marginTop: 10}}>
            {tagList.map(item => (
              <TagButton
                key={`tag_${item}`}
                text={item}
                isSelect={tag.find(findItem => item === findItem)}
                setSelect={() => onPressTag(item)}></TagButton>
            ))}
          </ScrollView>
        </Box>
        <RowBox height="50px" alignItems="center">
          <Box>
            <DefaultDropdown
              data={sortArray}
              value={selectItem}
              setValue={setSelectItem}
              isBorder={false}
              width={selectItem.length * 12 + 40}
              pdLeft={0}
              fontType="Medium"
            />
          </Box>
          <Box mg="0px 0px 0px 5px">
            <DefaultDropdown
              data={sortArray1}
              labelField="label"
              valueField="value"
              width={sortSelectItem.length * 17 + 25}
              isBorder={false}
              setValue={setSortSelectItem}
              value={sortSelectItem}
              pdLeft={0}
              fontType="Medium"
            />
          </Box>
          <TouchableOpacity
            onPress={() => {
              dispatch(modalOpen('locationPicker'));
            }}>
            <RowBox height="100%" alignItems="center" mg="0px 0px 0px 5px">
              <DarkMediumText fontSize={Theme.fontSize.fs15}>{innerLocation}</DarkMediumText>
              <DefaultImage width="24px" height="24px" source={LocationIcon} />
            </RowBox>
          </TouchableOpacity>
        </RowBox>
      </Box>
      <Box mg="20px 16px 0px">
        <RecommenderShop totalCount={dummyImageArray.length} count={selectImage + 1} />
        <Box width="380px">
          <ShopComponent
            mg="0px"
            pd="14px 10px"
            shopTitle="인천신스"
            isPartner
            isImage
            likeCount={1995}
            reviewCount={8491}
            repairCount={12765}
            tagList={['픽업', '피팅전문', '중고거래', '광고']}
          />
        </Box>
        <Box>
          <Box height="200px">
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onScrollSlide}>
              {dummyImageArray.map((item, index) => (
                <DefaultImage
                  key={`image_${index}`}
                  resizeMode="stretch"
                  source={item}
                  width={size.minusPadding}
                />
              ))}
            </ScrollView>
            <PositionBox
              style={{flexDirection: 'row'}}
              right="20px"
              top="20px"
              backgroundColor="rgba(0,0,0,0)">
              {dummyImageArray.map((item, index) => {
                const isEqual = selectImage === index;
                return isEqual ? (
                  <DefaultImage
                    key={index + 'images'}
                    source={BlackDot}
                    width="15px"
                    height="15px"
                  />
                ) : (
                  <DefaultImage
                    key={index + 'images'}
                    source={EmptyDot}
                    width="15px"
                    height="15px"
                  />
                );
              })}
            </PositionBox>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const Event = () => {
  const [eventList, setEventList] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused && !eventList?.length) {
      getEventList({
        view_mode: 'main',
        board: 'event',
      })
        .then(res => res.data.result === 'true' && res.data.data.data)
        .then(data => setEventList(data?.board));
    }
  }, [isFocused]);
  return (
    <>
      <BorderBottomBox
        title="EVENT"
        height="28px"
        titleColor={Theme.color.skyBlue}
        borderColor={Theme.color.skyBlue}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {eventList.map((item, index) => (
            <TouchableOpacity
              key={index + 'Event'}
              onPress={() => navigation.navigate('Post', {...item, select: '이벤트'})}>
              <DarkText numberOfLines={1} style={{width: getPixel(272)}}>
                {item?.bt_title}
              </DarkText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('Post', {select: '이벤트'})}>
          <DefaultImage
            source={PlusIcon}
            width="12px"
            height="12px"
            style={{marginRight: getPixel(10)}}
          />
        </TouchableOpacity>
      </BorderBottomBox>
    </>
  );
};

const TagButton = ({isSelect, text, setSelect}) => {
  return (
    <TouchableOpacity onPress={setSelect}>
      <Box mg="0px 5px 0px 0px">
        {isSelect ? (
          <BorderButton width="auto">#{text}</BorderButton>
        ) : (
          <DisabledBorderButton width="auto">#{text}</DisabledBorderButton>
        )}
      </Box>
    </TouchableOpacity>
  );
};
export const numberCheck = number => {
  if (number < 10) {
    return '0' + number;
  } else {
    return '' + number;
  }
};
const RecommenderShop = ({totalCount, count}) => {
  const totalCountText = numberCheck(totalCount);
  const countText = numberCheck(count);
  return (
    <BorderBottomBox
      fontSize={Theme.fontSize.fs18}
      title="추천 매장"
      height="32px"
      leftWidth={25}
      titleColor={Theme.color.indigo}
      borderColor={Theme.color.indigo}>
      <PositionBox right="10px">
        <DarkText>
          <DarkText fontWeight={Theme.fontWeight.bold}>{countText}</DarkText> / {totalCountText}
        </DarkText>
      </PositionBox>
    </BorderBottomBox>
  );
};

const sortArray = [
  {
    label: '전체보기',
    value: '전체보기',
  },
  {
    label: '파트너 매장',
    value: '파트너 매장',
  },
];
const sortArray1 = [
  {
    label: '인기순',
    value: '인기순',
  },
  {
    label: '정비횟수순',
    value: '정비횟수순',
  },
  {
    label: '거리순',
    value: '거리순',
  },
];
const tagList = ['픽업', '출장수리', '피팅전문', '카본수리', '중고거래', '광고'];
const dummyImageArray = [ShopDummyImage, ShopDummyImage, ShopDummyImage];
