import Knex from "knex";
import { IBenchService, INewBenchItem } from "../types";

class BenchService implements IBenchService {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }
  UpdateItem = async (userId: string, data: any): Promise<any> => {
    try {
      await this.db("bench_items")
        .where({ id: data.id, userId })
        .update({ ...data })
        .delete();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  DeleteItem = async (userId: string, id: string): Promise<any> => {
    try {
      await this.db("bench_items").where({ id, userId }).delete();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  ListBenchItems = async (userId) => {
    try {
      const items = await this.db("bench_items").where({ userId });
      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  GetItem = async (userId, id) => {
    try {
      const items = await this.db("bench_items").where({ userId, id }).first();
      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  CreateItem = async (itemData: INewBenchItem): Promise<boolean> => {
    try {
      const newItem = await this.db("bench_items")
        .insert({ ...itemData })
        .returning("id");
      return newItem[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

export default BenchService;
