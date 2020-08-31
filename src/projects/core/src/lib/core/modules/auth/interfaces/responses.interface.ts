export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
    role: string;
    expires: number;
}

export interface IMeResponse {
  id: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
}
