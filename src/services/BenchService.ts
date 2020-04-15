import Knex from "knex";
import { IBenchService, INewBenchItem } from "../types";

class BenchService implements IBenchService {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  ListBenchItems = async (userId) => {
    return await this.db("bench_items").where({ userId: parseInt(userId, 12) });
  };

  CreateItem = async (itemData: INewBenchItem): Promise<boolean> => {
    try {
      await this.db("bench_items").insert({ ...itemData });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

export default BenchService;
