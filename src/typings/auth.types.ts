export type UserInfoType = {
  userName: string;
  [key: string]: unknown;
};

export type AuthFieldType = {
  userName?: string;
  password?: string;
  phoneNumber?: string;
};
export type LoginInfo = {
  accessToken: string;
  refreshToken: string;
  baseUserInfo: UserInfoType;
};
