import Knex from "knex";
import { IBenchService, INewBenchItem } from "../types";

class BenchService implements IBenchService {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  ListBenchItems = () => {
    return "hi";
  };

  CreateItem = async (itemData: INewBenchItem): Promise<boolean> => {
    try {
      await this.db("bench_items").insert({ ...itemData });
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default BenchService;
