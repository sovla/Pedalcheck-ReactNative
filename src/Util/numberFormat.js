export default function numberFormat(inputNumber) {
  // By.Junhan  10000 -> 10,000  11-25
  const typeStringInputNumber = () => {
    switch (typeof inputNumber) {
      case 'string': {
        if (inputNumber.includes(',')) {
          const changeInputNumber = inputNumber.replaceAll(',', '');
          return parseInt(changeInputNumber);
        }
        return parseInt(inputNumber);
      }
      case 'number':
        return parseInt(inputNumber);
      default:
        return 0;
    }
  };
  const result = typeStringInputNumber()
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (result.includes('N') || result === '') {
    return '';
  }
  return result;
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
