import {Button} from '@/assets/global/Button';
import {RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import PlusIcon from '@assets/image/ic_plus_w.png';
import {DefaultText} from '@/assets/global/Text';
import {getPixel} from '@/Util/pixelChange';
import {useNavigation} from '@react-navigation/native';

export default function QuestionAddition() {
  const navigation = useNavigation();

  const onPressRegister = () => {
    navigation.navigate('QuestionWrite');
  };
  return (
    <TouchableOpacity
      onPress={onPressRegister}
      style={{marginHorizontal: getPixel(16), marginTop: 17, marginBottom: 7}}>
      <Button>
        <RowBox backgroundColor="#0000">
          <DefaultImage source={PlusIcon} width="24px" height="24px" />
          <DefaultText>등록하기</DefaultText>
        </RowBox>
      </Button>
    </TouchableOpacity>
  );
}
