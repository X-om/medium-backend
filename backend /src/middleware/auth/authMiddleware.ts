import { Context, MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { sign, verify } from "hono/jwt";

export const authMiddleware: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      c.status(403);
      return c.json({
        success : false,
        message: "Token Missing !",
      });
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = await verify(token, c.env.JWT_SECRET);
      c.set("userId", payload.id);
      await next();
    } catch (error: any) {
      c.status(401);
      return c.json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  }
);

export const assignToken: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const userId: string = await c.get("userId");
    if (!userId) {
      c.status(400);
      return c.json({
        success: false,
        message: "Invalid user context",
      });
    }
    try {
      const token: string = await sign({ id: userId }, c.env.JWT_SECRET);
      c.set("token", token);
      await next();
    } catch (error: any) {
      c.status(500);
      return c.json({
        success: false,
        message: "Internal server error !",
      });
    }
  }
);
