export default function numberFormat(inputNumber) {
  // By.Junhan  10000 -> 10,000  11-25
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberChangeFormat(number) {
  // By.Junhan 0~9 -> "00"~ "09" 10 -> "10"  11-25
  const numberInt = typeof number === 'string' ? parseInt(number) : number;
  if (numberInt < 10) {
    return '0' + numberInt;
  } else {
    return '' + numberInt;
  }
}
