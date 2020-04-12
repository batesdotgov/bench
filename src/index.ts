import bodyParser from "body-parser";
import morgan from "morgan";
import App from "./app";
import config from "./config";
import HomeController from "./controllers/HomeController";

const app = new App({
  port: config.PORT,
  controllers: [new HomeController()],
  middleWares: [
    bodyParser.json(),
    morgan("dev"),
    bodyParser.urlencoded({ extended: true }),
  ],
});

app.listen();
