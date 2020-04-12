import { Request, Response, NextFunction } from "express";

class AuthMiddleware {
  required(req: Request, res: Response, next: NextFunction) {
    console.log("auth");
    next();
  }
}

export default AuthMiddleware;
