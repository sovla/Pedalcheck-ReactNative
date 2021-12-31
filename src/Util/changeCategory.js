// 기능 2021-12-30 11:24:20 Junhan
// 1. 숫자로 들어올경우 그에 맞는 이름으로 변경
// 2. 스트링으로 들어올경우 그에 맞는 숫자로 변경

export const getCategoryName = number => {
  const categoryNumber = typeof number === 'string' ? parseInt(number) : number;

  return categoryNumber(number - 1);
};

export const getCategoryNumber = string => {
  return categoryTypeList.findIndex(item => item === string) + 1;
};

const categoryTypeList = [
  '개선제안',
  '기타',
  '불편사항/오류',
  '우리동네 자전거 매장을 추천합니다',
  '자전거 브랜드/모델 추가요청',
  '자전거 관련 무엇이든 물어보세요',
];

// '1' => '개선 제안',
// '2' => '기타',
// '3' => '불편사항/오류',
// '4' => '우리동네 자전거 매장을 추천합니다',
// '5' => '자전거 브랜드/모델 추가요청',
// '6' => '자전거 관련 무엇이든 물어보세요'
