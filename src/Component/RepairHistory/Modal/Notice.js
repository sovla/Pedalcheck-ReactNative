import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import {BoldText, DarkBoldText, DefaultText} from '@/assets/global/Text';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from '@assets/image/pop_close.png';
import DefaultImage from '@/assets/global/Image';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {modalClose} from '@/Store/modalState';
import {getNoticeList, readNotice} from '@/API/Manager/More';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Header from '@/Component/Layout/Header';
import {getPixel} from '@/Util/pixelChange';
import {useEffect} from 'react';
import {useState} from 'react';

export default function Notice({route: {params}}) {
  const {login} = useSelector(state => state);

  const isFocused = useIsFocused();
  const [noticeList, setNoticeList] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const getNoticeListHandle = async () => {
    setisLoading(true);
    const response = await getNoticeList({
      _mt_idx: login.idx,
    });

    if (response?.data?.result === 'true') {
      setNoticeList(response?.data?.data?.data);
    }
    setisLoading(false);
  };

  const readNoticeHandle = async selectIdx => {
    setNoticeList(prev =>
      prev.map(item => {
        if (selectIdx === item.nt_idx) {
          return {
            ...item,
            nt_read: 'Y',
          };
        } else {
          return item;
        }
      }),
    );
    await readNotice({
      _mt_idx: login.idx, // storeInfo.idx,수정 필요
      nt_idx: selectIdx,
    });
  };

  useEffect(() => {
    if (isFocused) getNoticeListHandle();
  }, [isFocused]);

  return (
    <>
      <Header title="알림" />
      <FlatList
        style={{paddingHorizontal: getPixel(16)}}
        data={noticeList}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => {
          const changeItem = {
            title: item?.nt_title,
            content: item?.nt_msg,
            date: item?.nt_wdate,
            intent: item?.nt_intent, // 화면 이름
            noticeIdx: item?.nt_data1, // 푸시 알림 보낸 사람 idx
            noticeData: item?.nt_data2, // 이동 후 메뉴 선택
            nt_idx: item?.nt_idx,
          };

          return (
            <NoticeItem
              item={changeItem}
              isCheck={item?.nt_read === 'Y' ? true : false}
              readNoticeHandle={readNoticeHandle}
            />
          );
        }}
      />
    </>
  );
}

const NoticeItem = ({
  item = {
    title: '정비-기본점검 서비스 정비요청',
    content: '홍길동 님이 정비를 요청하였습니다.',
    date: '2021-10-13 02-03',
  },
  isCheck,
  readNoticeHandle,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={async () => {
        await readNoticeHandle(item?.nt_idx);
        if (item?.intent === 'ReservationManagementDetail') {
          await navigation.navigate(item?.intent, {menu: item?.noticeData, od_idx: item?.noticeIdx});
        } else if (item?.intent === 'RepairHistoryHome') {
          await navigation.navigate(item?.intent, {menu: item?.noticeIdx});
        } else {
          await navigation.navigate(item?.intent, {menu: item?.noticeData, od_idx: item?.noticeIdx});
        }
      }}>
      <Box width="380px" minHeight="95px" justifyContent="center" style={borderBottomWhiteGray}>
        <BoldText fontSize={Theme.fontSize.fs15} color={isCheck ? Theme.color.darkGray : Theme.color.black}>
          {item.title}
        </BoldText>
        <DefaultText
          width="380px"
          fontSize={Theme.fontSize.fs15}
          color={isCheck ? Theme.color.darkGray : Theme.color.black}>
          {item.content}
        </DefaultText>
        <DefaultText
          width="380px"
          letterSpacing="0px"
          fontSize={Theme.fontSize.fs13}
          color={isCheck ? Theme.color.darkGray : Theme.color.black}>
          {item.date}
        </DefaultText>
      </Box>
    </TouchableOpacity>
  );
};
