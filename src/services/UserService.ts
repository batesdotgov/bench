import Knex from "knex";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { IConfig, IUserService, INewUser, IUser } from "../types";

class UserService implements IUserService {
  private config: IConfig;
  private db: Knex;

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
      await this.db("users").insert({
        username: data.username,
        password: hashedPassword,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  Login = async (data: INewUser) => {
    const user: IUser = await this.FindByUsername(data.username);

    if (!user) {
      return null;
    }

    if (!this.comparePasswords(data.password, user.password)) {
      return null;
    }

    return this.generateToken(user.id);
  };

  private generateHash = (password: string) => {
    return bcrypt.hashSync(password, 12);
  };

  private comparePasswords = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
  };

  generateToken = (userId: string) => {
    return jwt.sign({ userId }, this.config.JWT_SECRET, { expiresIn: 60 * 60 });
  };
}

export default UserService;
