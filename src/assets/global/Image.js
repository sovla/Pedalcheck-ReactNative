import pixelChange, {pixelHeightChange} from '@/Util/pixelChange';
import styled from 'styled-components/native';
import React from 'react';
const DefaultImage = styled.Image`
  width: ${p => pixelChange(p.width) ?? '100%'};
  height: ${p => pixelHeightChange(p.height) ?? '100%'};
  border-radius: ${p => p.borderRadius ?? '0px'};
`;

const ContainerImage = props => {
  return <DefaultImage resizeMode="contain" {...props}></DefaultImage>;
};

export default ContainerImage;
