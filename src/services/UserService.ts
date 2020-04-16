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

      const newUser = await this.db("users")
        .insert({
          username: data.username,
          password: hashedPassword,
        })
        .returning("id,username");

      const token = this.generateToken(newUser[0].id);

      return { token, user: newUser };
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  Login = async (data: INewUser) => {
    const newUser: IUser = await this.FindByUsername(data.username);

    if (!newUser) {
      return null;
    }

    if (!this.comparePasswords(data.password, newUser.password)) {
      return null;
    }

    const token = this.generateToken(newUser.id);

    const user = {
      id: newUser.id,
      username: newUser.username,
    };

    return { token, user };
  };

  private generateHash = (password: string) => {
    return bcrypt.hashSync(password, 12);
  };

  private comparePasswords = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
  };

  generateToken = (userId: string) => {
    return jwt.sign({ userId }, this.config.JWT_SECRET, { expiresIn: 30000 });
  };
}

export default UserService;
