// types
export interface IConfig {
  JWT_SECRET: string;
}

export interface IUserService {
  FindByUsername: any;
  CreateUser: any;
  Login: any;
}

export interface INewUser {
  username: string;
  password: string;
}
