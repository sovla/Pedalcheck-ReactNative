import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import BikeDetail from './BikeManagement/BikeDetail';
import BikeManagement from './BikeManagement/BikeManagement';
import BikeRegister from './BikeManagement/BikeRegister';
import BikeRepairHistory from './BikeManagement/BikeRepairHistory';
import BikeRepairHistoryDetail from './BikeManagement/BikeRepairHistoryDetail';
import BikeUpdate from './BikeManagement/BikeUpdate';
import Customer from './Customer/Customer';
import CustomerDetail from './Customer/CustomerDetail';
import Feed from './Feed/Feed';
import Login from './Home/Login';
import Register from './Home/Register';
import RegisterAdditional from './Home/RegisterAdditional';
import RegisterInformation from './Home/RegisterInformation';
import Home from './Home/Home';
import AlarmSetting from './More/AlarmSetting';
import FAQ from './More/FAQ';
import More from './More/More';
import Post from './More/Post';
import PrivacyPolicy from './More/PrivacyPolicy';
import Question from './More/Question';
import Coupon from './More/MyInformation/Coupon';
import Information from './More/MyInformation/Information';
import LikeShop from './More/MyInformation/LikeShop';
import RepairHistory from './More/MyInformation/RepairHistory';
import ShopUpdate from './More/MyInformation/ShopUpdate';
import Update from './More/MyInformation/Update';
import UpdateHome from './More/MyInformation/UpdateHome';
import BikeExport from './More/MyShop/BikeExport';
import CouponDetail from './More/MyShop/CouponDetail';
import CouponIssue from './More/MyShop/CouponIssue';
import CouponManagement from './More/MyShop/CouponManagement';
import ExportRegister from './More/MyShop/ExportRegister';
import ProductManagement from './More/MyShop/ProductManagement';
import ProductRegister from './More/MyShop/ProductRegister';
import RepairQuestion from './Repair/Question';
import ReservationBike from './Repair/ReservationBike';
import ReservationDate from './Repair/ReservationDate';
import ReservationPayment from './Repair/ReservationPayment';
import ReservationProduct from './Repair/ReservationProduct';
import ReservationRequest from './Repair/ReservationRequest';
import ReviewDetail from './Repair/ReviewDetail';
import ReviewHome from './Repair/ReviewHome';
import ReviewWrite from './Repair/ReviewWrite';
import Shop from './Repair/Shop';
import AdjustmentHistory from './RepairHistory/AdjustmentHistory';
import BikeStats from './RepairHistory/BikeStats';
import BrandStats from './RepairHistory/BrandStats';
import Detail from './RepairHistory/Detail';
import RepairHistoryHome from './RepairHistory/RepairHistoryHome';
import RepairStats from './RepairHistory/RepairStats';
import RepairHistoryReviewDetail from './RepairHistory/RepairHistoryReviewDetail';
import Approval from './ReservationManagement/Approval';
import DateChange from './ReservationManagement/DateChange';
import ReservationManagement from './ReservationManagement/ReservationManagement';
import ReservationManagementDetail from './ReservationManagement/ReservationManagementDetail';
import RepairHome from './Repair/RepairHome';
import {SafeAreaView, useWindowDimensions, View} from 'react-native';
import Theme from '@/assets/global/Theme';
import {useDispatch, useSelector} from 'react-redux';
import ModalBasic from '@/Component/Modal/ModalBasic';
import {initSetting} from '@/Store/sizeState';
import ProductDetail from './Repair/ProductDetail';
import BikeRegisterFirst from './BikeManagement/BikeRegisterFirst';

const INIT_ROUTER_COMPONENT_NAME = 'Home';

const Stack = createNativeStackNavigator();

const withScrollView = WrappedComponent => {
  return props => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: Theme.color.white}}>
          <WrappedComponent {...props} />
        </View>
      </SafeAreaView>
    );
  };
};

