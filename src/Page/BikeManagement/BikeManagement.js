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
import {Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import BikeRegisterFirst from './BikeRegisterFirst';
import Loading from '@/Component/Layout/Loading';

export default function BikeManagement({navigation}) {
  const {size, login} = useSelector(state => state);
  const [select, setSelect] = useState('사용중인 자전거');
  const [page, setPage] = useState(1);
  const [useBikeList, setUseBikeList] = useState([]);
  const [storageBikeList, setStorageBike] = useState([]);
  const isFocused = useIsFocused();
  const [isDone, setIsDone] = useState(true);

  useEffect(() => {
    setPage(1);
    if (isFocused) {
      getBikeListHandle();
    }
  }, [isFocused]);

  const getBikeListHandle = async () => {
    await getBikeList({
      _mt_idx: login?.idx,
      mbt_flag: 'Y',
      page: 1,
    }).then(res => {
      if (res.data?.data?.data?.length) {
        setUseBikeList(res?.data?.data?.data);
      } else {
        setUseBikeList([]);
      }
    });
    await getBikeList({
      _mt_idx: login?.idx,
      mbt_flag: 'N',
      page: page,
    }).then(res => {
      if (res?.data?.data?.data?.length) {
        if (page === 1) {
          setStorageBike([...res?.data?.data?.data]);
        } else {
          setStorageBike(prev => [...prev, ...res?.data?.data?.data]);
        }
        setPage(prev => prev + 1);
      } else {
        if (page === 1) {
          setStorageBike([]);
        } else {
          return null;
        }
      }
    });

    setIsDone(false);
  };
  if (isDone) {
    return <Loading />;
  }

  return (
    <>
      {useBikeList?.length || storageBikeList?.length ? (
        <>
          <Header title="자전거 관리" />

          <MenuNav menuItem={menuItem} setSelect={setSelect} select={select} />
          {select === '사용중인 자전거' && <UseBike size={size} items={useBikeList} />}
          {select === '보관 자전거' && (
            <StorageBike size={size} getBikeListHandle={getBikeListHandle} item={storageBikeList} />
          )}
        </>
      ) : (
        <BikeRegisterFirst navigation={navigation} />
      )}
    </>
  );
}
const menuItem = ['사용중인 자전거', '보관 자전거'];
