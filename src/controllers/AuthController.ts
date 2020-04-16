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
    const userData = await this.userService.Login(req.body);

    if (!userData?.token) {
      return res.status(400).json({ msg: "invalid login" });
    }

    return res.json(userData);
  };

  private register = async (req: Request, res: Response) => {
    if (await this.userService.FindByUsername(req.body.username)) {
      return res.status(400).json({ msg: "username already exists" });
    }

    const newUser = await this.userService.CreateUser(req.body);

    if (newUser?.token) {
      return res.send(newUser);
    } else {
      return res.status(500).send("Error creating user");
    }
  };
}

export default AuthController;
