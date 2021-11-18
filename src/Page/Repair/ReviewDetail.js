import {Box, Container, ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import Review from '@/Component/Repair/Review';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ReviewDetail() {
  return (
    <>
      <Header title="리뷰" />
      <ScrollBox pd="0px 16px">
        <Box>
          <Review isDetailPage />
        </Box>
      </ScrollBox>
    </>
  );
}
