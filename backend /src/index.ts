import { Hono, MiddlewareHandler } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/prisma/edge";
import { z } from "zod";
import { createMiddleware } from "hono/factory";
import { MESSAGE_MATCHER_IS_ALREADY_BUILT } from "hono/router";
import { jwt, sign, verify } from "hono/jwt";

type AppEnv = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    signinBody: signinInputType;
    token: string;
  };
};

const app = new Hono<AppEnv>();

const signupInputSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long." })
    .refine((val) => (val.match(/[A-Z]/g) || []).length >= 2, {
      message: "Ensure password has at least two uppercase letters.",
    })
    .refine((val) => /[!@#$&*]/.test(val), {
      message: "Ensure password has at least one special character.",
    })
    .refine((val) => (val.match(/[0-9]/g) || []).length >= 2, {
      message: "Ensure password has at least two digits.",
    })
    .refine((val) => (val.match(/[a-z]/g) || []).length >= 3, {
      message: "Ensure password has at least three lowercase letters.",
    }),
});

type signupBodyType = z.infer<typeof signupInputSchema>;

const signupInputValidation = createMiddleware(async (c, next) => {
  const response = signupInputSchema.safeParse(await c.req.json());

  if (!response.success) {
    c.status(403);
    return c.json({
      message: response.error.errors.map((err) => {
        return err.message;
      }),
    });
  } else await next();
});

app.post("/api/v1/user/signup", signupInputValidation, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: signupBodyType = await c.req.json();

  const isExist = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
    select: {
      id: true,
    },
  });

  if (isExist) {
    c.status(402);
    return c.json({
      message: "user already exists",
    });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  return c.json({ id: user.id, action : "success" });
});

const signinInputSchema = z.object({
  email: z.string().email({ message: "please enter valid email" }),
  password: z.string().min(2, { message: "password can not be that short" }),
});

type signinInputType = z.infer<typeof signinInputSchema>;

const signinInputValidation: MiddlewareHandler = createMiddleware(
  async (c, next) => {
    const response = signinInputSchema.safeParse(await c.req.json());
    if (!response.success) {
      c.status(402);
      return c.json({
        message: response.error.errors.map((err) => {
          err.message;
        }),
      });
    }

    c.set("signinBody", response.data);
    await next();
  }
);

const isUserExist: MiddlewareHandler = createMiddleware(async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = c.get("signinBody");
  const isExist: { id: string } | null = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
    select: {
      id: true,
    },
  });

  if (!isExist) {
    c.status(400);
    return c.json({
      message: "user doesnt exist",
    });
  }
  const userId: string = isExist.id;
  c.set("userId", userId);

  await next();
});

const passwordCheck: MiddlewareHandler = createMiddleware(async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId: string = c.get("userId");
  const body : signinInputType = c.get("signinBody");

  const password : {password : string} | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      password: true,
    },
  });
  if (password) {
    if (password.password != body.password) {
      return c.json({
        message: "incorrect password",
      });
    }
  }

  await next();
});

const assignToken: MiddlewareHandler = createMiddleware(async (c, next) => {
  const seceret = c.env.JWT_SECRET;
  const payload = c.get("userId");

  const token = await sign({id : payload}, seceret);
  c.set("token", token);
  await next();
});

app.post(
  "/api/v1/user/signin",
  signinInputValidation,
  isUserExist,
  passwordCheck,
  assignToken,
  async (c) => {
    const token = c.get("token");
    return c.json({
      token,
    });
  }
);

app.post("/api/v1/blog", (c) => {});
app.put("/api/v1/blog", (c) => {});
app.get("/api/v1/blog/:id", (c) => {});
app.get("/api/v1/blog/bulk", (c) => {});

export default app;
