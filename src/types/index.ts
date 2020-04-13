// types
export interface IConfig {
  JWT_SECRET: string;
}

export interface IUserService {
  FindByUsername(username: string): any;
  CreateUser(data: INewUser): any;
  Login(data: INewUser): any;
}

export interface INewUser {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
}

export interface IBenchService {
  ListBenchItems: any;
}
