import bodyParser from "body-parser";
import morgan from "morgan";
import App from "./app";
import HomeController from "./controllers/HomeController";
import config from "./config/index";

const app = new App({
  port: config.PORT,
  controllers: [new HomeController()],
  middleWares: [bodyParser.json(), morgan("dev"), bodyParser.urlencoded({ extended: true })],
});

app.listen();
