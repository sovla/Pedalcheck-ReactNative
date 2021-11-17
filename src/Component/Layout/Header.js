import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import {Text} from 'react-native';
import BackArrow from '@assets/image/back.png';
import Theme from '@/assets/global/Theme';
import styled from 'styled-components/native';
import DefaultImage from '@/assets/global/Image';
import {useNavigation} from '@react-navigation/core';

export default function Header({title}) {
  const navigation = useNavigation();
  return (
    <RowBox height="50px">
      <TouchStyle onPress={navigation.goBack}>
        <DefaultImage width="17px" height="17px" source={BackArrow} resizeMode="cover" />
      </TouchStyle>
      <Box width="60%" alignItems="center" justifyContent="center">
        <Text
          style={{
            textAlignVertical: 'center',
            height: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          {title}
        </Text>
      </Box>
      <Line />
    </RowBox>
  );
}

const Line = styled.View`
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0px;
  background-color: ${Theme.borderColor.gray};
`;

const TouchStyle = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  justify-content: center;
  padding-left: 16px;
`;
