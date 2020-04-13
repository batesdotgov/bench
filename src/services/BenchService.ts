import Knex from "knex";
import { IBenchService } from "../types";

class BenchService implements IBenchService {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  ListBenchItems = () => {
    return "hi";
  };
}

export default BenchService;
