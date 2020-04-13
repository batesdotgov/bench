require("dotenv").config();
import bodyParser from "body-parser";
import Knex from "knex";
import morgan from "morgan";
import App from "./app";
import config from "./config";

import HomeController from "./controllers/HomeController";
import UserService from "./services/UserService";
import AuthController from "./controllers/AuthController";
import knexConfig from "./knexfile";
import BenchController from "./controllers/BenchController";
import BenchService from "./services/BenchService";

const db: Knex = Knex(knexConfig[process.env.NODE_ENV]);

const services = {
  userService: new UserService(config, db),
  benchService: new BenchService(db),
};

const app = new App({
  port: config.PORT,
  controllers: [
    new HomeController(),
    new AuthController(services.userService),
    new BenchController(services.benchService),
  ],
  middleWares: [
    bodyParser.json(),
    morgan("dev"),
    bodyParser.urlencoded({ extended: true }),
  ],
});

app.listen();
