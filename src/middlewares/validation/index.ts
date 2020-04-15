import { body } from "express-validator";
import validate from "./helper";

const registerRules = () => {
  return [
    body("username").trim().notEmpty().withMessage("username required"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password must be longer than 8 characters"),
    body("confirmPassword")
      .trim()
      .matches("password")
      .withMessage("passwords must match"),
  ];
};

const loginRules = () => {
  return [
    body("username").trim().notEmpty().withMessage("username required"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be longer than 8 characters"),
  ];
};

const newBenchItemRules = () => {
  return [
    body("userId").trim().notEmpty(),
    body("locationId").trim().notEmpty(),
    body("commitmentTypeId").trim().notEmpty(),
    body("title").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("points").trim().notEmpty(),
  ];
};

export const loginValidation = () => validate(loginRules());
export const registerValidation = () => validate(registerRules());
export const createBenchItemValidation = () => validate(newBenchItemRules());
