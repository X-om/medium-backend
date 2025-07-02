import { Hono } from "hono";
import { signinInputType, signupInputType } from "@om-argade/common";
import {
  createUserMiddleware,
  passwordCheck,
  signinInputValidation,
  signupInputValidation,
  userExistCheck,
} from "../middleware/user";

import { assignToken } from "../middleware/auth/authMiddleware";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    token: string;
    hashedPassword : {
      id : string,
      password : string
    },
    signinBody: signinInputType;
    signupBody: signupInputType;
  };
}>();


userRouter.post(
  "/signup",
  signupInputValidation,
  createUserMiddleware,
  assignToken,
  async (c) => {
    const token = c.get("token");
    return c.json({
      message: "user created successfully !",
      success: true,
      token: token,
    });
  }
);

userRouter.post(
  "/signin",
  signinInputValidation,
  userExistCheck,
  passwordCheck,
  assignToken,
  async (c) => {
    const token = c.get("token");
    return c.json({
      message: "logged in !",
      success: true,
      token,
    });
  }
);
