## 페달체크

### 파일 구조

-   src
    -   API [ 기능별로 대분류로 나눠져있습니다. ]
    -   assets [ image,global,fonts 파일 ]
    -   Component [ 컴포넌트 ]
    -   Hooks [ 커스텀훅 ]
    -   Page [ 앱 라우팅이 페이지별 대분류로 나뉘어 있습니다. ]
    -   Store [ Redux 전역상태관리 ]
    -   Util [ 각종 Util 파일 ]

### 앱 라우팅

구조는 [ 대분류 / 소분류 or 파일 ]

-   Router.js : 전체 라우팅 관리 및 공통 기능 사용 페이지
-   BikeManagement
    -   BikeDetail.js : 자전거 상세 페이지
    -   BikeManagement.js : 자전거 관리 페이지
    -   BikeRegister.js : 자전거 생성 페이지
    -   BikeRegisterFirst.js : 자전거 첫 생성 페이지
    -   BikeRepairHistory.js : 자전거 정비 내역 페이지
    -   BikeRepairHistoryDetail.js : 자전거 정비 내역 상세 페이지
    -   BikeUpdate.js : 자전거 수정 페이지
-   Customer
    -   Customer.js : 정비소관리자 - 고객 페이지
    -   CustomerDetail.js : 정비소관리자 - 고객 상세 페이지
-   Feed
    -   Feed.js : 피드 페이지
-   Home
    -   Home.js : 맨 처음 화면 홈 페이지
    -   IdentityVerification.js : 본인인증 모듈
    -   Login.js : 로그인
    -   Maps.js : 지도 검색 페이지
    -   Register.js : 회원 가입 페이지
    -   RegisterAdditional.js : 회원 가입 추가 정보 입력 페이지
    -   RegisterInformation.js : 회원 가입 정보 입력 페이지
-   More
    -   AlarmSetting.js : 알림 셋팅 페이지
    -   FAQ.js : 자주 묻는 질문 페이지
    -   More.js : 더보기 페이지
    -   Post.js : 공지 페이지
    -   PrivacyPolicy.js : 개인 정보 처리 방침 페이지
    -   Question.js : 1:1문의 페이지
    -   QuestionWrite.js : 1:1문의 작성 페이지
-   Coupon
    -   CouponUseBikeSelect.js : 쿠폰 예약 - 자전거 선택
    -   CouponUseComplete.js : 쿠폰 예약 - 완료
    -   CouponUseDateSelect.js : 쿠폰 예약 - 날짜 선택
    -   CouponUseRepair.js : 쿠폰 예약 - 정비 선택
    -   CouponUseRequest.js : 쿠폰 예약 - 요청사항 선택
-
-   MyInformation
    -   BlindList.js : 차단 내역 페이지
    -   CouponDownload.js : 쿠폰 다운로드 페이지
    -   CouponManagement.js : 쿠폰 관리 페이지
    -   Information.js : 내 정보 선택 페이지
    -   LikeShop.js : 관심 목록 페이지
    -   RepairHistory.js : 정비 내역 리스트 페이지
    -   RepairHistoryDetail.js : 정비 내역 상세 보기
    -   ShopUpdate.js : 업체 정보 수정 페이지
    -   Update.js : 내 정보 수정 페이지
    -   UpdateHome.js : 내 정보 수정 홈 페이지
-   MyShop
    -   BikeExport.js : 자전거 출고 상세 페이지
    -   BikeExportList.js : 자전거 출고 리스트 페이지
    -   Coupon.js : 쿠폰 관리 페이지
    -   CouponDetail.js : 쿠폰 관리 상세 페이지
    -   CouponIssue.js : 쿠폰 발급 페이지
    -   ExportRegister.js : 자전거 출고 폼 페이지
    -   ProductManagement.js : 정비 상품 관리 페이지
    -   ProductRegister.js : 정비 상품 작성 페이지
-   Repair
    -   Payment.js : 아임포트 결제 페이지
    -   ProductDetail.js : 정비 상품 상세보기 페이지
    -   RepairHome.js : 정비 홈 페이지
    -   RepairQuestion.js : 정비소 문의 페이지
    -   ReservationBike.js : 일반 정비 예약 - 자전거 선택
    -   ReservationDate.js : 일반 정비 예약 - 날짜 선택
    -   ReservationPayment.js : 일반 정비 예약 - 결제 방식 선택
    -   ReservationProduct.js : 일반 정비 예약 - 정비 상품 선택
    -   ReservationRequest.js : 일반 정비 예약 - 요청 선택
    -   ReviewDetail.js : 정비소 리뷰 상세페이지
    -   ReviewHome.js : 정비소 리뷰 리스트 페이지
    -   ReviewWrite.js : 정비소 리뷰 작성 페이지
    -   Shop.js : 정비소 페이지
-   RepairHistory
    -   AdjustmentDetail.js : 정비소 관리자 - 정산 상세 페이지
    -   AdjustmentHistory.js : 정비소 관리자 - 정산 내역 페이지
    -   BikeStats.js : 정비소 관리자 - 자전거 통계
    -   BrandStats.js : 정비소 관리자 - 브랜드 통계
    -   Detail.js : 정비소 관리자 -
    -   RepairHistoryHome.js : 정비소 관리자 - 정비 내역 홈
    -   RepairHistoryReviewDetail.js : 정비소 관리자 - 정비 내역 - 리뷰 상세 페이지
    -   RepairHistorySelectHistory.js : 정비소 관리자 - 정비 내역 - 정비 내역 메뉴 페이지
    -   RepairHistorySelectHome.js : 정비소 관리자 - 정비 내역 - 홈 메뉴 페이지(정산)
    -   RepairHistorySelectQuestion.js : 정비소 관리자 - 정비 내역 - 문의 메뉴 페이지
    -   RepairHistorySelectReview.js : 정비소 관리자 - 정비 내역 - 리뷰 메뉴 페이지
    -   RepairStats.js : 정비소 관리자 - 정비 통계
-   ReservationManagement
    -   Approval.js : 정비소 관리자 - 예약 승인 페이지
    -   DateChange.js : 정비소 관리자 - 예약 날짜 변경 페이지
    -   ReservationManagement.js : 정비소 관리자 - 예약 관리 페이지
    -   ReservationManagementAll.js : 정비소 관리자 - 예약 관리 전체 페이지 // 고도화에서 빠지는 내용
    -   ReservationManagementDetail.js : 정비소 관리자 - 예약 관리 상세 페이지
