import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
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
import QuestionWrite from './More/QuestionWrite';
import Coupon from './More/MyShop/Coupon';
import CouponUseBikeSelect from './More/Coupon/CouponUseBikeSelect';
import Information from './More/MyInformation/Information';
import LikeShop from './More/MyInformation/LikeShop';
import RepairHistory from './More/MyInformation/RepairHistory';
import ShopUpdate from './More/MyInformation/ShopUpdate';
import Update from './More/MyInformation/Update';
import UpdateHome from './More/MyInformation/UpdateHome';
import BikeExport from './More/MyShop/BikeExport';
import BikeExportList from './More/MyShop/BikeExportList';
import CouponDetail from './More/MyShop/CouponDetail';
import CouponIssue from './More/MyShop/CouponIssue';
import CouponManagement from './More/MyInformation/CouponManagement';
import ExportRegister from './More/MyShop/ExportRegister';
import ProductManagement from './More/MyShop/ProductManagement';
import ProductRegister from './More/MyShop/ProductRegister';
import RepairQuestion from './Repair/RepairQuestion';
import ReservationBike from './Repair/ReservationBike';
import ReservationDate from './Repair/ReservationDate';
import ReservationPayment from './Repair/ReservationPayment';
import ReservationProduct from './Repair/ReservationProduct';
import ReservationRequest from './Repair/ReservationRequest';
import ReviewDetail from './Repair/ReviewDetail';
import ReviewHome from './Repair/ReviewHome';
import ReviewWrite from './Repair/ReviewWrite';
import Payment from './Repair/Payment';
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
import {BackHandler, SafeAreaView, useWindowDimensions, View} from 'react-native';
import Theme from '@/assets/global/Theme';
import {useDispatch, useSelector} from 'react-redux';
import ModalBasic from '@/Component/Modal/ModalBasic';
import {initSetting} from '@/Store/sizeState';
import ProductDetail from './Repair/ProductDetail';
import BikeRegisterFirst from './BikeManagement/BikeRegisterFirst';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import RepairHistoryDetail from './More/MyInformation/RepairHistoryDetail';
import CouponUseComplete from './More/Coupon/CouponUseComplete';
import CouponUseDateSelect from './More/Coupon/CouponUseDateSelect';
import messaging from '@react-native-firebase/messaging';
import {setToken} from '@/Store/tokenState';
import {resetUserInfo, setUserInfo} from '@/Store/loginState';
import {showPushToastMessage, showToastMessage} from '@/Util/Toast';
import {useRef} from 'react';
import Notice from '@/Component/RepairHistory/Modal/Notice';
import ReservationManagementAll from './ReservationManagement/ReservationManagementAll';
import {fetchBannerList} from '@/Store/BannerState';
import {fetchAd} from '@/Store/AdState';
import {getStoreInfo} from '@/API/More/More';
import {setStoreInfo} from '@/Store/storeInfoState';
import {autoLoginApi} from '@/API/User/Login';
import {useState} from 'react';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsAdmin} from '@/Store/adminState';

const INIT_ROUTER_COMPONENT_NAME = 'Home'; //  라우팅 초기값

let count = 0; //  종료카운트

const Stack = createStackNavigator();

