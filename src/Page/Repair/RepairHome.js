import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, DefaultText, TitleText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {Dropdown} from 'react-native-element-dropdown';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import WhiteSpannerIcon from '@assets/image/menu01_top.png';
import {WhiteInput} from '@assets/global/Input';
import SearchIcon from '@assets/image/ic_search.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GradientHeader from '@/Component/Layout/GradientHeader';
import PlusIcon from '@assets/image/ic_plus.png';
import BorderBottomBox from '@/Component/Repair/BorderBottomBox';
import {BorderButton, DisabledBorderButton} from '@/assets/global/Button';
import ShopComponent from '@/Component/Repair/ShopComponent';
import ShopDummyImage from '@assets/image/shop_default.png';
import EmptyDot from '@assets/image/mainsld_b.png';
import BlackDot from '@assets/image/mainsld_on.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import pixelChange, {getPixel} from '@/Util/pixelChange';
import scrollSlideNumber from '@/Util/scrollSlideNumber';

export default function RepairHome() {
  const [selectItem, setSelectItem] = useState('전체보기');
  const [sortSelectItem, setSortSelectItem] = useState('인기순');
  const [tag, setTag] = useState([]);
  const [selectImage, setSelectImage] = useState(0);
  const {size} = useSelector(state => state);

  const tagList = ['픽업', '출장수리', '피팅전문', '카본수리', '중고거래', '광고'];
  const onPressTag = tagName => {
    // By.Junhan tag에 값이 없다면 넣어주고 있다면 제거
    if (tag.find(item => item === tagName)) {
      setTag(tag.filter(item => item !== tagName));
    } else {
      setTag(prev => [...prev, tagName]);
    }
  };
  const dummyImageArray = [ShopDummyImage, ShopDummyImage, ShopDummyImage];
  const onScrollSlide = e => {
    setSelectImage(scrollSlideNumber(e, size.screenWidth - 36));
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

  return (
    <Container>
      <ScrollView
        style={{
          height: size.screenHeight - 64,
          width: '100%',
        }}>
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
              height: 5,
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
          <RowBox alignItems="flex-start">
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.dropdownSelectItem}
                maxHeight={sortArray.length * 70}
                data={sortArray}
                labelField="label"
                valueField="value"
                containerStyle={styles.dropdownContainer}
                iconColor={Theme.color.gray}
                onChange={item => {
                  setSelectItem(item.value);
                }}
                value={selectItem}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.dropdownSelectItem}
                maxHeight={sortArray1.length * 70}
                data={sortArray1}
                labelField="label"
                valueField="value"
                onChange={item => {
                  setSortSelectItem(item.value);
                }}
                value={sortSelectItem}
              />
            </View>
            <Box justifyContent="center" height="40px" mg="0px 0px 0px 5px">
              <TouchableOpacity>
                <DarkText fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.midium}>
                  서울시 관악구
                </DarkText>
              </TouchableOpacity>
            </Box>
          </RowBox>
        </Box>
        <Box mg="20px 16px 0px">
          <RecommenderShop totalCount={dummyImageArray.length} count={selectImage + 1} />
          <ShopComponent
            shopTitle="인천신스"
            isPartner
            likeCount={1995}
            reviewCount={8491}
            repairCount={12765}
            tagList={['픽업', '피팅전문', '중고거래', '광고']}
          />
          <Box>
            <Box height="200px">
              <ScrollView horizontal pagingEnabled onMomentumScrollEnd={onScrollSlide}>
                {dummyImageArray.map((item, index) => (
                  <DefaultImage
                    key={`image_${index}`}
                    source={item}
                    width={size.minusPadding}
                    height="200px"></DefaultImage>
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
                    <DefaultImage key={item + index} source={BlackDot} width="15px" height="15px" />
                  ) : (
                    <DefaultImage key={item + index} source={EmptyDot} width="15px" height="15px" />
                  );
                })}
              </PositionBox>
            </Box>
          </Box>
          <ShopComponent
            shopTitle="인천신스"
            isPartner
            likeCount={1995}
            reviewCount={8491}
            repairCount={12765}
            tagList={['픽업', '피팅전문', '중고거래', '광고']}
          />
          <ShopComponent
            shopTitle="인천신스"
            isPartner
            likeCount={1995}
            reviewCount={8491}
            repairCount={12765}
            tagList={['픽업', '피팅전문', '중고거래', '광고']}
          />
          <ShopComponent
            shopTitle="인천신스"
            isPartner
            likeCount={1995}
            reviewCount={8491}
            repairCount={12765}
            tagList={['픽업', '피팅전문', '중고거래', '광고']}
          />
          <ShopComponent
            shopTitle="인천신스"
            isPartner
            likeCount={1995}
            reviewCount={8491}
            repairCount={12765}
            tagList={['픽업', '피팅전문', '중고거래', '광고']}
          />
        </Box>
      </ScrollView>
      <FooterButtons selectMenu={1} />
    </Container>
  );
}

const Event = () => {
  return (
    <BorderBottomBox
      title="EVENT"
      height="28px"
      titleColor={Theme.color.skyBlue}
      borderColor={Theme.color.skyBlue}>
      <DarkText numberOfLines={1} width="80%">
        2020.03.16 페달체크 인스타그램 4월
        #해시태그#해시태그#해시태그#해시태그#해시태그#해시태그#해시태그.
      </DarkText>
      <TouchableOpacity>
        <DefaultImage source={PlusIcon} width="12px" height="12px" style={{marginRight: 10}} />
      </TouchableOpacity>
    </BorderBottomBox>
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

const styles = StyleSheet.create({
  dropdown: {
    width: getPixel(100),
  },
  dropdownContainer: {
    height: 50,
  },
  dropdownSelectItem: {
    fontSize: getPixel(15),
    color: Theme.color.black,
    fontWeight: '600',
    letterSpacing: -0.45,
  },
});
