import GradientHeader from '@/Component/Layout/GradientHeader';
import React from 'react';
import {useSelector} from 'react-redux';
import ReservationIcon from '@assets/image/menu06_top.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import {useState} from 'react';
import ScheduleManagement from '@/Component/ReservationManagement/ScheduleManagement';
import ReservationTimeManagement from '@/Component/ReservationManagement/ReservationTimeManagement';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import ReservationManagementHome from '@/Component/ReservationManagement/ReservationManagementHome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useRef} from 'react';

const Stack = createNativeStackNavigator();

export default function ReservationManagement() {
  const navigation = useNavigation();
  const [select, setSelect] = useState('예약현황');
  const [routes, setRoutes] = useState('ReservationManagementHome');
  useUpdateEffect(() => {
    if (select === '예약현황') {
      navigation.navigate('ReservationManagementHome');
    } else if (select === '일정관리') {
      navigation.navigate('ScheduleManagement');
    } else if (select === '예약 시간 관리') {
      navigation.navigate('ReservationTimeManagement');
    }
  }, [select]);
  useUpdateEffect(() => {
    if (routes === 'ReservationManagementHome') {
      setSelect('예약현황');
    } else if (routes === 'ScheduleManagement') {
      setSelect('일정관리');
    } else if (routes === 'ReservationTimeManagement') {
      setSelect('예약 시간 관리');
    }
  }, [routes]);

  return (
    <>
      <GradientHeader title="예약관리" imageSource={ReservationIcon}>
        <HeaderButton select={select} setSelect={setSelect} />
      </GradientHeader>

      <Stack.Navigator
        screenListeners={{
          state: e => {
            setRoutes(e.data.state.routes[e.data.state.routes.length - 1].name);
          },
        }}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="ReservationManagementHome">
        <Stack.Screen name="ReservationManagementHome" component={ReservationManagementHome} />
        <Stack.Screen name="ScheduleManagement" component={ScheduleManagement} />
        <Stack.Screen name="ReservationTimeManagement" component={ReservationTimeManagement} />
      </Stack.Navigator>
      <FooterButtons selectMenu={2} isAdmin />
    </>
  );
}