export default function Router() {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const navigationRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const getToken = async () => {
    setIsLoading(true);
    try {
      const token = await messaging().getToken();

      dispatch(setToken(token));
      autoLoginApi({
        mt_app_token: token,
      }).then(res => {
        if (res.data?.result === 'true') {
          dispatch(setUserInfo(res.data.data.data));
        }
      });
    } catch (error) {
      console.log(error, 'tokenError');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(
      initSetting({
        screenWidth: width,
        screenHeight: height, // Height 값으로 변경해주기 837.71428
        minusPadding: `380px`,
      }),
    );
  }, [height]);

  const mesagingHandler = async remoteMessage => {
    let active = false;
    while (!active) {
      if (!isLoading) {
        if (remoteMessage?.data?.intent) {
          if (remoteMessage.data.intent === 'ShopUpdate') {
            // 업체정보수정일때
            const response = await getStoreInfo({
              _mt_idx: remoteMessage.data?.content_idx,
            });
            if (response?.data?.result === 'true') {
              await dispatch(setStoreInfo(response?.data?.data?.data));
            }
            await navigationRef.current.navigate(remoteMessage?.data?.intent);
            active = true;
          } else {
            await navigationRef.current.navigate(remoteMessage?.data?.intent, {
              menu: remoteMessage?.data?.content_idx2,
              od_idx: remoteMessage?.data?.content_idx,
            });
          }

          return true;
        } else {
          return false;
        }
      }
    }
  };

  const getIsAdmin = async () => {
    try {
      const isAdmin = await AsyncStorage.getItem('isAdmin');
      if (isAdmin) {
        dispatch(setIsAdmin(true));
      } else {
        dispatch(setIsAdmin(false));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage::', remoteMessage);
      showPushToastMessage({
        remoteMessage: remoteMessage,
        onPress: () => {
          mesagingHandler(remoteMessage);
        },
      });
    });

    dispatch(fetchBannerList()); // 배너
    dispatch(fetchAd()); // 광고
    getIsAdmin();
    return () => {
      dispatch(resetUserInfo());
      unsubscribe();
    };
  }, []);

  useUpdateEffect(() => {
    //종료된 상태
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          mesagingHandler(remoteMessage);
        } else {
          return null;
        }
      }, 1000);

    //종료 안된 상태
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      mesagingHandler(remoteMessage);
    });
  }, [isLoading]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={INIT_ROUTER_COMPONENT_NAME}
        screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: forFade,
        }}>
        {RouterSetting.map((item, index) => (
          <Stack.Screen
            name={item.name}
            component={withScrollView(item.component)}
            key={item.name + index}
            options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
              gestureDirection: 'horizontal',
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const withScrollView = WrappedComponent => {
  return props => {
    const isFocus = useIsFocused();
    const navigation = useNavigation();
    useEffect(() => {
      if (!navigation?.canGoBack() && isFocus) {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
      }

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [isFocus]);

    const onBackPress = async () => {
      if (count < 1) {
        count++;
        //ToastAndroid.show('한번더 뒤로가기를 누르면 앱이 종료됩니다.', ToastAndroid.SHORT);
        showToastMessage('뒤로가기를 한번 더 누르면 앱이 종료됩니다.', 1500);
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        count = 0;
      }, 1500);

      return true;
    };
    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: Theme.color.white}}>
            <WrappedComponent {...props} />
            {isFocus && <ModalBasic navigation={props?.navigation} />}
          </View>
        </SafeAreaView>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
      </>
    );
  };
};

const RouterSetting = [
  {
    name: 'BikeRegisterFirst',
    component: BikeRegisterFirst,
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
    name: 'QuestionWrite',
    component: QuestionWrite,
  },
  {
    name: 'Coupon',
    component: Coupon,
  },
  {
    name: 'CouponUseBikeSelect',
    component: CouponUseBikeSelect,
  },
  {
    name: 'CouponUseDateSelect',
    component: CouponUseDateSelect,
  },
  {
    name: 'CouponUseComplete',
    component: CouponUseComplete,
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
    name: 'RepairHistoryDetail',
    component: RepairHistoryDetail,
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
    name: 'BikeExportList',
    component: BikeExportList,
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
    name: 'Payment',
    component: Payment,
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
    name: 'ReservationManagementAll',
    component: ReservationManagementAll,
  },
  {
    name: 'ReservationManagementDetail',
    component: ReservationManagementDetail,
  },
  {
    name: 'RepairHome',
    component: RepairHome,
  },
  {
    name: 'Notice',
    component: Notice,
  },
];
const forFade = ({current}) => {
  return {
    cardStyle: {opacity: current.progress},
  };
};
