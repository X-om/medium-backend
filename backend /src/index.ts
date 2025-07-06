import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { blogRouter } from "./routes/blogRouter";
import { cors } from "hono/cors";

const app = new Hono();
app.use(cors());
app.get("/health", (c) => c.text("ok"));
app.get("/", (c) =>
  c.json({
    message: "Welcome to the Blog API",
    version: "v1",
    status: "OK",
  })
);
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
