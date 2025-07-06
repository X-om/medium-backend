import { Context, MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { getPrisma } from "../../utils/db";
import { signinInputSchema, signupInputSchema } from "@om-argade/common";
import { signinInputType, signupInputType } from "@om-argade/common";
import { hashPassword, verifyPassword } from "../auth/authMiddleware";
import { logger } from "../../utils/logger";

export const signupInputValidation: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const response = signupInputSchema.safeParse(await c.req.json());

    if (!response.success) {
      c.status(403);
      return c.json({
        message: response.error.errors.map((err) => {
          return `${err.path} is ${err.message}`;
        }),
      });
    }
    c.set("signupBody", response.data);
    await next();
  }
);

export const createUserMiddleware: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const prisma = getPrisma(c.env);
    const body: signupInputType = c.get("signupBody");

    try {
      const hashedPassword = await hashPassword(body.password);

      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
      });
      c.set("userId", user.id);
      return await next();
    } catch (error: any) {
      if (error.code === "P2002") {
        c.status(409);
        return c.json({
          message: "User already exist with this email",
        });
      }
      logger?.error({ error }, "Error while creating user");
      c.status(500);
      return c.json({
        message: "Internal server error",
      });
    }
  }
);

export const signinInputValidation: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const response = signinInputSchema.safeParse(await c.req.json());
    if (!response.success) {
      c.status(403);
      return c.json({
        message: response.error.errors.map((err) => err.message),
      });
    }
    c.set("signinBody", response.data);
    await next();
  }
);

export const userExistCheck: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const prisma = getPrisma(c.env);
    const signInBody: signinInputType = c.get("signinBody");

    try {
      const user = await prisma.user.findFirst({
        where: {
          email: signInBody.email,
        },
        select : {
          id: true,
          password : true
        }
      });
      if (!user) {
        c.status(403);
        return c.json({
          message: "user does not exist with this email",
        });
      }
      c.set("hashedPasswordPayload", user);
      await next();
    } catch (error: any) {
      c.status(500);
      return c.json({
        message: "Internal server error !",
      });
    }
  }
);

export const passwordCheck : MiddlewareHandler = createMiddleware(
  async (c : Context , next) => { 
    try { 
      const hashedPasswordPayload = c.get("hashedPasswordPayload");
      const body = c.get("signinBody");
      const isValid = await verifyPassword(body.password, hashedPasswordPayload.password);
      if(!isValid){
        c.status(401);
        return c.json({
          success : false,
          message : "Incorrect Password"
        })
      }
      c.set("userId",hashedPasswordPayload.id);
      await next();
    } catch(error : any){
      logger.error(`error while comparing password ${error}`);
      c.status(500);
      return c.json({
        success : false,
        message : "Internal server error !"
      })
    }
    
  }
)
