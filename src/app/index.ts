// vendor
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";

//app config
import App from "./setup";
import config from "../config";
import { IServiceConfiguration } from "../types";

//controllers
import HomeController from "../controllers/HomeController";
import AuthController from "../controllers/AuthController";
import BenchController from "../controllers/BenchController";

const configureApp = (services: IServiceConfiguration) => {
  return new App({
    port: config.PORT,
    controllers: [
      new HomeController(),
      new AuthController(services.userService),
      new BenchController(services.benchService),
    ],
    // eslint-disable-next-line prettier/prettier
    middleWares: [compression(), bodyParser.json(), morgan("dev"), bodyParser.urlencoded({ extended: true })],
  });
};

export default configureApp;
