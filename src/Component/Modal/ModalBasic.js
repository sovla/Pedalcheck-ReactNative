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
import SearchShop from '../More/Modal/SearchShop';
import DaumPostCode from '../More/Modal/DaumPostCode';
import PaymentInformationCheck from '../Repair/Modal/PaymentInformationCheck';
import AdjustmentHistory from '../RepairHistory/Modal/AdjustmentHistory';
import Notice from '../RepairHistory/Modal/Notice';
import QuestionSubmit from '../RepairHistory/Modal/QuestionSubmit';
import QuestionUpdate from '../RepairHistory/Modal/QuestionUpdate';
import RepairRejection from '../ReservationManagement/Modal/RepairRejection';
import AlertModal from './AlertModal';
import SearchBrand from '../More/Modal/SearchBrand';
import SearchTag from '../More/Modal/SearchTag';
import SearchId from '../More/Modal/SearchId';
import BikeBrand from '../BikeManagement/Modal/BikeBrand';
import RepairDatePicker from '../Home/Modal/RepairDatePicker';
import Ad from './Ad';
import Privacy from '../Home/Modal/Privacy';
import Report from './Report';

// 2022-01-04 08:31:15
// Junhan
// 모달 키는 곳 3가지 타입이 있다
// slide, fullSize, default
// 사용법 modal.modalComponent에 원하는 값을 넣고 switch문을 추가하면 됩니다.

export default function ModalBasic() {
  const {modal} = useSelector(state => state);
  const dispatch = useDispatch();

  if (modal?.isOpenModal !== true) {
    return null;
  }
  let RenderItem = <></>;

  const childrenProps = modal?.modalProp ? modal.modalProp : {}; // 모달 프롭 넣는 부분
  const selectRenderItem = () => {
    switch (modal?.modalComponent) {
      case 'service':
        return Service;
      case 'privacy':
        return Privacy;
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
      case 'bikeModelStepTwo':
        return BikeModel;
      case 'bikeModel':
        return BikeBrand;
      case 'vehicleNumber':
        return VehicleNumber;
      case 'repairRejection':
        return RepairRejection;
      case 'reservationCancle':
        return ReservationCancle;
      case 'deleteAccount':
        return DeleteAccount;
      case 'slide/repairDatePicker':
        return RepairDatePicker;
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
      case 'fullSize/DaumPostCode':
        return DaumPostCode;
      case 'searchShop':
        return SearchShop;
      case 'SearchBrand':
        return SearchBrand;
      case 'SearchTag':
        return SearchTag;
      case 'searchId':
        return SearchId;
      case 'ad':
        return Ad;
      case 'report':
        return Report;
      default:
        return AlertModal;
    }
  };

  const isSlide = modal?.modalComponent?.split('/')[0] === 'slide';
  const isFullSize = modal?.modalComponent?.split('/')[0] === 'fullSize';
  RenderItem = selectRenderItem();

  if (RenderItem !== <></>) {
    return (
      <Modal
        animationType={!isSlide ? 'fade' : 'fade'}
        transparent={true}
        visible={modal.isOpenModal}
        onRequestClose={() => {
          dispatch(modalClose());
        }}>
        {isFullSize ? (
          // 풀사이즈 일때
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
              // 슬라이드형 아닐때 기본
              <Box
                backgroundColor={Theme.color.white}
                width="380px"
                minHeight="150px"
                borderRadius="15px"
                pd="20px 16px"
                alignItems="center">
                {modal?.modalComponent !== undefined && <RenderItem {...childrenProps} />}
              </Box>
            ) : (
              // 슬라이드형 바닥에서 올라오는거
              <PositionBox
                style={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}
                backgroundColor={Theme.color.white}
                minWidth={412}
                minHeight="200px"
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
