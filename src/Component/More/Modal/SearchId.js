import {BetweenBox, Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {DarkText, GrayText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import {useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DefaultInput} from '@/assets/global/Input';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useEffect} from 'react';
import Theme from '@/assets/global/Theme';
import {BorderButton} from '@/assets/global/Button';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {getCouponIssueCustomer} from '@/API/More/Coupon';
import SearchIcon from '@/Page/Customer/SearchIcon';
import Loading from '@/Component/Layout/Loading';
import {modalClose} from '@/Store/modalState';

export default function SearchId({setUser}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [isDone, setisDone] = useState(false);
  const login = useSelector(state => state.login);

  const onPressSearch = () => {
    setisDone(true);
    getCouponIssueCustomer({
      _mt_idx: login.idx,
      mt_id: search,
    })
      .then(res => res.data.result === 'true' && res.data.data.data)
      .then(data => {
        setUserList(data);
      });
    setisDone(false);
  };
  return (
    <>
      <ModalTitleBox title="고객명 검색" onclose={() => {}} />

      <Box width={`${412 - 32 - 40}px`}>
        <DefaultInput
          onSend={onPressSearch}
          placeHolder="고객명을 입력해주세요."
          width={`${412 - 32 - 40}px`}
          changeFn={setSearch}
          value={search}
        />
        <SearchIcon onPress={onPressSearch} />
      </Box>

      <Box height="200px" width="340px" mg="5px 0px">
        {isDone ? (
          <Loading />
        ) : (
          <FlatList
            data={userList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={async () => {
                    await setUser(item);
                    await dispatch(modalClose());
                  }}>
                  <RowBox
                    width="340px"
                    height="auto"
                    pd="0px 5px"
                    backgroundColor={Theme.color.white}
                    alignItems="center"
                    style={[
                      borderBottomWhiteGray,
                      {
                        minHeight: 35,
                      },
                    ]}>
                    <DarkText>{item?.mt_name}</DarkText>
                    <GrayText mg="0px 0px 0px 5px">{`(${item?.mt_id})`}</GrayText>
                  </RowBox>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Box height="200px" width="340px" alignItems="center" justifyContent="center">
                <DarkText>해당 고객명은 존재하지 않습니다.</DarkText>
              </Box>
            }
          />
        )}
      </Box>
    </>
  );
}
