const Role = {
  ADMIN: 'ROLE_ADMIN',
  EXAM: 'ROLE_EXAM',
  CLASS: 'ROLE_CLASS',
  COURSE: 'ROLE_COURSE',
  USER: 'ROLE_USER',
};
Object.freeze(Role);

const ClassStatus = {
  // FULL: { key: 'FULL', value: 'Lớp đầy', color: 'gold' },
  ONGOING: { key: 'ONGOING', value: 'Chờ đăng ký', color: 'cyan' },
  ACCEPT: { key: 'ACCEPT', value: 'Đã mở lớp', color: 'green' },
  CANCEL: { key: 'CANCEL', value: 'Đã huỷ lớp', color: 'red' },
};
Object.freeze(ClassStatus);

const DayOfWeek = {
  MON: { key: 'MONDAY', value: 'Thứ 2', acronym: 'Mon' },
  TUE: { key: 'TUESDAY', value: 'Thứ 3', acronym: 'Tue' },
  WED: { key: 'WEDNESDAY', value: 'Thứ 4', acronym: 'Web' },
  THU: { key: 'THURSDAY', value: 'Thứ 5', acronym: 'Thu' },
  FRI: { key: 'FRIDAY', value: 'Thứ 6', acronym: 'Fri' },
  SAT: { key: 'SATURDAY', value: 'Thứ 7', acronym: 'Sat' },
  SUN: { key: 'SUNDAY', value: 'Chủ nhật', acronym: 'Sun' },
};

Object.freeze(DayOfWeek);

const UserClassStatus = {
  NEW: {
    key: 'NEW',
    value: 'Đăng ký mới',
    color: 'cyan',
    state: ['NEW', 'CALLED'],
  },
  CALLED: {
    key: 'CALLED',
    value: 'Đã liên hệ',
    color: 'gold',
    state: ['NEW', 'CALLED', 'CANCEL', 'ACCEPT'],
  },
  ACCEPT: {
    key: 'ACCEPT',
    value: 'Đăng ký thành công',
    color: 'green',
    state: ['CALLED', 'ACCEPT'],
  },
  CANCEL: {
    key: 'CANCEL',
    value: 'Huỷ đăng ký',
    color: 'red',
    state: ['CALLED', 'CANCEL'],
  },
};
Object.freeze(UserClassStatus);

const ROLE_OPTIONS = [
  {
    value: 'ROLE_EXAM',
    label: 'exam',
  },
  {
    value: 'ROLE_COURSE',
    label: 'course',
  },
  {
    value: 'ROLE_CLASS',
    label: 'class',
  },
];

const SESSION = [
  {},
  {
    key: '1',
    value: 'Ca 1',
    time: '8h30-11h30',
  },
  {
    key: '2',
    value: 'Ca 2',
    time: '14h00-17h00',
  },
  {
    key: '3',
    value: 'Ca 3',
    time: '17h45-19h15',
  },
  {
    key: '4',
    value: 'Ca 4',
    time: '19h45-21h15',
  },
];

const ERROR_IMAGE =
  'data:image/png;base64,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';

const RESEND_OTP_TIME_LIMIT = 60;

const StandardDate = {
  // dd/mm/yyyy
  PATTERN: /(\d{2})\/(\d{2})\/(\d{4})/,
  // yyyy-mm-dd
  FORMAT: '$3-$2-$1',
};

const constants = {
  Role,
  ClassStatus,
  DayOfWeek,
  UserClassStatus,
  ROLE_OPTIONS,
  ERROR_IMAGE,
  RESEND_OTP_TIME_LIMIT,
  SESSION,
  StandardDate,
};

export default constants;

const now = new Date();

export const myEventsList = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2022, 3, 0),
    end: new Date(2022, 3, 1),
  },
  {
    id: 14,
    title: 'Today',
    // start: new Date(new Date().setHours(new Date().getHours() - 3)),
    // end: new Date(new Date().setHours(new Date().getHours() + 3)),start: new Date(2022, 5, 1, 17, 0, 0, 0),
    start: new Date(2022, 4, 1, 17),
    end: new Date(2022, 4, 1, 19, 30),
    description: 'Most important meal of the day',
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
  {
    id: 16,
    title: 'Video Record',
    start: new Date(2022, 3, 14, 15, 30, 0),
    end: new Date(2022, 3, 14, 19, 0, 0),
  },
];
