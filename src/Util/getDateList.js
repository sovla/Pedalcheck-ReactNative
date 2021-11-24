export default function getDateList(startTimeDate, endTimeDate) {
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
