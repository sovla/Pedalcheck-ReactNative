export default function getDateList(startTimeDate, endTimeDate) {
  // By.Junhan 시작날짜 끝날짜 기준으로 사이 날을 배열로 리턴하는 함수  11-25
  let startDate = typeof startTimeDate === Date ? startTimeDate : new Date(startTimeDate);
  let endDate = typeof endTimeDate === Date ? endTimeDate : new Date(endTimeDate);

  let dateMove = startDate;
  let strDate = startDate.toISOString().slice(0, 10);
  let listDate = [];

  if (startDate == endDate) {
    return strDate;
  } else {
    while (startDate <= endDate) {
      strDate = dateMove.toISOString().slice(0, 10);
      listDate.push(strDate);

      dateMove.setDate(dateMove.getDate() + 1);
    }

    return listDate;
  }
}
