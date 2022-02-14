import {sendPedalCheckQuestion, updateQna} from '@/API/More/More';
import {sendShopQuestion} from '@/API/Repair/Repair';
import {LinkButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import {getCategoryName, getCategoryNumber} from '@/Util/changeCategory';
import {showToastMessage} from '@/Util/Toast';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

// 2022-01-03 10:49:58
// Junhan
// 정비소 리뷰 작성,수정 페이지
// Toast 메시지 추가 필요

export default function RepairQuestion({route: {params}}) {
  const navigation = useNavigation();
  const {
    size,
    login,
    shopInfo: {store_info},
  } = useSelector(state => state);
  const isFocused = navigation.isFocused();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const item = params?.item;
  const isUpdate = item?.qt_idx ? true : false;

  const [errorMessage, setErrorMessage] = useState({
    title: '',
    content: '',
  });

  const checkContents = () => {
    let result = true;
    if (title === '') {
      setErrorMessage(prev => ({...prev, title: '제목을 입력해주세요.'}));
      result = false;
    }
    if (content === '') {
      setErrorMessage(prev => ({...prev, content: '내용을 입력해주세요.'}));
      result = false;
    }

    if (content.length < 10) {
      setErrorMessage(prev => ({...prev, content: '내용을 10자 이상 입력해주세요.'}));
      result = false;
    }
    return result;
  };

  const onPressSubmit = () => {
    setErrorMessage({
      title: '',
      content: '',
    });

    if (checkContents()) {
      sendShopQuestion({
        _mt_idx: login.idx,
        mst_idx: store_info?.mt_idx,
        mst_name: store_info?.mst_name,
        qt_title: title,
        qt_content: content,
      }).then(res => {
        if (res?.data?.result === 'true') {
          showToastMessage('저장되었습니다.');
          navigation.goBack();
        }
      });
    } else {
    }
  };

  const onPressUpdate = () => {
    setErrorMessage({
      title: '',
      content: '',
    });
    if (checkContents()) {
      updateQna({
        _mt_idx: login.idx,
        qt_idx: item?.qt_idx,
        qt_type: 1,
        mst_idx: item?.mst_idx,
        qt_title: title,
        qt_content: content,
      }).then(res => {
        if (res.data?.result === 'true') {
          navigation.goBack();
        }
      });
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setTitle(item?.qt_title);
      setContent(item?.qt_content);
    }
  }, [isFocused]);
  return (
    <>
      <Header title="문의하기" />
      <Container height={`${size.screenHeight - 120}px`}>
        <ScrollBox pd="0px 16px">
          <RowBox style={borderBottomWhiteGray} width={size.minusPadding} mg="20px 0px 20px">
            <DarkText mg="0px 0px 20px" fontSize={Theme.fontSize.fs16} fontWeight={Theme.fontWeight.bold}>
              필수 입력 항목{' '}
            </DarkText>
            <Box>
              <DefaultText color={Theme.color.skyBlue} lineHeight="22px">
                *
              </DefaultText>
            </Box>
          </RowBox>
          <DefaultInput
            fontSize={Theme.fontSize.fs15}
            title="업체명"
            pd="0px 0px 10px"
            disabled
            value={item?.mst_name ?? store_info?.mst_name}
            width="380px"
          />

          <DefaultInput
            fontSize={Theme.fontSize.fs15}
            title="제목"
            pd="20px 0px 5px"
            placeHolder="제목을 입력하세요"
            width="380px"
            value={title}
            changeFn={setTitle}
            maxLength={20}
            errorMessage={errorMessage.title !== '' && errorMessage.title}
          />
          <DefaultInput
            fontSize={Theme.fontSize.fs15}
            pd="20px 0px 5px"
            title="내용"
            placeHolder={`내용을 입력하세요 (10자 이상 2000자 이내)\n이모티콘을 삽입할시 글 내용이 깨질수 있습니다.`}
            width="380px"
            height="300px"
            isAlignTop
            multiline
            value={content}
            maxLength={2000}
            changeFn={setContent}
            errorMessage={errorMessage.content !== '' && errorMessage.content}
          />
          <Box height="110px" />
        </ScrollBox>
        <PositionBox bottom="0px">
          <LinkButton
            to={isUpdate ? onPressUpdate : onPressSubmit}
            content={isUpdate ? '수정하기' : '등록하기'}
            mg="0px 16px 20px"
          />
        </PositionBox>
      </Container>
    </>
  );
}
