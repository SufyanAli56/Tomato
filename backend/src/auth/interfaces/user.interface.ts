export interface IUser {
    fullName: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
  }
  
  export interface IUserResponse {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }
  
  export interface ISignInResponse {
    access_token: string;
    user: IUserResponse;
  }
  
  export interface IJwtPayload {
    email: string;
    sub: string;
    role: string;
    iat?: number;
    exp?: number;
  }