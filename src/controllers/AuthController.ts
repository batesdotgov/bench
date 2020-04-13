import { Router, Request, Response } from "express";
import { IUserService } from "../types";
import { loginValidation, registerValidation } from "../middlewares/validation";

class AuthController {
  public router = Router();
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.post("/login", loginValidation(), this.login);
    this.router.post("/register", registerValidation(), this.register);
  };

  private login = async (req: Request, res: Response) => {
    const token = await this.userService.Login(req.body);

    if (!token) {
      return res.status(400).json({ msg: "invalid login" });
    }

    return res.json({ token });
  };

  private register = async (req: Request, res: Response) => {
    if (await this.userService.FindByUsername(req.body.username)) {
      return res.status(400).json({ msg: "username already exists" });
    }

    if (await this.userService.CreateUser(req.body)) {
      return res.send();
    } else {
      return res.status(500).send("Error creating user");
    }
  };
}

export default AuthController;
