import Default1 from '@assets/image/default_1.png';
import Default2 from '@assets/image/default_2.png';
import Default3 from '@assets/image/default_3.png';
import Default4 from '@assets/image/default_4.png';
import Default5 from '@assets/image/default_5.png';

export const charImage = ['', Default1, Default2, Default3, Default4, Default5];

export const bikeInfo = {
  brand: 'APPALANCHIA',
  modelName: 'Momentum',
  bikeName: '따릉이',
  detail: [
    {
      title: '차대번호',
      value: 'A12345678',
    },
    {
      title: '연식',
      value: '21년식',
    },
    {
      title: '타입',
      value: '하이브리드',
    },
    {
      title: '구동계',
      value: '클라리스',
    },
    {
      title: '사이즈',
      value: '591cm',
    },
    {
      title: '컬러',
      value: '블랙',
    },
    {
      title: '모델상세',
      value: '모델 상세 노출 영역',
    },
  ],
};

export const productStatus = {
  status: '예약',
  productName: '정비-오버홀',
  reservationDate: '2021-10-14 10:58',
  request: '요청사항 영역 요청사항 영역 요청사항 영역 요청사항 영역',
  rejection: '승인거절 사유 노출 영역 승인거절 사유노출 영역 승인거절 사유 노출 영역',
  totalPrice: 47000,
  customerName: '홍길동',
  customerEmail: 'pedalee@pedalcheck.co.kr',
  customerTel: '010-1234-1234',
  customerLevel: '일반',
};

export const timeList = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
];

export const disabled = ['09:00', '09:30'];

export const repairHistoryDropdownList = [
  {
    label: '전체',
    value: '전체',
  },
  {
    label: '예약',
    value: '예약',
  },
  {
    label: '예약취소',
    value: '예약취소',
  },
  {
    label: '승인',
    value: '승인',
  },
  {
    label: '승인거부',
    value: '승인거부',
  },
  {
    label: '처리완료',
    value: '처리완료',
  },
];

export const initCheckList = [
  {
    title: '휠/허브',
    item: [
      {
        itemTitle: '휠 정렬',
        select: '',
      },
      {
        itemTitle: '구름성',
        select: '',
      },
    ],
  },
  {
    title: '핸들',
    item: [
      {
        itemTitle: '헤드셋 유격',
        select: '',
      },
      {
        itemTitle: '핸들바 위치',
        select: '',
      },
      {
        itemTitle: '바테입',
        select: '',
      },
    ],
  },
  {
    title: '프레임',
    item: [
      {
        itemTitle: '세척상태',
        select: '',
      },
      {
        itemTitle: '녹 발생',
        select: '',
      },
      {
        itemTitle: '프레임 외관',
        select: '',
      },
    ],
  },
  {
    title: '비비/페달',
    item: [
      {
        itemTitle: '비비 유격',
        select: '',
      },
      {
        itemTitle: '페달 조립',
        select: '',
      },
      {
        itemTitle: '구름성',
        select: '',
      },
    ],
  },
  {
    title: '타이어',
    item: [
      {
        itemTitle: '공기압',
        select: '',
      },
      {
        itemTitle: '마모상태(프론트)',
        select: '',
      },
      {
        itemTitle: '마모상태(리어)',
        select: '',
      },
    ],
  },
  {
    title: '안장',
    item: [
      {
        itemTitle: '안장 위치',
        select: '',
      },
      {
        itemTitle: '싯클램프 체결',
        select: '',
      },
    ],
  },
  {
    title: '체인/기어',
    item: [
      {
        itemTitle: '체인 윤활',
        select: '',
      },
      {
        itemTitle: '체인 수명',
        select: '',
      },
      {
        itemTitle: '체인 청소상태',
        select: '',
      },
      {
        itemTitle: '스프라켓 청소상태',
        select: '',
      },
      {
        itemTitle: '기어 변속',
        select: '',
      },
    ],
  },
];

