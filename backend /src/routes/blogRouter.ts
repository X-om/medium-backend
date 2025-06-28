import { Context, Hono } from "hono";
import { authMiddleware } from "../middleware/auth/authMiddleware";
import {
  blogInputValidation,
  createBlogPost,
  getBlogById,
  getBlogsBulk,
  updateBlog,
  updateBlogInputvalidation,
} from "../middleware/blog";
import { blogPostType, blogPostTypeReturn, updateBlogType } from "@om-argade/common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    blogBody: blogPostType;
    blogId: string;
    updateBody: updateBlogType;
    updatedBlog: updateBlogType;
    singleBlogPost: blogPostType;
    blogBulk : blogPostTypeReturn
  };
}>();

blogRouter.post(
  "/",
  authMiddleware,
  blogInputValidation,
  createBlogPost,
  async (c: Context) => {
    const blogId: string = c.get("blogId");
    return c.json({
      success: true,
      payload: "post created successfully",
      blogId: blogId,
    });
  }
);

blogRouter.put(
  "/",
  authMiddleware,
  updateBlogInputvalidation,
  updateBlog,
  async (c: Context) => {
    const updatedBlog: updateBlogType = c.get("updatedBlog");
    return c.json({
      success: true,
      message: "Blog updated successfully",
      payload: updatedBlog,
    });
  }
);

blogRouter.get("/", authMiddleware, getBlogById, async (c: Context) => {
  const blog: blogPostType = c.get("singleBlogPost");
  return c.json({
    success: true,
    payload: blog,
  });
});

blogRouter.get("/bulk", authMiddleware, getBlogsBulk, async (c: Context) => {
    const blogs : blogPostTypeReturn = c.get("blogBulk");
    return c.json({
      success : true,
      payload : blogs
    });
});
