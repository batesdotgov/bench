import { Router, Request, Response } from "express";

class HomeController {
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.get("/", this.index);
  };

  index = (req: Request, res: Response) => {
    return res.send("bench-api");
  };
}

export default HomeController;
