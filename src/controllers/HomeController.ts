import { Router, Request, Response } from "express";
import { IConfig } from "types";

class HomeController {
  public router = Router();
  public config: IConfig;
  constructor(config) {
    this.initRoutes();
    this.config = config;
  }

  initRoutes = () => {
    this.router.get("/", this.index);
  };

  index = (req: Request, res: Response) => {
    return res.send(this.config.JWT_SECRET);
  };
}

export default HomeController;
