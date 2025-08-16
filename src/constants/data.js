import icons from './icons';

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
    screen: null,
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
  { title: 'Đặt khám theo gói', icon: icons.booking, screen: 'booking' },
  { title: 'Đặt khám theo chuyên gia', icon: icons.booking, screen: null },
  { title: 'Đặt khám theo ngày', icon: icons.booking, screen: null },
  { title: 'Lịch hẹn khám', icon: icons.calendar, screen: null },
  { title: 'Kết quả khám', icon: icons.shield, screen: null },
  { title: 'Tra cứu hoá đơn', icon: icons.bill, screen: null },
  { title: 'Lịch sử thanh toán', icon: icons.payment, screen: null },
  { title: 'Tư vấn đặt lịch', icon: icons.support, screen: null },
];

export const allFacilities = [
  {
    name: 'Bệnh viện Ung Bướu - Cơ sở 1',
    address: 'Số 6 Nguyễn Huy Lượng, Phường Bình Thạnh, TP. Hồ Chí Minh',
    phone: '(028) 38433022',
    schedule: 'Thứ 2 - Thứ 6 (07:30 - 16:30)',
  },
  {
    name: 'Bệnh viện Ung Bướu - Cơ sở 2',
    address: 'Số 12 Đường 400, Phường Tăng Nhơn Phú, TP. Hồ Chí Minh',
    phone: '(028) 36227722 - (028) 38433021',
    schedule: 'Thứ 2 - Thứ 6 (07:30 - 16:30)',
  },
];
