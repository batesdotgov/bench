import Knex from "knex";
import { IBenchService, INewBenchItem } from "../types";

class BenchService implements IBenchService {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  UpdateItem = async (benchItem: INewBenchItem): Promise<any> => {
    delete benchItem.created;
    try {
      await this.db("bench_items")
        .where({ id: benchItem.id, userId: benchItem.userId })
        .update({ ...benchItem });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  FetchLocationsAndTypes = async (): Promise<any> => {
    const locations = await this.db("locations");
    const types = await this.db("commitment_types");
    return { locations, types };
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

      console.log(newItem);
      return newItem[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

export default BenchService;
