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
  CreateItem(benchItem: INewBenchItem): Promise<boolean>;
}

export interface INewBenchItem {
  title: string;
  description: string;
  locationId: number;
  commitmentTypeId: number;
  points: number;
}
