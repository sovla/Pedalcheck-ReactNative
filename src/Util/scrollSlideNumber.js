import {getPixel} from './pixelChange';

export default function scrollSlideNumber(e, width) {
  const result = Math.round(e.nativeEvent.contentOffset.x / getPixel(width));

  return result;
}
