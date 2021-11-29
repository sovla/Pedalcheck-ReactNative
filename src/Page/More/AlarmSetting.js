import {BetweenBox, Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkMediumText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import SwitchOnIcon from '@assets/image/toggle_on.png';
import SwitchOffIcon from '@assets/image/toggle_off.png';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Theme from '@/assets/global/Theme';

export default function AlarmSetting() {
  const {size} = useSelector(state => state);
  const [pushAlarm, setPushAlarm] = useState(false);
  const [messageAlarm, setMessageAlarm] = useState(false);
  return (
    <>
      <Header title="알림 설정" />
      <Container backgroundColor={Theme.borderColor.gray}>
        <Box>
          <BetweenBox pd="20px 16px 15px" width={size.designWidth} alignItems="center">
            <DarkMediumText>푸쉬 알림</DarkMediumText>
            <TouchableOpacity onPress={() => setPushAlarm(prev => !prev)}>
              <DefaultImage
                source={pushAlarm ? SwitchOnIcon : SwitchOffIcon}
                width="61px"
                height="27px"
              />
            </TouchableOpacity>
          </BetweenBox>
          <BetweenBox pd="0px 16px 15px" width={size.designWidth} alignItems="center">
            <DarkMediumText>문자 알림</DarkMediumText>
            <TouchableOpacity onPress={() => setMessageAlarm(prev => !prev)}>
              <DefaultImage
                source={messageAlarm ? SwitchOnIcon : SwitchOffIcon}
                width="61px"
                height="27px"
              />
            </TouchableOpacity>
          </BetweenBox>
        </Box>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
