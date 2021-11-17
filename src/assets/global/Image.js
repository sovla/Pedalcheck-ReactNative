import pixelChange from '@/Util/pixelChange';
import styled from 'styled-components/native';

const DefaultImage = styled.Image`
  width: ${p => pixelChange(p.width) ?? '100%'};
  height: ${p => pixelChange(p.height) ?? '100%'};
  border-radius: ${p => p.borderRadius ?? '0px'};
`;

export default DefaultImage;
