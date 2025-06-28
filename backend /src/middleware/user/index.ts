import { Context, MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { getPrisma } from "../../utils/db";
import { signinInputSchema, signupInputSchema } from "@om-argade/common";
import { signinInputType, signupInputType } from "@om-argade/common";

export const signupInputValidation: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const response = signupInputSchema.safeParse(await c.req.json());

    if (!response.success) {
      c.status(403);
      return c.json({
        message: response.error.errors.map((err) => {
          return err.message;
        }),
      });
    }
    c.set("signupBody",response.data);
    await next();
  }
);

export const createUserMiddleware: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const prisma = getPrisma(c.env);
    const body: signupInputType = await c.get("signupBody");
    try {
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });
      c.set("userId",user.id);
      return await next();
      
    } catch (error: any) {
      if (error.code === "P2002") {
        c.status(409);
        return c.json({
          message: "User already exist with this email",
        });
      }
    }

    c.status(500);
    return c.json({
      message: "Internal server error",
    });
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

export const userSignIn: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const prisma = getPrisma(c.env);
    const signInBody: signinInputType = await c.get("signinBody");

    try {
      const user = await prisma.user.findFirst({
        where: {
          email: signInBody.email,
          password: signInBody.password,
        },
      });
      if (!user) {
        c.status(403);
        return c.json({
          message: "username / password incorrect",
        });
      }
      c.set("userId", user.id);
      await next();
    } catch (error: any) {
      c.status(500);
      return c.json({
        message: "Internal server error !",
      });
    }
  }
);

