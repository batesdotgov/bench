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

var db: Knex = Knex(knexConfig[process.env.NODE_ENV]);

const app = new App({
  port: config.PORT,
  controllers: [
    new HomeController(config),
    new AuthController(new UserService(config, db)),
  ],
  middleWares: [
    bodyParser.json(),

    morgan("dev"),
    bodyParser.urlencoded({ extended: true }),
  ],
});

app.listen();
