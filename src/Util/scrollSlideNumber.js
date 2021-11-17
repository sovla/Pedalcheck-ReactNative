export default function scrollSlideNumber(e, width) {
  return Math.round(e.nativeEvent.contentOffset.x / width);
}
