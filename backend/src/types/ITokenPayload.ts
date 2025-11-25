export interface ITokenPayload {
  id: string;
  email: string;
  role: string;
  password?: string;
  username?: string;
  iat?: number;
  exp?: number;
}
