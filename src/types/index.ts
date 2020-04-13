// types
export interface IConfig {
  JWT_SECRET: string;
}

export interface IUserService {
  FindByUsername: any;
  CreateUser: any;
}

export interface INewUser {
  username: string;
  password: string;
}
