import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Kakao from '@assets/image/ic_kakao.png';
import Google from '@assets/image/ic_google.png';
import Naver from '@assets/image/ic_naver.png';
import Apple from '@assets/image/ic_apple.png';
import DefaultImage from '@/assets/global/Image';

export function KakaoImage() {
  return (
    <TouchableOpacity>
      <DefaultImage source={Kakao} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
export function GoogleImage() {
  return (
    <TouchableOpacity>
      <DefaultImage source={Google} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
export function NaverImage() {
  return (
    <TouchableOpacity>
      <DefaultImage source={Naver} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
export function AppleImage() {
  return (
    <TouchableOpacity>
      <DefaultImage source={Apple} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
