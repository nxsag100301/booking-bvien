import icons from './icons';
// const Pdf = require('../assets/pdf/mockPdf.pdf');

// export const mockPdf = Pdf;

export const mockData = [
  {
    icon: icons.booking,
    label: 'Đặt khám',
    screen: 'booking',
  },
  {
    icon: icons.history,
    label: 'Lịch sử khám',
    screen: 'medicalHistory',
  },
  {
    icon: icons.person,
    label: 'Hồ sơ sức khỏe',
    screen: 'testPdf',
  },
  // {
  //   icon: icons.history,
  //   label: 'Lịch sử tiêm chủng',
  //   screen: null,
  // },
  {
    icon: icons.payment,
    label: 'Lịch sử thanh toán',
    screen: 'paymentHistory',
  },
  // {
  //   icon: icons.shield,
  //   label: 'Cận lâm sàng khám bệnh ngoại trú',
  //   screen: null,
  // },
  {
    icon: icons.calendar,
    label: 'Xem thống kê',
    screen: 'report',
  },
  // {
  //   icon: icons.wallet,
  //   label: 'Hóa đơn GTGT',
  //   screen: null,
  // },
  // {
  //   icon: icons.run,
  //   label: 'Theo dõi sức khỏe',
  //   screen: null,
  // },
  // {
  //   icon: icons.support,
  //   label: 'Hỗ trợ',
  //   screen: null,
  // },
];

export const settings = [
  {
    title: 'My Bookings',
    icon: icons.calendar,
    screen: null,
  },
  {
    title: 'Payments',
    icon: icons.wallet,
    screen: null,
  },
  {
    title: 'Profile',
    icon: icons.person,
    screen: 'profile',
  },
  {
    title: 'Notifications',
    icon: icons.bell,
    screen: null,
  },
  {
    title: 'Security',
    icon: icons.shield,
    screen: null,
  },
  {
    title: 'Language',
    icon: icons.language,
    screen: null,
  },
  {
    title: 'Help Center',
    icon: icons.info,
    screen: null,
  },
  {
    title: 'Invite Friends',
    icon: icons.people,
    screen: null,
  },
];

export const homeMenu = [
  { title: 'Đặt khám theo gói', icon: icons.booking, screen: '/' },
  { title: 'Đặt khám theo chuyên gia', icon: icons.booking, screen: '/' },
  { title: 'Đặt khám theo ngày', icon: icons.booking, screen: '/' },
  { title: 'Lịch hẹn khám', icon: icons.calendar, screen: '/' },
  { title: 'Kết quả khám', icon: icons.shield, screen: '/' },
  { title: 'Tra cứu hoá đơn', icon: icons.bill, screen: '/' },
  { title: 'Lịch sử thanh toán', icon: icons.payment, screen: '/' },
  { title: 'Tư vấn đặt lịch', icon: icons.support, screen: '/' },
];