export const bankList = [
  {label: '은행을 선택하세요', value: '은행을 선택하세요'},
  {label: '한국은행', value: '한국은행'},
  {label: 'KDB산업은행', value: 'KDB산업은행'},
  {label: '기업은행', value: '기업은행'},
  {label: '국민은행', value: '국민은행'},
  {label: '수협은행', value: '수협은행'},
  {label: '한국수출입은행', value: '한국수출입은행'},
  {label: '농협은행', value: '농협은행'},
  {label: '우리은행', value: '우리은행'},
  {label: 'SC제일은행', value: 'SC제일은행'},
  {label: '씨티은행', value: '씨티은행'},
  {label: '대구은행', value: '대구은행'},
  {label: '부산은행', value: '부산은행'},
  {label: '광주은행', value: '광주은행'},
  {label: '제주은행', value: '제주은행'},
  {label: '전북은행', value: '전북은행'},
  {label: '경남은행', value: '경남은행'},
  {label: '새마을금고중앙회', value: '새마을금고중앙회'},
  {label: '신협은행', value: '신협은행'},
  {label: '상호저축은행', value: '상호저축은행'},
  {label: '우체국은행', value: '우체국은행'},
  {label: '하나은행', value: '하나은행'},
  {label: '신한은행', value: '신한은행'},
  {label: '케이뱅크', value: '케이뱅크'},
  {label: '카카오뱅크', value: '카카오뱅크'},
];

export const openTimeList = [
  {label: '00', value: '00'},
  {label: '01', value: '01'},
  {label: '02', value: '02'},
  {label: '03', value: '03'},
  {label: '04', value: '04'},
  {label: '05', value: '05'},
  {label: '06', value: '06'},
  {label: '07', value: '07'},
  {label: '08', value: '08'},
  {label: '09', value: '09'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
  {label: '13', value: '13'},
  {label: '14', value: '14'},
  {label: '15', value: '15'},
  {label: '16', value: '16'},
  {label: '17', value: '17'},
  {label: '18', value: '18'},
  {label: '19', value: '19'},
  {label: '20', value: '20'},
  {label: '21', value: '21'},
  {label: '22', value: '22'},
  {label: '23', value: '23'},
];

export const minuteList = [
  {label: '00', value: '00'},
  {label: '10', value: '10'},
  {label: '20', value: '20'},
  {label: '30', value: '30'},
  {label: '40', value: '40'},
  {label: '50', value: '50'},
];

export const couponDummy = [
  {
    label: '1000원',
    value: '1000원',
  },
  {
    label: '2000원',
    value: '2000원',
  },
  {
    label: '3000원',
    value: '3000원',
  },
  {
    label: '5000원',
    value: '5000원',
  },
  {
    label: '10000원',
    value: '10000원',
  },
  {
    label: '200000원',
    value: '200000원',
  },
];

export const bikeStats = [
  {
    title: '합계',
    count: '00',
    rate: '100%',
  },
  {
    title: '로드바이크',
    count: '33',
    rate: '67.3%',
  },
  {
    title: 'MTB',
    count: '8',
    rate: '16.3%',
  },
  {
    title: '픽시',
    count: '3',
    rate: '6.1%',
  },
  {
    title: '정비 상품명',
    count: '00',
    rate: '00%',
  },
  {
    title: '정비 상품명',
    count: '00',
    rate: '00%',
  },
  {
    title: '정비 상품명',
    count: '00',
    rate: '00%',
  },
  {
    title: '정비 상품명',
    count: '00',
    rate: '00%',
  },
  {
    title: '정비 상품명',
    count: '00',
    rate: '00%',
  },
  {
    title: '정비 상품명',
    count: '00',
    rate: '00%',
  },
];

export const shopDateHistory = [
  {
    label: '2017년',
    value: 2017,
  },
  {
    label: '2018년',
    value: 2018,
  },
  {
    label: '2019년',
    value: 2019,
  },
  {
    label: '2020년',
    value: 2020,
  },
  {
    label: '2021년',
    value: 2021,
  },
];
