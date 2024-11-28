export interface AuthLogin {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  username: string;
  name: string;
  email: string;
  picture?: string;
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
}
