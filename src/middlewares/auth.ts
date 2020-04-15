import { Request, Response, NextFunction } from "express";

const authRequired = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export default authRequired;
