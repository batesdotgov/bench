/* eslint-disable prettier/prettier */
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
    this.router.get("/bench-items/types-and-locations", authRequired, this.TypesAndLocations);

    /*eslint-disable-next-line */
    this.router.post("/bench-items", authRequired, createBenchItemValidation(), this.Create);
    this.router.put("/bench-items", authRequired, createBenchItemValidation(), this.Update);
    this.router.get("/bench-items/:id", authRequired, this.Get);
    this.router.delete("/bench-items/:id", authRequired, this.Delete);
  };

  List = async (req: IAuthUserRequest, res: Response) => {
    return res.send(await this.benchService.ListBenchItems(req.userId));
  };

  TypesAndLocations = async (req: IAuthUserRequest, res: Response) => {
    return res.send(await this.benchService.FetchLocationsAndTypes());
  };

  Update = async (req: IAuthUserRequest, res: Response) => {
    const updatedItem: INewBenchItem = req.body;
    updatedItem.userId = req.userId;

    return res.send(await this.benchService.UpdateItem(updatedItem));
  };

  Get = async (req: IAuthUserRequest, res: Response) => {
    return res.send(await this.benchService.GetItem(req.userId, req.params.id));
  };

  Delete = async (req: IAuthUserRequest, res: Response) => {
    if (await this.benchService.DeleteItem(req.userId, req.params.id)) {
      return res.send();
    }
    return res.status(500).json({ msg: "Error deleting item" });
  };

  Create = async (req: IAuthUserRequest, res: Response) => {
    // refactor logic into service
    const newItem: INewBenchItem = req.body;
    newItem.userId = req.userId;

    console.log(newItem);

    const createdItem = await this.benchService.CreateItem(newItem);

    if (createdItem) {
      return res.send({ id: createdItem });
    }

    return res.status(500).json({ msg: "Could not create bench item" });
  };
}

export default BenchController;
