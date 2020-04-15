import { Router, Request, Response } from "express";
import { IBenchService } from "../types";
import { createBenchItemValidation } from "../middlewares/validation";
import authRequired from "../middlewares/auth";
import { IAuthUserRequest } from "../types/ExtendRequest";

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

  Get = async (req: IAuthUserRequest, res: Response) => {
    return res.send(await this.benchService.ListBenchItems("1"));
  };

  Create = async (req: Request, res: Response) => {
    if (await this.benchService.CreateItem(req.body)) {
      return res.send();
    }

    return res.status(500).json({ msg: "Could not create bench item" });
  };
}

export default BenchController;
