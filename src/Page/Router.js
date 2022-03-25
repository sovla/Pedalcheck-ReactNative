import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import {useDispatch} from 'react-redux';
import ModalBasic from '@/Component/Modal/ModalBasic';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsAdmin} from '@/Store/adminState';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import IdentityVerification from './Home/IdentityVerification';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AdjustmentDetail from './RepairHistory/AdjustmentDetail';
import {PositionBox} from '@/assets/global/Container';
import {DarkBoldText} from '@/assets/global/Text';

let count = 0; //  종료카운트

const Stack = createStackNavigator();

const forFade = ({current}) => {
  return {
    cardStyle: {opacity: current.progress},
  };
};

export default function Router() {
  const dispatch = useDispatch();

  const navigationRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isToken, setIsToken] = useState(false);
  const [isGetAdmin, setIsGetAdmin] = useState(false);

  const getIsAdmin = async () => {
    try {
      const isAdmin = await AsyncStorage.getItem('isAdmin');

      setIsGetAdmin(true);
      if (isAdmin === 'true') {
        dispatch(setIsAdmin(true));
      } else {
        dispatch(setIsAdmin(false));
      }
    } catch (error) {}
  };
  const getToken = async () => {
    try {
      if (!isToken) {
        const token = await messaging().getToken();

        dispatch(setToken(token));
        const response = await autoLoginApi({
          mt_app_token: token,
        }).then(res => {
          if (res.data?.result === 'true') {
            dispatch(setUserInfo(res.data.data.data));
          }
          return res;
        });
        setIsToken(true);
      }

      if (+response.data.data?.data?.mt_level === 5 && +response.data.data?.data?.mt_seller === 2 && !isGetAdmin) {
        await getIsAdmin();
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        SplashScreen.hide();
        setIsLoading(false);
      }, 500);
    }
  };

  const mesagingHandler = async remoteMessage => {
    try {
      if (isLoading) {
        await getToken();
      }

      if (remoteMessage?.data?.intent) {
        if (remoteMessage.data.intent === 'ShopUpdate') {
          // 업체정보수정일때
          await getToken();
          const response = await getStoreInfo({
            _mt_idx: remoteMessage.data?.content_idx,
          });
          if (response?.data?.result === 'true') {
            await dispatch(setStoreInfo(response?.data?.data?.data));
          }
          await navigationRef?.current?.navigate(remoteMessage?.data?.intent);
        } else if (remoteMessage.data.intent === 'RepairHistoryHome') {
          await navigationRef?.current?.navigate(remoteMessage?.data?.intent, {
            menu: remoteMessage.data.content_idx,
          });
        } else if (remoteMessage.data.intent === 'logout') {
          //로그아웃일때
          // dispatch(resetSnsInfo());
          // dispatch(resetUserInfo());
          // dispatch(ResetStoreInfo());
          // dispatch(setIsAdmin(false));
          // await AsyncStorage.removeItem('isAdmin');
          // navigationRef.current.reset({routes: [{name: 'Home'}]});
        } else {
          await navigationRef?.current?.navigate(remoteMessage?.data?.intent, {
            menu: remoteMessage?.data?.content_idx2,
            od_idx: remoteMessage?.data?.content_idx,
            mt_idx: remoteMessage?.data?.content_idx,
          });
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {}
  };

  const handleDynamicLink = async link => {
    await getToken();
    //  다이나믹 링크 실행 함수
    //  알림톡으로 들어오는 경우는 3가지 매장에 1:1문의, 예약 정보 확인사용자 , 예약 정보 확인 관리자
    //
    if (link?.url) {
      try {
        const queryString = link?.url.split('https://pedalcheck/')[1].split(',');
        const intent = queryString[0].split('=')[1];
        let items = {};
        for (const item of queryString) {
          if (
            item.includes('od_idx') ||
            item.includes('mt_idx') ||
            item.includes('mst_name') ||
            item.includes('type')
          ) {
            const [key, value] = item.split('=');
            Object.assign(items, {
              [key]: value,
            });
          }
        }
        //  다이나믹 링크 확인용
        console.log('다이나믹링크 \n', link.url, '\nqueryStirng :::', queryString, '\nitems :::', items);
        navigationRef?.current?.navigate(intent, items);
        return;
      } catch (error) {}
    }
  };

  useEffect(() => {
    try {
      getToken();
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        showPushToastMessage({
          remoteMessage: remoteMessage,
          onShow: () => {
            if (remoteMessage?.data?.intent === 'logout') {
              getToken();
            } else if (remoteMessage?.data?.intent === 'ShopUpdate') {
              getToken();
            }
          },
          onPress: () => {
            mesagingHandler(remoteMessage);
            Toast.hide();
          },
        });
      });

      dispatch(fetchBannerList()); // 배너
      dispatch(fetchAd()); // 광고
    } catch (error) {}

    return () => {
      try {
        dispatch(resetUserInfo());
        unsubscribe();
        setIsLoading(true);
        setIsGetAdmin(false);
        setIsToken(false);
      } catch (error) {}
    };
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    //다이나믹 링크용
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink); // 포그라운드 열려있을때

    dynamicLinks().getInitialLink().then(handleDynamicLink); // 백그라운드 일때
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
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
    useEffect(() => {
      if (!navigation?.canGoBack() && isFocus) {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
      }

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [isFocus]);

    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: Theme.color.white}}>
            <WrappedComponent {...props} />
            {isFocus && <ModalBasic navigation={props?.navigation} />}
            <PositionBox backgroundColor="#0000" flexDirection="row" top="0px" right="0px" zIndex={3000}>
              <DarkBoldText>{props.route.name}</DarkBoldText>
            </PositionBox>
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
    name: 'IdentityVerification',
    component: IdentityVerification,
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
    name: 'AdjustmentDetail',
    component: AdjustmentDetail,
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
