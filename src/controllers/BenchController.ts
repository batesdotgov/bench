import { Router, Response } from "express";
import { IBenchService, INewBenchItem } from "../types";
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
    this.router.get("/bench-items", authRequired, this.List);

    /*eslint-disable-next-line */
    this.router.post("/bench-items", authRequired, createBenchItemValidation(), this.Create);

    this.router.get("/bench-items/:id", authRequired, this.Get);
  };

  List = async (req: IAuthUserRequest, res: Response) => {
    return res.send(await this.benchService.ListBenchItems(req.userId));
  };

  Get = async (req: IAuthUserRequest, res: Response) => {
    return res.send(await this.benchService.GetItem(req.userId, req.params.id));
  };

  Create = async (req: IAuthUserRequest, res: Response) => {
    // refactor logic into service
    const newItem: INewBenchItem = req.body;
    newItem.userId = req.userId;

    const createdItem = await this.benchService.CreateItem(newItem);

    if (createdItem) {
      return res.send({ id: createdItem });
    }

    return res.status(500).json({ msg: "Could not create bench item" });
  };
}

export default BenchController;
