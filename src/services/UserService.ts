import Knex from "knex";
import bcrypt from "bcryptjs";
import { IConfig, IUserService, INewUser } from "../types";

class UserService implements IUserService {
  config: IConfig;
  db: Knex;
  constructor(config: IConfig, db: Knex) {
    this.config = config;
    this.db = db;
  }

  FindByUsername = async (username) => {
    return await this.db("users").where({ username }).first();
  };

  CreateUser = async (data: INewUser) => {
    try {
      const hashedPassword = this.generateHash(data.password);
      await this.db("users").insert({ username: data.username, password: hashedPassword });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  Login = async () => {};

  private generateHash = (password: string) => {
    return bcrypt.hashSync(password, 12);
  };

  private comparePasswords = () => {};

  generateToken = () => {};
}

export default UserService;
