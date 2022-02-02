import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import React from 'react';
import {TouchableOpacity} from 'react-native';

export default function ProductCheckBox({title, item, onPress, disabled}) {
  return (
    <Box>
      <DarkBoldText mg="0px 0px 10px">{title}</DarkBoldText>

      {item.map((innerItem, index) => {
        if (innerItem?.select !== '') {
          return (
            <RowBox mg="0px 0px 10px" key={innerItem + index} width="380px">
              <DarkText width="50%">{innerItem.itemTitle}</DarkText>
              <RowBox justifyContent="space-between" width="50%">
                <TouchableOpacity
                  disabled={disabled}
                  onPress={() => {
                    onPress(title, innerItem.itemTitle, '양호');
                  }}>
                  <RowBox>
                    <DefaultCheckBox isRadio isDisabled isCheck={innerItem.select === '양호'} />
                    <DarkText mg="0px 0px 0px 10px">양호</DarkText>
                  </RowBox>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={disabled}
                  onPress={() => {
                    onPress(title, innerItem.itemTitle, '정비 요망');
                  }}>
                  <RowBox>
                    <DefaultCheckBox isRadio isDisabled isCheck={innerItem.select === '정비 요망'} />
                    <DarkText mg="0px 0px 0px 10px">정비 요망</DarkText>
                  </RowBox>
                </TouchableOpacity>
              </RowBox>
            </RowBox>
          );
        }
      })}
    </Box>
  );
}
