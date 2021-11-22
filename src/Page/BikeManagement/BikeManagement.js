import {BorderButton, Button, LinkButton} from '@/assets/global/Button';
import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {DarkBoldText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import Bike from '@/Component/BikeManagement/Bike';
import UseBike from '@/Component/BikeManagement/UseBike';
import StorageBike from '@/Component/BikeManagement/StorageBike';
export default function BikeManagement() {
  const {size} = useSelector(state => state);
  const [select, setSelect] = useState('사용중인 자전거');
  const item = {
    brandName: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
    date: '2021-10-07 16:00',
    repairCount: '00',
  };

  return (
    <>
      <Header title="자전거 관리" />
      <ScrollBox flex={1}>
        <MenuNav menuItem={menuItem} setSelect={setSelect} select={select} />
        {select === '사용중인 자전거' && <UseBike size={size} item={item} />}
        {select === '보관 자전거' && <StorageBike size={size} item={item} />}
      </ScrollBox>
    </>
  );
}

const menuItem = ['사용중인 자전거', '보관 자전거'];
