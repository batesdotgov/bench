import express, { Application } from "express";
import cors from "cors";
import path from "path";

class App {
  private app: Application;
  private port: number;

  constructor(appInit: { port: number; middleWares; controllers }) {
    this.app = express();
    this.port = appInit.port;
    this.registerCors();
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.registerStatic();
  }

  private middlewares(middleWares) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  registerStatic() {
    this.app.use(express.static(path.join(__dirname, "/../../client/dist")));
    this.app.all("*", (req, res) => {
      res.sendFile(path.join(__dirname + "/../../client/dist/index.html"));
    });
  }

  registerCors() {
    process.env.NODE_ENV === "development" && this.app.use(cors("*"));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
