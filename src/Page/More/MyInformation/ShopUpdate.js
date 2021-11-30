import {Box, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {RequireFieldText} from '@/Page/Home/RegisterInformation';
import React from 'react';
import {useSelector} from 'react-redux';

export default function ShopUpdate() {
  const {size} = useSelector(state => state);
  return (
    <>
      <Header title="정보 수정" />
      <Box>
        <Box>
          <RowBox>
            <RequireFieldText />
          </RowBox>
          <DefaultInput
            title="이름"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="이름을 입력해주세요"
            errorMessage={'이름을 입력해주세요'}
            pd="0px 0px 5px"
          />
        </Box>
      </Box>
    </>
  );
}
