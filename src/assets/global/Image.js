import pixelChange, {pixelHeightChange} from '@/Util/pixelChange';
import styled from 'styled-components/native';
import React from 'react';
const DefaultImageStyle = styled.Image`
  width: ${p => pixelChange(p.width) ?? '100%'};
  height: ${p => pixelChange(p.height) ?? '100%'};
  border-radius: ${p => p.borderRadius ?? '0px'};
`;

const DefaultImage = WrappedComponent => {
  return props => {
    const resizeMode = props?.resizeMode !== undefined ? props.resizeMode : 'cover';
    return <WrappedComponent {...props} resizeMode={resizeMode} />;
  };
};

export default DefaultImage(DefaultImageStyle);
