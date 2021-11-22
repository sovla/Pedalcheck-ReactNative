import {ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';

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
