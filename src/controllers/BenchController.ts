import { Router, Request, Response } from "express";
import { IBenchService } from "../types";
import { createBenchItemValidation } from "../middlewares/validation";
import authRequired from "../middlewares/auth";

class BenchController {
  router = Router();
  benchService: IBenchService;

  constructor(benchService: IBenchService) {
    this.initRoutes();
    this.benchService = benchService;
  }

  initRoutes = () => {
    this.router.get("/bench-items", authRequired, this.Get);
    this.router.post(
      "/bench-items",
      authRequired,
      createBenchItemValidation(),
      this.Create
    );
  };

  Get = (req: Request, res: Response) => {
    return res.send("hello");
  };

  Create = (req: Request, res: Response) => {
    return res.send();
  };
}

export default BenchController;
