import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Update() {
  const [select, setSelect] = useState('기본 정보 수정');
  return (
    <>
      <Header title="정보 수정" />
      <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
    </>
  );
}

const menuItem = ['기본 정보 수정', '추가 정보 수정'];
