import express, { Application } from "express";

class App {
  private app: Application;
  private port: number;

  constructor(appInit: { port: number; middleWares; controllers }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
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

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
