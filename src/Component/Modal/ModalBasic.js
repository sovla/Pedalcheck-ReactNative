import {Box, Container, PositionBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import DatePicker from '../Home/Modal/DatePicker';
import ImagePicker from '../Home/Modal/ImagePicker';
import LocationPicker from '../Home/Modal/LocationPicker';
import Service from '../Home/Modal/Service';
import ThirdParty from '../Home/Modal/ThirdParty';

export default function ModalBasic() {
  const modal = useSelector(state => state.modal);
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();
  let RenderItem = <></>;

  if (modal?.isOpenModal) {
    // by.junhan modal.modalComponent 에 따라 렌더링 할 컴포넌트를 정해주는 부분  2021-11-12
    RenderItem = () => {
      switch (modal?.modalComponent) {
        case 'service':
          return Service();
        case 'privacy':
          return Service();
        case 'location':
          return Service();
        case 'thirdParty':
          return ThirdParty();
        case 'marketing':
          return Service();
        case 'locationPicker':
          return LocationPicker();
        case 'locationPickerDetail':
          return LocationPicker();
        case 'slide/selectImage':
          return ImagePicker();
        case 'slide/birthDate':
          return DatePicker();
      }
    };
  }
  const isSlide = modal?.modalComponent?.split('/')[0] === 'slide';
  return (
    <Modal
      animationType={!isSlide ? 'none' : 'none'}
      transparent={true}
      visible={modal.isOpenModal}
      onRequestClose={() => {
        dispatch(modalClose());
      }}>
      <Container
        backgroundColor={Theme.color.dimmer}
        justifyContent={isSlide ? 'flex-end' : 'center'}
        alignItems="center"
        zIndex="200">
        {!isSlide ? (
          <Box
            backgroundColor={Theme.color.white}
            minWidth={size.minusPadding}
            minHeight="300px"
            borderRadius="15px"
            pd="20px 16px"
            alignItems="center">
            {modal?.modalComponent !== undefined && <RenderItem />}
          </Box>
        ) : (
          <PositionBox
            style={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}
            backgroundColor={Theme.color.white}
            minWidth={size.designWidth}
            minHeight="300px"
            pd="20px 16px"
            bottom="0px"
            alignItems="center">
            {modal?.modalComponent !== undefined && <RenderItem />}
          </PositionBox>
        )}
      </Container>
    </Modal>
  );
}
