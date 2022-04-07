import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/Component/Layout/Header';
import {blindClear, getBlindList} from '@/API/More/More';
import {useSelector} from 'react-redux';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkMediumText, DarkText, DefaultText, GrayText} from '@/assets/global/Text';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Button, ButtonTouch} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import {AlertButton, AlertButtons} from '@/Util/Alert';
import {showToastMessage} from '@/Util/Toast';
import Loading from '@/Component/Layout/Loading';

const BlindList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [isChange, setisChange] = useState(false);
  const {login} = useSelector(state => state);

  const onPressClear = idx => {
    AlertButtons('차단해제 하시겠습니까?', '확인', '취소', () => {
      blindClear({
        _mt_idx: login?.idx,
        blind_idx: idx,
      }).then(res => {
        if (res.data?.result === 'true') {
          showToastMessage('해제 완료');
          setisChange(p => !p);
        } else {
          showToastMessage(res.data?.msg);
        }
      });
    });
  };
  useEffect(() => {
    getBlindList({
      _mt_idx: login?.idx,
    })
      .then(res => {
        if (res.data?.result === 'true') {
          setList(res.data?.data?.data);
        } else {
          setList([]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isChange]);
  return (
    <>
      <Header title="차단 목록" />
      <FlatList
        data={list}
        style={{
          paddingHorizontal: getPixel(16),
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: getPixel(380),
                height: 50,
                alignItems: 'center',
              }}>
              <RowBox>
                <DarkBoldText>{item?.mt_name}</DarkBoldText>
                <GrayText>({item?.mt_id})</GrayText>
              </RowBox>
              <ButtonTouch
                onPress={() => {
                  onPressClear(item?.blind_idx);
                }}
                width="70px"
                height="40px"
                backgroundColor="#fff"
                borderColor={Theme.borderColor.whiteGray}>
                <DarkText>차단해제</DarkText>
              </ButtonTouch>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={{height: getHeightPixel(550), justifyContent: 'center', alignItems: 'center'}}>
            {isLoading ? <Loading /> : <DarkMediumText>차단 목록이 존재하지 않습니다.</DarkMediumText>}
          </View>
        }></FlatList>
    </>
  );
};

export default BlindList;

const styles = StyleSheet.create({});
