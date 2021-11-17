import pixelChange, {pixelHeightChange} from '@/Util/pixelChange';
import styled from 'styled-components/native';
import Theme from './Theme';

const DefaultLine = styled.View`
  width: 100%;
  height: ${p => pixelChange(p.height) ?? '1px'};
  bottom: 0px;
  background-color: ${Theme.borderColor.gray};
`;

export default DefaultLine;
