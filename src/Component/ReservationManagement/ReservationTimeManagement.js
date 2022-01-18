import {BorderButton, Button, LinkButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import PlusBlackIcon from '@assets/image/ic_plus.png';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {DefaultCheckBox} from '../Home/CheckBox';
import {WhiteInput} from '@/assets/global/Input';
import {useState} from 'react';
import TrashIcon from '@assets/image/ic_trash.png';
import ModifyIcon from '@assets/image/ic_modify.png';
import {useEffect} from 'react';
import {useLayoutEffect} from 'react';
import ModifyButton from '../Buttons/ModifyButton';
import TrashButton from '../Buttons/TrashButton';
import {reservationTimeList} from '@/API/ReservationManagement/ReservationManagement';

export default function ReservationTimeManagement() {
  const {size} = useSelector(state => state);
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    reservationTimeList({
      _mt_idx: 10,
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => {
        setTimeList(data.store_ordertime);
      });
  }, []);

  return (
    <Container>
      <Box mg="20px 16px">
        <Button backgroundColor={Theme.color.white} borderColor={Theme.borderColor.whiteGray}>
          <RowBox alignItems="center">
            <DefaultImage source={PlusBlackIcon} width="14px" height="14px" />
            <DarkText mg="0px 0px 0px 5px">추가하기</DarkText>
          </RowBox>
        </Button>
      </Box>
      <RowBox width={size.designWidth} flexWrap="wrap">
        <FlatList
          data={timeList}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            const time = item.ot_time;
            return <TimeManagementCheckBox time={time} />;
          }}
        />
        {/* {timeList.map(item => (
          <TimeManagementCheckBox key={item + 'time'} time={item} />
        ))} */}
      </RowBox>
      <Box mg="0px 16px 20px">
        <LinkButton content="저장하기" />
      </Box>
    </Container>
  );
}

const TimeManagementCheckBox = ({time, isCheck, onUpdate}) => {
  const [reservationTime, setReservationTime] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  useLayoutEffect(() => {
    setReservationTime(time);
  }, []);
  return (
    <RowBox width="50%" alignItems="center" pd="0px 16px 15px">
      <DefaultCheckBox isCheck={isCheck} />
      <Box mg="0px 5px">
        <WhiteInput
          width="70px"
          height="30px"
          pd="0px"
          editable={isUpdate}
          selectTextOnFocus={isUpdate}
          value={reservationTime}
          onChangeText={text => {
            const reg = '(\\d{2})(\\d{2})';
            const code = text.replace(reg, '$1:$2');
            console.log(code);
            setReservationTime(code);
          }}
          borderColor={Theme.borderColor.gray}
          borderRadius="3px"
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            includeFontPadding: false,
          }}
        />
      </Box>
      <RowBox justifyContent="space-between" width="65px" height="100%" alignItems="center">
        <ModifyButton
          onPress={() => {
            setIsUpdate(true);
          }}
        />
        <TrashButton />
      </RowBox>
    </RowBox>
  );
};
