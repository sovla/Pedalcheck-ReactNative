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
    label: '승인완료',
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

export const couponDropdownList = [
  {
    label: '전체',
    value: '전체',
  },
  {
    label: '미사용',
    value: '미사용',
  },
  {
    label: '사용완료',
    value: '사용완료',
  },
  {
    label: '기간만료',
    value: '기간만료',
  },
  {
    label: '사용불가',
    value: '사용불가',
  },
];

export const initCheckList = [
  {
    title: '휠/허브',
    item: [
      {
        itemTitle: '휠 정렬',
        select: '',
        indexName: 'opt_chk_1_1',
      },
      {
        itemTitle: '구름성',
        select: '',
        indexName: 'opt_chk_1_2',
      },
    ],
  },
  {
    title: '핸들',
    item: [
      {
        itemTitle: '헤드셋 유격',
        select: '',
        indexName: 'opt_chk_2_1',
      },
      {
        itemTitle: '핸들바 위치',
        select: '',
        indexName: 'opt_chk_2_2',
      },
      {
        itemTitle: '바테입',
        select: '',
        indexName: 'opt_chk_2_3',
      },
    ],
  },
  {
    title: '프레임',
    item: [
      {
        itemTitle: '세척상태',
        select: '',
        indexName: 'opt_chk_3_1',
      },
      {
        itemTitle: '녹 발생',
        select: '',
        indexName: 'opt_chk_3_2',
      },
      {
        itemTitle: '프레임 외관',
        select: '',
        indexName: 'opt_chk_3_3',
      },
    ],
  },
  {
    title: '비비/페달',
    item: [
      {
        itemTitle: '비비 유격',
        select: '',
        indexName: 'opt_chk_4_1',
      },
      {
        itemTitle: '페달 조립',
        select: '',
        indexName: 'opt_chk_4_2',
      },
      {
        itemTitle: '구름성',
        select: '',
        indexName: 'opt_chk_4_3',
      },
    ],
  },
  {
    title: '타이어',
    item: [
      {
        itemTitle: '공기압',
        select: '',
        indexName: 'opt_chk_5_1',
      },
      {
        itemTitle: '마모상태(프론트)',
        select: '',
        indexName: 'opt_chk_5_2',
      },
      {
        itemTitle: '마모상태(리어)',
        select: '',
        indexName: 'opt_chk_5_3',
      },
    ],
  },
  {
    title: '안장',
    item: [
      {
        itemTitle: '안장 위치',
        select: '',
        indexName: 'opt_chk_6_1',
      },
      {
        itemTitle: '싯클램프 체결',
        select: '',
        indexName: 'opt_chk_6_2',
      },
    ],
  },
  {
    title: '체인/기어',
    item: [
      {
        itemTitle: '체인 윤활',
        select: '',
        indexName: 'opt_chk_7_1',
      },
      {
        itemTitle: '체인 수명',
        select: '',
        indexName: 'opt_chk_7_2',
      },
      {
        itemTitle: '체인 청소상태',
        select: '',
        indexName: 'opt_chk_7_3',
      },
      {
        itemTitle: '스프라켓 청소상태',
        select: '',
        indexName: 'opt_chk_7_4',
      },
      {
        itemTitle: '기어 변속',
        select: '',
        indexName: 'opt_chk_7_5',
      },
    ],
  },
];

export const bankList = [
  {label: '은행을 선택해주세요.', value: '은행을 선택해주세요.'},
  {label: '기업은행', value: '기업은행'},
  {label: '국민은행', value: '국민은행'},
  {label: '외환은행', value: '외환은행'},
  {label: '수협중앙회', value: '수협중앙회'},
  {label: '농협중앙회', value: '농협중앙회'},
  {label: '우리은행', value: '우리은행'},
  {label: 'SC제일은행', value: 'SC제일은행'},
  {label: '대구은행', value: '대구은행'},
  {label: '부산은행', value: '부산은행'},
  {label: '광주은행', value: '광주은행'},
  {label: '한국씨티은행', value: '한국씨티은행'},
  {label: '우체국', value: '우체국'},
  {label: '하나은행', value: '하나은행'},
  {label: '통합신한은행', value: '통합신한은행'},
  {label: '동양종합금융증권', value: '동양종합금융증권'},
  {label: '현대증권', value: '현대증권'},
  {label: '미래에셋증권', value: '미래에셋증권'},
  {label: '한국투자증권', value: '한국투자증권'},
  {label: '우리투자증권', value: '우리투자증권'},
  {label: '하이투자증권', value: '하이투자증권'},
  {label: 'HMC 투자증권', value: 'HMC 투자증권'},
  {label: 'SK 증권', value: 'SK 증권'},
  {label: '대신증권', value: '대신증권'},
  {label: '하나대투증권', value: '하나대투증권'},
  {label: '굿모닝신한증권', value: '굿모닝신한증권'},
  {label: '동부증권', value: '동부증권'},
  {label: '유진투자증권', value: '유진투자증권'},
  {label: '메리츠증권', value: '메리츠증권'},
  {label: '신영증권', value: '신영증권'},
];

export const bankList1 = [
  {label: '은행을 선택해주세요.', value: ''},
  {label: '기업은행', value: '03'},
  {label: '국민은행', value: '04'},
  {label: '외환은행', value: '05'},
  {label: '수협중앙회', value: '07'},
  {label: '농협중앙회', value: '11'},
  {label: '우리은행', value: '20'},
  {label: 'SC제일은행', value: '23'},
  {label: '대구은행', value: '31'},
  {label: '부산은행', value: '32'},
  {label: '광주은행', value: '34'},
  {label: '한국씨티은행', value: '53'},
  {label: '우체국', value: '71'},
  {label: '하나은행', value: '81'},
  {label: '통합신한은행', value: '88'},
  {label: '동양종합금융증권', value: 'D1'},
  {label: '현대증권', value: 'D2'},
  {label: '미래에셋증권', value: 'D3'},
  {label: '한국투자증권', value: 'D4'},
  {label: '우리투자증권', value: 'D5'},
  {label: '하이투자증권', value: 'D6'},
  {label: 'HMC 투자증권', value: 'D7'},
  {label: 'SK 증권', value: 'D8'},
  {label: '대신증권', value: 'D9'},
  {label: '하나대투증권', value: 'DA'},
  {label: '굿모닝신한증권', value: 'DB'},
  {label: '동부증권', value: 'DC'},
  {label: '유진투자증권', value: 'DD'},
  {label: '메리츠증권', value: 'DE'},
  {label: '신영증권', value: 'DF'},
];

export const openTimeList = [
  {label: '00', value: ''},
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

export const openTimehalfList = [
  {label: '00', value: ''},
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
];
export const openTimePmList = [
  {label: '00', value: ''},
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

export const loginType = ['', '', '카카오', '네이버', '구글', '애플'];
// const dummyItem = {
//   title: '체인 윤활 주기',
//   image: DummyIcon,
//   lastChange: 400,
//   changeCycle: 1000,
// };
// const dummyItem1 = {
//   title: '체인 교체 주기',
//   image: DummyIcon,
//   lastChange: 550,
//   changeCycle: 1200,
// };
