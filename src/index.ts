require("dotenv").config();
import Knex from "knex";
import App from "./app";
import knexConfig from "./knexfile";
import config from "./config";
import UserService from "./services/UserService";
import BenchService from "./services/BenchService";

const db: Knex = Knex(knexConfig[process.env.NODE_ENV]);

const services = {
  userService: new UserService(config, db),
  benchService: new BenchService(db),
};

const app = App(services);

app.listen();
