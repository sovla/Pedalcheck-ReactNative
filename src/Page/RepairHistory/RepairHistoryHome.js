import {
  BetweenBox,
  Box,
  Container,
  PositionBox,
  RowBox,
  ScrollBox,
} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import React from 'react';
import {useState} from 'react';
import NoticeWhiteIcon from '@assets/image/notice_white.png';
import ArrowLeftIcon from '@assets/image/arr_left.png';
import ArrowRightIcon from '@assets/image/arr_right.png';
import DefaultImage from '@/assets/global/Image';
import {
  DarkBoldText,
  DarkMediumText,
  DarkText,
  GrayText,
  IndigoText,
  MoneyText,
} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {TouchableOpacity} from 'react-native';
import ReservationStats from '@/Component/RepairHistory/ReservationStats';
import numberFormat from '@/Util/numberFormat';
import {BorderButton, LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import FooterButtons from '@/Component/Layout/FooterButtons';
import CalculateStats from '@/Component/RepairHistory/CalculateStats';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import DummyChart from '@assets/image/chart.png';
import CustomerHeartIcon from '@assets/image/ic_heartuser.png';
import CustomerIcon from '@assets/image/ic_user.png';
import SpannerIcon from '@assets/image/menu01_on.png';
import LikeIcon from '@assets/image/good_b.png';
import ShopCustomerStats from '@/Component/RepairHistory/ShopCustomerStats';
import {bikeStats} from '@/assets/global/dummy';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import ItemStats from '@/Component/RepairHistory/ItemStats';
import {useDispatch} from 'react-redux';
import {modalOpen} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/native';
import {DefaultInput} from '@/assets/global/Input';
import SearchIcon from '@assets/image/ic_search.png';
import DummyIcon from '@assets/image/dummy.png';
import ProductPost from '@/Component/MyShop/ProductPost';
import ProductDetail from '../Repair/ProductDetail';
import ProductsShow from '@/Component/Repair/ProductsShow';
import RepairProduct from '@/Component/ReservationManagement/RepairProduct';
import ProductCheckBox from '@/Component/ReservationManagement/ProductCheckBox';
import Review from '@/Component/Repair/Review';
import {questionList} from '../More/Question';
import QuestionItem from '@/Component/More/QuestionItem';

export default function RepairHistoryHome() {
  const [select, setSelect] = useState('홈');
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState('지난 6개월');
  const [questionSelect, setQuestionSelect] = useState([]);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onPressItem = title => {
    if (questionSelect.find(findItem => findItem === title)) {
      setQuestionSelect(prev => prev.filter(filterItem => filterItem !== title));
    } else {
      setQuestionSelect(prev => [...prev, title]);
    }
  };

  const onPressProduct = () => {
    navigation.navigate('Detail');
  };
  return (
    <Container>
      <ScrollBox>
        <GradientHeader
          title="예약관리"
          imageSource={NoticeWhiteIcon}
          imageSize={{
            width: '35px',
            height: '29px',
          }}
          onPressImage={() => dispatch(modalOpen('fullSize/notice'))}>
          <HeaderButton
            select={select}
            setSelect={setSelect}
            width="185px"
            menuList={['홈', '정비이력', '리뷰', '1:1문의']}
          />
        </GradientHeader>
        {select === '홈' && (
          <Box pd="0px 16px" backgroundColor="#F8F8F8">
            <BetweenBox backgroundColor="#0000" mg="20px 0px" width="380px" alignItems="center">
              <TouchableOpacity
                onPress={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>
                <DefaultImage source={ArrowLeftIcon} width="24px" height="24px" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(modalOpen('slide/repairDatePicker'))}>
                <DarkBoldText fontSize={Theme.fontSize.fs18}>
                  {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
                </DarkBoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>
                <DefaultImage source={ArrowRightIcon} width="24px" height="24px" />
              </TouchableOpacity>
            </BetweenBox>
            <ReservationStats />
            <CalculateStats />
            <Box width="380px" pd="10px 16px 20px" borderRadius="10px" mg="26px 0px 0px">
              <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
                <DarkBoldText fontSize={Theme.fontSize.fs15}>정비 통계 그래프</DarkBoldText>
                <Box>
                  <DefaultDropdown
                    width={100}
                    height={40}
                    pdLeft={0}
                    data={dateDummyList}
                    value={selectDate}
                    setValue={setSelectDate}
                    isBorder={false}
                  />
                </Box>
              </BetweenBox>
              <DefaultImage width="348px" height="220px" source={DummyChart} resizeMode="contain" />
            </Box>
            <ShopCustomerStats />
            <ItemStats onPressMore={() => navigation.navigate('BikeStats')} />
            <ItemStats title="자전거 종류별 통계" />
            <ItemStats title="브랜드별 통계" />
          </Box>
        )}
        {select === '정비이력' && (
          <Box pd="0px 16px">
            <BetweenBox
              width="380px"
              pd="16px"
              mg="20px 0px"
              backgroundColor={Theme.color.backgroundBlue}
              borderRadius="10px"
              alignItems="center">
              <RowBox backgroundColor="#0000" alignItems="center">
                <DefaultImage source={SpannerIcon} width="24px" height="24px" />
                <DarkBoldText mg="0px 0px 0px 5px">누적장비</DarkBoldText>
              </RowBox>
              <RowBox backgroundColor="#0000" alignItems="center">
                <IndigoText fontWeight={Theme.fontWeight.bold}>12,345</IndigoText>
                <IndigoText fontWeight={Theme.fontWeight.bold}>건</IndigoText>
              </RowBox>
            </BetweenBox>
            <RowBox alignItems="center">
              <BorderButton
                width="135px"
                height="36px"
                borderColor={Theme.borderColor.gray}
                color={Theme.color.black}>
                2021-10-14(미완)
              </BorderButton>
              <DarkText mg="0px 6.5px">~</DarkText>
              <BorderButton
                width="135px"
                height="36px"
                borderColor={Theme.borderColor.gray}
                color={Theme.color.black}>
                2021-10-14(미완)
              </BorderButton>
              <Box mg="0px 0px 0px 10px">
                <BorderButton width="78px" height="36px">
                  조회
                </BorderButton>
              </Box>
            </RowBox>
            <DefaultDropdown
              data={productDummy}
              value="정비 상품 검색"
              setValue={item => console.log(item)}
              width={121}
              pdLeft={0}
              fontType="Medium"
              isBorder={false}
            />
            <RowBox>
              <DefaultInput
                backgroundColor={Theme.color.white}
                borderColor={Theme.borderColor.gray}
                placeHolder="정비 상품을 검색하세요"
                width="380px"
              />
              <PositionBox backgroundColor="#0000" right="16px" bottom="11px">
                <DefaultImage source={SearchIcon} width="21px" height="21px" />
              </PositionBox>
            </RowBox>
            <ReceiptProduct onPress={onPressProduct} />
            <ReceiptProduct onPress={onPressProduct} />
            <ReceiptProduct onPress={onPressProduct} />
            <ReceiptProduct onPress={onPressProduct} />
            <ReceiptProduct onPress={onPressProduct} />
            <ReceiptProduct onPress={onPressProduct} />
          </Box>
        )}
        {select === '리뷰' && (
          <ScrollBox pd="0px 16px">
            <RowBox mg="20px 0px 10px">
              <DarkBoldText fontSize={Theme.fontSize.fs15}>리뷰</DarkBoldText>
              <IndigoText
                mg="0px 0px 0px 5px"
                letterSpacing="0px"
                fontSize={Theme.fontSize.fs15}
                fontWeight={Theme.fontWeight.medium}>
                {numberFormat(12345)}
              </IndigoText>
            </RowBox>
            <RowBox>
              <DefaultInput
                backgroundColor={Theme.color.white}
                borderColor={Theme.borderColor.gray}
                placeHolder="검색어를 입력하세요"
                width="380px"
              />
              <PositionBox backgroundColor="#0000" right="16px" bottom="11px">
                <DefaultImage source={SearchIcon} width="21px" height="21px" />
              </PositionBox>
            </RowBox>
            <Review isDetail />
            <ReviewRecomment />
          </ScrollBox>
        )}
        {select === '1:1문의' && (
          <Box pd="0px 16px">
            {questionList?.map(item => {
              return (
                <QuestionItem
                  {...item}
                  isAdmin
                  isSelect={questionSelect.find(findItem => findItem === item.questionTitle)}
                  onPressItem={() => onPressItem(item.questionTitle)}
                />
              );
            })}
          </Box>
        )}
      </ScrollBox>
      <FooterButtons selectMenu={1} isAdmin />
    </Container>
  );
}

const dateDummyList = [
  {label: '지난 6개월', value: '지난 6개월'},
  {label: '지난 12개월', value: '지난 12개월'},
];

const productDummy = [
  {label: '정비 상품 검색', value: '정비 상품 검색'},
  {label: '정비 - 오버홀', value: '정비 - 오버홀'},
  {label: '정비 - 기본점검', value: '정비 - 기본점검'},
];

const ReceiptProduct = ({
  productName = '정비 - 오버홀',
  name = '홍길동',
  date = '2021-10-07 16:00',
  price = 19000,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BetweenBox
        width="380px"
        pd="0px 10px"
        height="92px"
        alignItems="center"
        style={borderBottomWhiteGray}>
        <Box>
          <DarkBoldText>{productName}</DarkBoldText>
          <DarkText fontSize={Theme.fontSize.fs13}>{name}</DarkText>
          <GrayText fontSize={Theme.fontSize.fs12}>{date}</GrayText>
        </Box>
        <Box>
          <RowBox alignItems="center">
            <DarkBoldText fontSize={Theme.fontSize.fs18}>{numberFormat(price)}</DarkBoldText>
            <DarkMediumText fontSize={Theme.fontSize.fs15}>원</DarkMediumText>
          </RowBox>
        </Box>
      </BetweenBox>
    </TouchableOpacity>
  );
};

const ReviewRecomment = () => {
  const navigation = useNavigation();
  return (
    <Box mg="20px 0px 0px">
      <RowBox>
        <DefaultImage source={DummyIcon} width="50px" height="50px" />
        <Box mg="0px 0px 0px 10px">
          <RowBox>
            <DarkBoldText mg="0px 10px 0px 0px" fontSize={Theme.fontSize.fs15}>
              홍길동
            </DarkBoldText>
            <DarkText fontSize={Theme.fontSize.fs13}>APPALANCHIA</DarkText>
            <GrayText fontSize={Theme.fontSize.fs12}> | </GrayText>
            <DarkText fontSize={Theme.fontSize.fs13}>Momentum</DarkText>
          </RowBox>
          <GrayText fontSize={Theme.fontSize.fs12}>2021-10-13</GrayText>
        </Box>
      </RowBox>
      <RowBox mg="10px 0px 0px">
        <IndigoText mg="0px 10px 0px 0px" fontSize={Theme.fontSize.fs15}>
          정비 카테고리
        </IndigoText>
        <MoneyText
          fontWeight={Theme.fontWeight.medium}
          fontSize={Theme.fontSize.fs15}
          money={20000}
          color={Theme.color.black}
        />
      </RowBox>
      <DarkText mg="10px 0px 0px" fontSize={Theme.fontSize.fs15}>
        회원 작성 리뷰 영역
      </DarkText>
      <BetweenBox mg="20px 0px 0px" width="380px">
        <DefaultInput placeHolder="댓글을 입력해주세요 (500자 이내)" width="310px" height="44px" />
        <LinkButton content="등록" width="60px" height="44px" />
      </BetweenBox>
      <LinkWhiteButton
        to={() =>
          navigation.navigate('ReviewDetail', {
            isRecomment: true,
          })
        }
        mg="20px 0px 20px"
        content="자세히보기"
        borderRadius="3px"
      />
    </Box>
  );
};
