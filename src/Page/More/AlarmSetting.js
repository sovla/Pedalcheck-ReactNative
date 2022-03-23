import {BetweenBox, Box, Container} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkMediumText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import SwitchOnIcon from '@assets/image/toggle_on.png';
import SwitchOffIcon from '@assets/image/toggle_off.png';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Theme from '@/assets/global/Theme';
import {setPushNotice} from '@/API/More/More';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {setUserInfo} from '@/Store/loginState';

export default function AlarmSetting() {
  const {login} = useSelector(state => state);
  // const [pushAlarm, setPushAlarm] = useState(false);
  // const [messageAlarm, setMessageAlarm] = useState(false);
  const [userInformation, setUserInformation] = useState(login);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setUserInformation(login?.mt_pushing === 'Y');
  //   setUserInformation(login?.mt_agree === 'Y');
  // }, []);

  useUpdateEffect(() => {
    setPushNotice({
      _mt_idx: login?.idx,
      mt_pushing: userInformation.mt_pushing === 'Y' ? 'Y' : 'N',
      mt_agree: userInformation.mt_agree === 'Y' ? 'Y' : 'N',
    }).then(res => res);

    dispatch(setUserInfo(userInformation));
  }, [userInformation]);

  return (
    <>
      <Header title="알림 설정" />
      <Container backgroundColor={Theme.borderColor.gray}>
        <Box>
          <BetweenBox pd="20px 16px 15px" width={412} alignItems="center">
            <DarkMediumText>푸쉬 알림</DarkMediumText>
            <TouchableOpacity
              onPress={() => {
                setUserInformation(prev => ({
                  ...prev,
                  mt_pushing: userInformation.mt_pushing === 'Y' ? 'N' : 'Y',
                }));
              }}>
              <DefaultImage
                source={userInformation.mt_pushing === 'Y' ? SwitchOnIcon : SwitchOffIcon}
                width="61px"
                height="27px"
              />
            </TouchableOpacity>
          </BetweenBox>
          <BetweenBox pd="0px 16px 15px" width={412} alignItems="center">
            <DarkMediumText>문자 알림</DarkMediumText>
            <TouchableOpacity
              onPress={() => {
                setUserInformation(prev => ({
                  ...prev,
                  mt_agree: userInformation.mt_agree === 'Y' ? 'N' : 'Y',
                }));
              }}>
              <DefaultImage
                source={userInformation.mt_agree === 'Y' ? SwitchOnIcon : SwitchOffIcon}
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
