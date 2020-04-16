export interface IConfig {
  JWT_SECRET: string;
}

export interface IUserService {
  FindByUsername(username: string): any;
  CreateUser(data: INewUser): any;
  Login(data: INewUser): any;
}

export interface IBenchService {
  ListBenchItems(userId: string): Promise<Array<any>>;
  CreateItem(benchItem: INewBenchItem): Promise<boolean>;
  GetItem(userId: string, id: string): Promise<any>;
  DeleteItem(userId: string, id: string): Promise<any>;
  UpdateItem(benchItem: INewBenchItem): Promise<any>;
  FetchLocationsAndTypes(): Promise<any>;
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

export interface INewBenchItem {
  id?: string | number;
  userId: string;
  title: string;
  description: string;
  locationId: number;
  commitmentTypeId: number;
  points: number;
  created?: string;
}

export interface IServiceConfiguration {
  userService: IUserService;
  benchService: IBenchService;
}
