import React from 'react';
import {useDispatch} from 'react-redux';

import {getShopList} from '@/API/More/More';
import Postcode from '@actbase/react-daum-postcode';
import {modalClose} from '@/Store/modalState';
import {Box, Container} from '@/assets/global/Container';

export default function DaumPostCode({setPostData}) {
  const dispatch = useDispatch();
  return <Box width="100%" height="100%" alignItems="center" justifyContent="center"></Box>;
}
