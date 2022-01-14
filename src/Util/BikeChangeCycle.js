export default function BikeChangeCycle(value, changeValue) {
  if (!value) {
    return 0;
  }
  return value > changeValue ? value - Math.floor(value / changeValue) * changeValue : value;
}
