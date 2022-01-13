export const reduceItem = (list, type) => {
  // list 길이가 0 일떈 0 리턴
  // list 길이가 1 일땐 첫번째 아이템 정보 리턴
  // list 길이가 1이상일땐 총합 리턴
  if (Array.isArray(list)) {
    if (list.length > 1) {
      return list.reduce((prev, curr) => {
        return parseInt(prev?.item[type]) + parseInt(curr?.item[type]);
      });
    } else if (list.length === 1) {
      return parseInt(list[0]?.item[type]);
    }
  }
  return 0;
};

export const reduceItemSplit = (list, split) => {
  // list 길이가 0 일떈 0 리턴
  // list 길이가 1 일땐 첫번째 아이템 정보 리턴
  // list 길이가 1이상일땐 총합 리턴
  if (Array.isArray(list)) {
    if (list.length > 1) {
      return list.reduce((prev, curr) => {
        return prev + split + curr;
      });
    } else if (list.length === 1) {
      return list[0];
    }
  }
  return '';
};
