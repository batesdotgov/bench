import jwt from "jsonwebtoken";
import config from "../config";

const authRequired = (req, res, next) => {
  try {
    const decoded: any = jwt.verify(
      req.headers.authorization,
      config.JWT_SECRET
    );
    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default authRequired;
