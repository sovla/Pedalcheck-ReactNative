import {BorderButton, Button, LinkButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import {Alert, FlatList, TextInput, TouchableOpacity} from 'react-native';
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
import {
  reservationTimeList,
  reservationTimeListSave,
} from '@/API/ReservationManagement/ReservationManagement';
import {AlertButton} from '@/Util/Alert';
import {useIsFocused} from '@react-navigation/native';
import {showToastMessage} from '@/Util/Toast';

export default function ReservationTimeManagement() {
  const isFocused = useIsFocused();

  const {size, login} = useSelector(state => state);
  const [timeList, setTimeList] = useState([]);
  const [orderTimeIdx, setOrderTimeIdx] = useState('');

  useEffect(() => {
    if (isFocused) {
      reservationTimeList({
        _mt_idx: login?.idx,
      })
        .then(res => res.data?.result === 'true' && res.data.data.data)
        .then(data => {
          setTimeList(data.store_ordertime);
          setOrderTimeIdx(data.ordertime_idx);
        });
    }
  }, [isFocused]);
  const onChangeTimeList = (time, index) => {
    setTimeList(prev =>
      prev.map((item, mapIndex) => {
        if (index === mapIndex) {
          return {
            flag: item.flag,
            ot_time: time,
          };
        } else {
          return item;
        }
      }),
    );
  };

  const onChangeFlag = index => {
    setTimeList(prev =>
      prev.map((item, mapIndex) => {
        if (index === mapIndex) {
          return {
            flag: item.flag === 'Y' ? 'N' : 'Y',
            ot_time: item.ot_time,
          };
        } else {
          return item;
        }
      }),
    );
  };

  const onPressAdd = () => {
    setTimeList(prev => [
      ...prev,
      {
        flag: 'Y',
        ot_time: '09:00',
      },
    ]);
  };

  const onPressSave = () => {
    const copyTimeList = timeList.slice();

    const changeTime = time => {
      const timeSplit = time.split(':');
      const hour = parseInt(timeSplit[0]);
      const minute = parseInt(timeSplit[1]);

      return hour * 60 + minute;
    };

    let result = false;
    let ot_time = [];
    let flag = [];

    copyTimeList.sort((prev, next) => {
      if (result) {
        return null;
      }
      const prevTime = changeTime(prev['ot_time']);
      const nextTime = changeTime(next['ot_time']);
      if (prevTime === nextTime) {
        result = true;
        AlertButton('입력한 예약 시간 중 중복된 값이 있습니다.');
        return null;
      }
      return prevTime - nextTime;
    });
    if (result) {
      return null;
    }
    copyTimeList.forEach((item, index) => {
      ot_time.push(item.ot_time);
      flag.push(item.flag);
    });

    reservationTimeListSave({
      _mt_idx: login.idx,
      ot_time,
      flag,
      ordertime_idx: orderTimeIdx,
    }).then(res => res.data?.result === 'true' && showToastMessage('저장되었습니다.'));
  };

  const onPressDelete = index => {
    setTimeList(prev => prev.filter((item, filterIndex) => filterIndex !== index));
  };
  return (
    <Container>
      <Box mg="20px 16px">
        <TouchableOpacity onPress={onPressAdd}>
          <Button backgroundColor={Theme.color.white} borderColor={Theme.borderColor.whiteGray}>
            <RowBox alignItems="center">
              <DefaultImage source={PlusBlackIcon} width="14px" height="14px" />
              <DarkText mg="0px 0px 0px 5px">추가하기</DarkText>
            </RowBox>
          </Button>
        </TouchableOpacity>
      </Box>
      <RowBox width={size.designWidth} flexWrap="wrap">
        <FlatList
          data={timeList}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            const time = item.ot_time;
            const flag = item.flag;
            return (
              <TimeManagementCheckBox
                time={time}
                isCheck={flag === 'Y'}
                setChangeFlag={() => {
                  onChangeFlag(index);
                }}
                setReservationTime={time => onChangeTimeList(time, index)}
                onPressDelete={() => onPressDelete(index)}
              />
            );
          }}
        />
        {/* {timeList.map(item => (
          <TimeManagementCheckBox key={item + 'time'} time={item} />
        ))} */}
      </RowBox>
      <Box mg="0px 16px 20px">
        <LinkButton to={onPressSave} content="저장하기" />
      </Box>
    </Container>
  );
}

const TimeManagementCheckBox = ({
  time,
  isCheck,
  setReservationTime,
  setChangeFlag,
  onPressDelete,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <RowBox width="50%" alignItems="center" pd="0px 16px 15px">
      <DefaultCheckBox isCheck={isCheck} setIsCheck={setChangeFlag} />
      <Box mg="0px 5px">
        <WhiteInput
          width="70px"
          height="30px"
          pd="0px"
          editable={isUpdate}
          selectTextOnFocus={isUpdate}
          backgroundColor={isUpdate ? Theme.color.white : Theme.color.backgroundDisabled}
          value={time}
          keyboardType="numeric"
          onChangeText={text => {
            if (text.length === 2) {
              const hour = parseInt(text.substring(0, 2));
              if (hour > 23) {
                AlertButton('시간은 0부터 23까지 입력해주세요.');
                return null;
              }
            } else if (text.length === 5) {
              const minute = parseInt(text.substring(3));
              if (minute > 59) {
                AlertButton('분은 0부터 59까지 입력해주세요.');
                return null;
              }
            }

            //  값 넣는 조건문
            if (text.length === 2 && time.length !== 3) {
              setReservationTime(text + ':');
            } else if (text.length <= 5) {
              setReservationTime(text);
            }
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
        <TrashButton onPress={onPressDelete} />
      </RowBox>
    </RowBox>
  );
};
