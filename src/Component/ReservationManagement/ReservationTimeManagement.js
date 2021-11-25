import {BorderButton, Button, LinkButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import PlusBlackIcon from '@assets/image/ic_plus.png';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {DefaultCheckBox} from '../Home/CheckBox';
import {WhiteInput} from '@/assets/global/Input';
import {useState} from 'react';
import TrashIcon from '@assets/image/ic_trash.png';
import ModifyIcon from '@assets/image/ic_modify.png';
import {timeList} from '@/assets/global/dummy';
import {useEffect} from 'react';

export default function ReservationTimeManagement() {
  const {size} = useSelector(state => state);

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
        {timeList.map(item => (
          <TimeManagementCheckBox key={item + 'time'} time={item} />
        ))}
      </RowBox>
      <Box mg="0px 16px 20px">
        <LinkButton content="저장하기" />
      </Box>
    </Container>
  );
}

const TimeManagementCheckBox = ({time, isCheck, onUpdate}) => {
  const [reservationTime, setReservationTime] = useState('');
  useEffect(() => {
    setReservationTime(time);
  }, []);
  return (
    <RowBox width="50%" alignItems="center" pd="0px 16px 15px">
      <DefaultCheckBox isCheck={isCheck} />
      <Box mg="0px 5px">
        <WhiteInput
          width="70px"
          height="30px"
          pd="6px 16px"
          value={reservationTime}
          onChangeText={setReservationTime}
          borderColor={Theme.borderColor.gray}
          borderRadius="3px"
        />
      </Box>
      <RowBox justifyContent="space-between" width="65px" height="100%" alignItems="center">
        <TouchableOpacity>
          <BorderButton
            pd="0px"
            justifyContent="center"
            alignItems="center"
            width="30px"
            height="30px">
            <DefaultImage source={ModifyIcon} width="20px" height="20px" />
          </BorderButton>
        </TouchableOpacity>
        <TouchableOpacity>
          <BorderButton
            justifyContent="center"
            alignItems="center"
            width="30px"
            height="30px"
            pd="0px"
            borderColor={Theme.borderColor.gray}>
            <DefaultImage source={TrashIcon} width="20px" height="20px" />
          </BorderButton>
        </TouchableOpacity>
      </RowBox>
    </RowBox>
  );
};
