export const SIGNUP_TEXT = {
  welcome: '수영인들을 위한 소통 창구',
  notification: {
    first: '원활한 서비스 이용을 위해',
    second: '회원 가입 혹은 로그인을 진행해 주세요.',
  },
  provider: {
    google: '구글로 계속하기',
    kakao: '카카오로 계속하기',
    naver: '네이버로 계속하기',
  },
  helper: {
    first: 'Just Swim은 SNS 계정 연동을 통해서 회원가입 할 수 있습니다.',
    second: '이 과정에서 고객님의 데이터는 철저하게 보호됨을 알려드립니다.',
  },
} as const;

export const SELECT_TEXT = {
  notification: {
    first: '원활한 서비스 이용을 위해',
    second: '회원 타입을 선택해주세요.',
  },
  userType: {
    instructor: '수영 강사',
    customer: '수강생',
  },
  helper: {
    first: '이후 회원타입 변경이 불가능합니다.',
    instructor: {
      first: '수영 강습 이력을',
      second: '보유하신 분',
    },
    customer: {
      first: '수영 강습 수강생',
      second: '혹은 보호자',
    },
  },
} as const;

export const SET_PROFILE_TEXT = {
  notification: {
    instructor: '강사 분들이 알아볼 수 있도록',
    customer: '수강생 분들이 알아볼 수 있도록',
    common: {
      first: '프로필 이미지와 이름을 설정해주세요.',
      second: '이후 언제든 변경 가능합니다.',
    },
  },
} as const;

export const SIGNUP_COMPLETE_TEXT = {
  notification: '환영합니다!',
} as const;
