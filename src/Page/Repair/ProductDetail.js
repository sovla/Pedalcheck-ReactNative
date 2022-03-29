import {Box, Container} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText, DefaultText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import Swiper from '@/Component/Repair/Swiper';
import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {imageAddress} from '@assets/global/config';
import {useEffect} from 'react';

export default function ProductDetail({route: {params}}) {
  const {
    shopInfo: {store_info},
  } = useSelector(state => state);
  const item = params?.item;
  const shopTitle = store_info?.mst_name;
  const productName = item?.pt_title;
  const salePrice = item?.pt_dc_price;
  const Price = item?.pt_price;

  const weekdayIsShow = parseInt(item?.pt_stime?.slice(0, 2)) + parseInt(item?.pt_etime.slice(0, 2)) > 0 ? true : false;
  const weekdayAvailableTime = `${item?.pt_stime?.slice(0, 2)}시 ~ ${item?.pt_etime?.slice(0, 2)}시`;
  const holydayAvailableTime = `${item?.pt_weekend_stime?.slice(0, 2)}시 ~ ${item?.pt_weekend_etime?.slice(0, 2)}시`;

  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    // getProductCategoryList({ct_pid: item?.ct_pid})
    //   .then(res => res.data?.result === 'true' && res.data.data.data)
    //   .then(data => setCategory(data));
    const originImageArray = item?.pt_image;
    let tmpImageArray = [];
    for (let i = 0; i < item?.pt_image?.length; i++) {
      tmpImageArray.push({uri: imageAddress + originImageArray[i]});
    }
    setImageArray(tmpImageArray);
  }, []);
  const contentArray = [
    {
      title: '사용 가능시간',
      content: weekdayAvailableTime,
      isShow: weekdayIsShow,
    },
    {
      title: '주말 이용시간',
      content: item?.pt_weekend === 'Y' ? '주말 예약불가' : holydayAvailableTime,
      isShow: true,
    },
    {
      title: '카테고리',
      content: item?.ct_pname + ' / ' + item?.ct_name,
      isShow: item?.ct_pname && item?.ct_pname ? true : false,
    },
    {
      title: '상품설명',
      content: item?.pt_content,
      isShow: true,
    },
    {
      title: '평균 작업시간',
      content: setWorkTime(),
      isShow: true,
    },
    {
      title: '유의사항',
      content: item?.pt_etc,
      isShow: true,
    },
  ];

  function setWorkTime() {
    let workTime = '';

    if (item?.pt_proc_day * 1 > 0) {
      workTime += `${item?.pt_proc_day}일`;
    }
    if (item?.pt_proc_time * 1 > 0) {
      workTime += `${item?.pt_proc_time}시간`;
    }
    if (item?.pt_proc_min * 1 > 0) {
      workTime += `${item?.pt_proc_min}분`;
    }

    return workTime;
  }

  return (
    <>
      <Header title="상품 상세" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container alignItems="center" pd="20px 0px">
          {item?.pt_image?.length > 0 && (
            <Box width="380px" height="200px" mg="0px 0px 20px">
              <Swiper
                isTouch
                imageArray={imageArray}
                width={412 - 32}
                height={200}
                borderRadius="All"
                resizeMode="cover"
              />
            </Box>
          )}
          <Box width="380px" alignItems="center">
            <DefaultText fontSize={Theme.fontSize.fs15} color={Theme.color.gray}>
              {shopTitle}
            </DefaultText>
            <DarkBoldText fontSize={Theme.fontSize.fs18}>{productName}</DarkBoldText>
            <MoneyText fontSize={Theme.fontSize.fs13} money={Price} disabled />
            <MoneyText fontSize={Theme.fontSize.fs18} money={salePrice} color={Theme.color.indigo} />
          </Box>
          <Box mg="20px 0px 0px" width={412}>
            <DefaultLine height="10px" width={412} />
          </Box>
          <Box pd="0px 16px" width="100%">
            {contentArray.map((item, index) => {
              if (item.isShow && item.content) {
                return (
                  <Box mg="20px 0px 0px" key={item.title + index}>
                    <DarkBoldText>{item.title}</DarkBoldText>
                    <DarkText mg="5px 0px 0px">{item.content}</DarkText>
                  </Box>
                );
              }
            })}
          </Box>
        </Container>
      </ScrollView>
    </>
  );
}
