export default function (login) {
  if (+login?.mt_level === 5 && +login?.mt_seller === 2) {
    return true;
  } else {
    return false;
  }
}
