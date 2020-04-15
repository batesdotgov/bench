require("dotenv").config();
import bodyParser from "body-parser";
import morgan from "morgan";

import config from "../config";
import HomeController from "../controllers/HomeController";
import AuthController from "../controllers/AuthController";
import BenchController from "../controllers/BenchController";

import App from "./setup";

const configureApp = (services) => {
  return new App({
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
};

export default configureApp;
