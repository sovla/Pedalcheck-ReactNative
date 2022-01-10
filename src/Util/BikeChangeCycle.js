export default function BikeChangeCycle(value, changeValue) {
  return value > changeValue ? value - Math.floor(value / changeValue) * changeValue : value;
}
