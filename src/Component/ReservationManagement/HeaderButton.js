import {LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, RowBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import {useNavigation} from '@react-navigation/core';
import React from 'react';

export default function HeaderButton({
  select,
  setSelect,
  width = '120px',
  menuList = ['예약현황', '일정관리', '예약 시간 관리'],
}) {
  const navigation = useNavigation();
  const onPressButton = item => {
    setSelect(item);
  };
  return (
    <BetweenBox mg="20px 0px 0px" backgroundColor="#0000" flexWrap="wrap">
      {menuList.map(item => (
        <LinkWhiteButton
          to={() => {
            onPressButton(item);
          }}
          key={item}
          color={select === item ? Theme.color.indigo : Theme.color.gray}
          fontWeight={select === item && Theme.fontWeight.bold}
          content={item}
          width={width}
          borderRadius="10px"
          borderColor={Theme.color.white}
          mg="0px 0px 10px"
        />
      ))}
    </BetweenBox>
  );
}
