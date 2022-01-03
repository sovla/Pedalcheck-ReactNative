import {ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';

import UseBike from '@/Component/BikeManagement/UseBike';
import StorageBike from '@/Component/BikeManagement/StorageBike';
import {getBikeList} from '@/API/Bike/Bike';
import {useEffect} from 'react';
export default function BikeManagement() {
  const {size} = useSelector(state => state);
  const [select, setSelect] = useState('사용중인 자전거');
  const [page, setPage] = useState(1);
  const [bikeList, setBikeList] = useState([]);

  useEffect(() => {
    getBikeListHandle();
  }, [select]);

  const getBikeListHandle = () => {
    getBikeList({
      _mt_idx: 4, // 수정 필요
      mbt_flag: select === '사용중인 자전거' ? 'Y' : 'N',
      page: page,
    }).then(res => setBikeList(res?.data?.data?.data));
  };

  return (
    <>
      <Header title="자전거 관리" />

      <MenuNav menuItem={menuItem} setSelect={setSelect} select={select} />
      {select === '사용중인 자전거' && <UseBike size={size} item={bikeList} />}
      {select === '보관 자전거' && <StorageBike size={size} item={bikeList} />}
    </>
  );
}

const menuItem = ['사용중인 자전거', '보관 자전거'];
