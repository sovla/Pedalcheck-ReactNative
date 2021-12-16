import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {minuteList, openTimeList, repairHistoryDropdownList} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, DarkText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import Photo from '@/Component/Repair/Photo';
import {RequireFieldText} from '@/Page/Home/RegisterInformation';
import {getPixel} from '@/Util/pixelChange';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';

export default function ProductRegister() {
  const [useStartTime, setUseStartTime] = useState('00');
  const [useEndTime, setUseEndTime] = useState('00');
  const [holyDayStartTime, setHolyDayStartTime] = useState('00');
  const [holyDayEndTime, setHolyDayEndTime] = useState('00');
  const [isHolyDay, setIsHolyDay] = useState(false);
  const [repairType, setRepairType] = useState('입고수리');
  const [workTime, setWorkTime] = useState({
    day: '0',
    time: '00',
    minute: '00',
  });
  const [imageArray, setImageArray] = useState([]);
  const navigation = useNavigation();

  const onChangeWorkTime = (value, type) => {
    setWorkTime(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <>
      <Header title="정비상품 등록" />
      <ScrollBox pd="0px 16px">
        <RowBox pd="20px 0px" style={borderBottomWhiteGray}>
          <RequireFieldText />
        </RowBox>
        <DefaultInput
          mg="20px 0px 0px"
          title="상품명"
          width="380px"
          placeHolder="상품명을 입력해주세요"
          errorMessage="상품명을 입력해주세요"
        />
        <RowBox alignItems="center">
          <DefaultInput title="가격" width="355px" placeHolder="가격을 입력해주세요" />
          <PositionBox
            right="0"
            bottom="10"
            width="25px"
            justifyContent="center"
            alignItems="center">
            <DarkMediumText>원</DarkMediumText>
          </PositionBox>
        </RowBox>
        <RowBox width="55px" mg="20px 0px">
          <DefaultInput isCenter title="할인율" value="0" width="55px" />
          <PositionBox bottom="10" right="-17">
            <DarkMediumText fontSize={Theme.fontSize.fs15}>%</DarkMediumText>
          </PositionBox>
        </RowBox>
        <DarkMediumText fontSize={Theme.fontSize.fs15}>사용가능시간</DarkMediumText>
        <RowBox mg="0px 0px 10px">
          <DropdownTimeBox value={useStartTime} setValue={setUseStartTime} />
          <DropdownTimeBox title="종료시간" value={useEndTime} setValue={setUseEndTime} />
        </RowBox>
        <TouchableOpacity
          onPress={() => setIsHolyDay(prev => !prev)}
          style={{marginBottom: getPixel(10)}}>
          <RowBox alignItems="center">
            <DefaultCheckBox isCheck={isHolyDay} isDisabled />
            <DarkText mg="0px 0px 0px 10px">주말예약 불가</DarkText>
          </RowBox>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsHolyDay(prev => !prev)}>
          <RowBox alignItems="center">
            <DefaultCheckBox isCheck={isHolyDay} isDisabled />
            <DarkText mg="0px 0px 0px 10px">주말 이용시간 별도 설정</DarkText>
          </RowBox>
        </TouchableOpacity>
        <RowBox mg="10px 0px 0px">
          <DropdownTimeBox value={holyDayStartTime} setValue={setHolyDayStartTime} />
          <DropdownTimeBox title="종료시간" value={holyDayEndTime} setValue={setHolyDayEndTime} />
        </RowBox>
        <Box>
          <DarkMediumText fontSize={Theme.fontSize.fs15}>입고수리</DarkMediumText>
          <RowBox mg="10px 0px 0px">
            <TouchableOpacity onPress={() => setRepairType('입고수리')}>
              <RowBox>
                <DefaultCheckBox isRadio isCheck={repairType === '입고수리'} />
                <DarkText mg="0px 30px 0px 10px">입고수리</DarkText>
              </RowBox>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRepairType('현장수리')}>
              <RowBox>
                <DefaultCheckBox isRadio isCheck={repairType === '현장수리'} />
                <DarkText mg="0px 30px 0px 10px">현장수리</DarkText>
              </RowBox>
            </TouchableOpacity>
          </RowBox>
        </Box>
        <Box style={borderBottomWhiteGray}>
          <DarkBoldText mg="40px 0px 20px">선택 입력 항목</DarkBoldText>
        </Box>
        <Box mg="20px 0px">
          <DarkMediumText>카테고리 선택</DarkMediumText>
          <DefaultInput
            isDropdown
            dropdownItem={repairHistoryDropdownList}
            changeFn={item => console.log(item)}
            placeHolder={'전체 카테고리를 선택해주세요'}
            mg="10px 0px"
          />
          <DefaultInput
            isDropdown
            dropdownItem={repairHistoryDropdownList}
            changeFn={item => console.log(item)}
            placeHolder={'세부 카테고리를 선택해주세요'}
          />
        </Box>
        <Box>
          <DefaultInput
            title="상품설명"
            placeHolder={'상품설명을 입력해주세요.'}
            isAlignTop
            multiline
            width="380px"
            height="100px"
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DarkMediumText mg="20px 0px 10px" fontSize={Theme.fontSize.fs15}>
            평균작업시간
          </DarkMediumText>
          <RowBox></RowBox>
          <RowBox alignItems="center">
            <DefaultInput
              backgroundColor={'#FFFFFF'}
              borderColor={Theme.borderColor.gray}
              width="54px"
              isCenter
              value={workTime.day}
              changeFn={value => onChangeWorkTime(value, 'day')}
            />
            <DarkText mg="0px 15px 0px 5px">일</DarkText>
            <DefaultDropdown
              data={openTimeList}
              value={workTime.time}
              setValue={value => onChangeWorkTime(value, 'time')}
            />
            <DarkText mg="0px 15px 0px 5px">시</DarkText>
            <DefaultDropdown
              data={minuteList}
              value={workTime.minute}
              setValue={value => onChangeWorkTime(value, 'minute')}
            />
            <DarkText mg="0px 15px 0px 5px">분</DarkText>
          </RowBox>
        </Box>
        <Box>
          <DefaultInput
            title="유의사항"
            placeHolder="유의사항을 입력해주세요"
            width="380px"
            height="100px"
            isAlignTop
            multiline
          />
        </Box>
        <Box mg="0px 0px 20px">
          <BetweenBox width="380px" mg="20px 0px 10px">
            <DarkMediumText fontSize={Theme.fontSize.fs15}>사진첨부</DarkMediumText>
            <IndigoText fontSize={Theme.fontSize.fs14}>최대 10장까지 등록가능</IndigoText>
          </BetweenBox>
          <Photo imageArray={imageArray} setImageArray={setImageArray} imageCount={10} />
        </Box>
        <LinkButton
          content="등록하기"
          mg="0px 0px 20px"
          to={() => {
            navigation.navigate('ProductManagement');
          }}
        />
      </ScrollBox>
    </>
  );
}

const DropdownTimeBox = ({title = '시작시간', value, setValue}) => {
  return (
    <RowBox alignItems="center" width="50%">
      <DarkText mg="0px 15px 0px 0px" fontSize={Theme.fontSize.fs15}>
        {title}
      </DarkText>
      <DefaultDropdown data={openTimeList} value={value} setValue={setValue} />
      <DarkText mg="0px 0px 0px 5px">시</DarkText>
    </RowBox>
  );
};
