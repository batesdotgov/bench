import express, { Application } from "express";

class App {
  private app: Application;
  private port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private middlewares(middleWares: any) {
    middleWares.forEach((middleWare: any) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: any) {
    controllers.forEach((controller: any) => {
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