export default function Router() {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const modalState = useSelector(state => state.modal);

  useEffect(() => {
    dispatch(
      initSetting({
        screenWidth: width,
        screenHeight: height, // Height 값으로 변경해주기 837.71428
        minusPadding: `380px`,
      }),
    );

    return () => {};
  }, [height]);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={INIT_ROUTER_COMPONENT_NAME}
          screenOptions={{
            headerShown: false,
          }}>
          {RouterSetting.map(item => (
            <Stack.Screen
              name={item.name}
              component={withScrollView(item.component)}
              key={item.name}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
      {modalState.isOpenModal && <ModalBasic />}
    </>
  );
}

const RouterSetting = [
  {
    name: 'BikeRegisterFirst',
    component: BikeRegisterFirst,
  },
  {
    name: 'ModalBasic',
    component: ModalBasic,
  },
  {
    name: 'BikeRegister',
    component: BikeRegister,
  },
  {
    name: 'BikeDetail',
    component: BikeDetail,
  },
  {
    name: 'BikeManagement',
    component: BikeManagement,
  },
  {
    name: 'BikeRepairHistory',
    component: BikeRepairHistory,
  },
  {
    name: 'BikeRepairHistoryDetail',
    component: BikeRepairHistoryDetail,
  },
  {
    name: 'BikeUpdate',
    component: BikeUpdate,
  },
  {
    name: 'Customer',
    component: Customer,
  },
  {
    name: 'CustomerDetail',
    component: CustomerDetail,
  },
  {
    name: 'Feed',
    component: Feed,
  },
  {
    name: 'Login',
    component: Login,
  },

  {
    name: 'Register',
    component: Register,
  },
  {
    name: 'RegisterAdditional',
    component: RegisterAdditional,
  },
  {
    name: 'RegisterInformation',
    component: RegisterInformation,
  },
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'AlarmSetting',
    component: AlarmSetting,
  },
  {
    name: 'FAQ',
    component: FAQ,
  },
  {
    name: 'Post',
    component: Post,
  },
  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
  },
  {
    name: 'More',
    component: More,
  },
  {
    name: 'Question',
    component: Question,
  },
  {
    name: 'Coupon',
    component: Coupon,
  },
  {
    name: 'Information',
    component: Information,
  },
  {
    name: 'LikeShop',
    component: LikeShop,
  },
  {
    name: 'RepairHistory',
    component: RepairHistory,
  },
  {
    name: 'ShopUpdate',
    component: ShopUpdate,
  },
  {
    name: 'Update',
    component: Update,
  },
  {
    name: 'UpdateHome',
    component: UpdateHome,
  },
  {
    name: 'BikeExport',
    component: BikeExport,
  },
  {
    name: 'CouponDetail',
    component: CouponDetail,
  },
  {
    name: 'CouponIssue',
    component: CouponIssue,
  },
  {
    name: 'CouponManagement',
    component: CouponManagement,
  },
  {
    name: 'ExportRegister',
    component: ExportRegister,
  },
  {
    name: 'ProductManagement',
    component: ProductManagement,
  },
  {
    name: 'ProductRegister',
    component: ProductRegister,
  },
  {
    name: 'RepairQuestion',
    component: RepairQuestion,
  },
  {
    name: 'ReservationBike',
    component: ReservationBike,
  },
  {
    name: 'ReservationDate',
    component: ReservationDate,
  },

  {
    name: 'ReservationPayment',
    component: ReservationPayment,
  },
  {
    name: 'ReservationProduct',
    component: ReservationProduct,
  },
  {
    name: 'ReservationRequest',
    component: ReservationRequest,
  },
  {
    name: 'ProductDetail',
    component: ProductDetail,
  },

  {
    name: 'ReviewDetail',
    component: ReviewDetail,
  },
  {
    name: 'ReviewHome',
    component: ReviewHome,
  },
  {
    name: 'ReviewWrite',
    component: ReviewWrite,
  },
  {
    name: 'Shop',
    component: Shop,
  },
  {
    name: 'AdjustmentHistory',
    component: AdjustmentHistory,
  },
  {
    name: 'BikeStats',
    component: BikeStats,
  },
  {
    name: 'BrandStats',
    component: BrandStats,
  },
  {
    name: 'Detail',
    component: Detail,
  },
  {
    name: 'RepairHistoryHome',
    component: RepairHistoryHome,
  },
  {
    name: 'RepairStats',
    component: RepairStats,
  },
  {
    name: 'RepairHistoryReviewDetail',
    component: RepairHistoryReviewDetail,
  },
  {
    name: 'Approval',
    component: Approval,
  },
  {
    name: 'DateChange',
    component: DateChange,
  },
  {
    name: 'ReservationManagement',
    component: ReservationManagement,
  },

  {
    name: 'ReservationManagementDetail',
    component: ReservationManagementDetail,
  },
  {
    name: 'RepairHome',
    component: RepairHome,
  },
];
