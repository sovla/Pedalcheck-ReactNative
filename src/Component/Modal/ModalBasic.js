import {Box, Container, PositionBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import BikeModel from '../BikeManagement/Modal/BikeModel';
import VehicleNumber from '../BikeManagement/Modal/VehicleNumber';
import DatePicker from '../Home/Modal/DatePicker';
import ImagePicker from '../Home/Modal/ImagePicker';
import LocationPicker from '../Home/Modal/LocationPicker';
import Service from '../Home/Modal/Service';
import ThirdParty from '../Home/Modal/ThirdParty';
import DeleteAccount from '../More/Modal/DeleteAccount';
import QuestionDelete from '../More/Modal/QuestionDelete';
import ReservationCancle from '../More/Modal/ReservationCancle';
import DaumPostMadal from '../MyInformation/DaumPostMadal';
import PaymentInformationCheck from '../Repair/Modal/PaymentInformationCheck';
import AdjustmentHistory from '../RepairHistory/Modal/AdjustmentHistory';
import Notice from '../RepairHistory/Modal/Notice';
import QuestionSubmit from '../RepairHistory/Modal/QuestionSubmit';
import QuestionUpdate from '../RepairHistory/Modal/QuestionUpdate';
import RepairRejection from '../ReservationManagement/Modal/RepairRejection';
import AlertModal from './AlertModal';

// 2022-01-04 08:31:15
// Junhan
// 모달 키는 곳 3가지 타입이 있다
// slide, fullSize, default
// 사용법 modal.modalComponent에 원하는 값을 넣고 switch문을 추가하면 됩니다.

export default function ModalBasic() {
  const modal = useSelector(state => state.modal);
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();
  let RenderItem = <></>;

  const childrenProps = modal?.modalProp; // 모달 프롭 넣는 부분

  const selectRenderItem = () => {
    switch (modal?.modalComponent) {
      case 'service':
        return Service;
      case 'privacy':
        return Service;
      case 'location':
        return Service;
      case 'thirdParty':
        return ThirdParty;
      case 'marketing':
        return Service;
      case 'locationPicker':
        return LocationPicker;
      case 'locationPickerDetail':
        return LocationPicker;
      case 'slide/selectImage':
        return ImagePicker;
      case 'slide/birthDate':
        return DatePicker;
      case 'paymentInformationCheck':
        return PaymentInformationCheck;
      case 'bikeModel':
        return BikeModel;
      case 'bikeModelStepTwo':
        return BikeModel;
      case 'vehicleNumber':
        return VehicleNumber;
      case 'repairRejection':
        return RepairRejection;
      case 'reservationCancle':
        return ReservationCancle;
      case 'deleteAccount':
        return DeleteAccount;
      case 'slide/repairDatePicker':
        return DatePicker;
      case 'fullSize/notice':
        return Notice;
      case 'adjustmentHistory':
        return AdjustmentHistory;
      case 'questionDelete':
        return QuestionDelete;
      case 'questionUpdate':
        return QuestionUpdate;
      case 'questionSubmit':
        return QuestionSubmit;
      case 'alertModal':
        return AlertModal;
      case 'daumPostModal':
        return DaumPostMadal;
    }
  };

  const isSlide = modal?.modalComponent?.split('/')[0] === 'slide';
  const isFullSize = modal?.modalComponent?.split('/')[0] === 'fullSize';
  if (modal?.isOpenModal !== true) {
    return null;
  }
  RenderItem = selectRenderItem();
  if (RenderItem !== <></>) {
    return (
      <Modal
        animationType={!isSlide ? 'none' : 'none'}
        transparent={true}
        visible={modal.isOpenModal}
        onRequestClose={() => {
          dispatch(modalClose());
        }}>
        {isFullSize ? (
          <Container alignItems="center" zIndex="200">
            {modal?.modalComponent !== undefined && <RenderItem {...childrenProps} />}
          </Container>
        ) : (
          <Container
            backgroundColor={Theme.color.dimmer}
            justifyContent={isSlide ? 'flex-end' : 'center'}
            alignItems="center"
            zIndex="200">
            {!isSlide ? (
              <Box
                backgroundColor={Theme.color.white}
                width={size.minusPadding}
                minHeight="150px"
                borderRadius="15px"
                pd="20px 16px"
                alignItems="center">
                {modal?.modalComponent !== undefined && <RenderItem {...childrenProps} />}
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
                {modal?.modalComponent !== undefined && <RenderItem {...childrenProps} />}
              </PositionBox>
            )}
          </Container>
        )}
      </Modal>
    );
  }
}
