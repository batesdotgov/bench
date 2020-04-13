import { Router, Request, Response } from "express";
import { IBenchService } from "../types";

class BenchController {
  router = Router();
  benchService: IBenchService;

  constructor(benchService: IBenchService) {
    this.initRoutes();
    this.benchService = benchService;
  }

  initRoutes = () => {
    this.router.get("/bench-items", this.GetBenchItems);
  };

  GetBenchItems = (req: Request, res: Response) => {
    return res.send("hello");
  };
}

export default BenchController;
