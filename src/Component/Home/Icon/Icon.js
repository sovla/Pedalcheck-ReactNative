import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Kakao from "@assets/image/ic_kakao.png";
import Google from "@assets/image/ic_google.png";
import Naver from "@assets/image/ic_naver.png";
import Apple from "@assets/image/ic_apple.png";

export function KakaoImage() {
  return (
    <TouchableOpacity>
      <IconSNS source={Kakao} />
    </TouchableOpacity>
  );
}
export function GoogleImage() {
  return (
    <TouchableOpacity>
      <IconSNS source={Google} />
    </TouchableOpacity>
  );
}
export function NaverImage() {
  return (
    <TouchableOpacity>
      <IconSNS source={Naver} />
    </TouchableOpacity>
  );
}
export function AppleImage() {
  return (
    <TouchableOpacity>
      <IconSNS source={Apple} />
    </TouchableOpacity>
  );
}
const IconSNS = styled.Image`
  width: 60px;
  height: 60px;
`;
