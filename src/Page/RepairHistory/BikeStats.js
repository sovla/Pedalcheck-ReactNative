import {Container, ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import ItemStats from '@/Component/RepairHistory/ItemStats';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function BikeStats() {
  return (
    <Container>
      <Header title="통계 상세보기" />
      <ScrollBox>
        <ItemStats showCount={999} width={412} isFull />
      </ScrollBox>
    </Container>
  );
}
