import { Hono } from "hono";
import { userRouter } from "./Routes/userRouter";
import { blogRouter } from "./Routes/blogRouter";



const app = new Hono();

app.get("/health", (c) => c.text("ok"));
app.get("/", (c) =>
  c.json({
    message: "Welcome to the Blog API",
    version: "v1",
    status: "OK",
  })
);
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


export default app;
