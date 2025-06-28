import { Hono } from "hono";
import { signinInputType, signupInputType } from "@om-argade/common";
import {
  createUserMiddleware,
  signinInputValidation,
  signupInputValidation,
  userSignIn,
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
    signinBody: signinInputType;
    signupBody: signupInputType;
  };
}>();

// return JWT for fast login
// hashed password
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
  userSignIn,
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
