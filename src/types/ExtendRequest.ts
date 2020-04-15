import { Request } from "express";

export interface IAuthUserRequest extends Request {
  userId?: string;
}
