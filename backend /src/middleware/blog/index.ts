import { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { Context } from "hono";
import { getPrisma } from "../../utils/db";
import {
  blogPostSchema,
  updateBlogSchema,
  updateBlogType,
  blogPostType,
  blogPostTypeReturn,
} from "@om-argade/common";

export const blogInputValidation: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const response = blogPostSchema.safeParse(await c.req.json());
    if (!response.success) {
      c.status(403);
      return c.json({
        message: response.error.errors.map((err) => err.message),
      });
    }

    c.set("blogBody", response.data);
    await next();
  }
);

export const createBlogPost: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const prisma = getPrisma(c.env);

    const authorId: string = await c.get("userId");
    const blogBody: blogPostType = await c.get("blogBody");
    try {
      const blog = await prisma.post.create({
        data: {
          title: blogBody.title,
          content: blogBody.content,
          published: blogBody.published,
          authorId: authorId,
        },
      });

      c.set("blogId", blog.id);
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

export const updateBlogInputvalidation: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const response = updateBlogSchema.safeParse(await c.req.json());
    if (!response.success) {
      c.status(403);
      return c.json({
        success: false,
        message: response.error.errors.map((err) => err.message),
      });
    }
    c.set("updateBody", response.data);
    await next();
  }
);

export const updateBlog: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const prisma = getPrisma(c.env);
    const blogBody: updateBlogType = await c.get("updateBody");

    try {
      const updateStatus = await prisma.post.update({
        where: {
          id: blogBody.blogId,
        },
        data: {
          title: blogBody?.title,
          content: blogBody?.content,
          published: blogBody?.published,
        },
      });

      c.set("updatedBlog", updateStatus);
      return await next();
    } catch (error: any) {
      if (error.code == "P2025") {
        c.status(404);
        return c.json({
          success: false,
          message: "Internal error, blog doesn't exist",
        });
      }
    }

    c.status(500);
    return c.json({
      success: false,
      message: "Internal server error !",
    });
  }
);

export const getBlogById: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const prisma = getPrisma(c.env);
    const id: string | undefined = c.req.query("id");

    try {
      const post: blogPostTypeReturn | null = await prisma.post.findUnique({
        where: {
          id: id,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      if (!post) {
        c.status(404);
        return c.json({
          success: false,
          message: "No post with this id exist",
        });
      }
      c.set("singleBlogPost", post);
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

export const getBlogsBulk: MiddlewareHandler = createMiddleware(
  async (c: Context, next) => {
    const prisma = getPrisma(c.env);
    const pageParam = Number(c.req.query("page"));
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    const take = 10;
    let blogs: Array<blogPostTypeReturn> = [];
    try {
      if (page <= 5) {
        blogs = await prisma.post.findMany({
          take: take,
          skip: (page - 1) * take,
          include: {
            author: {
              select: {
                name: true,
                email: true,
              },
            },
          },
          cacheStrategy: {
            ttl: 60,
          },
        });
      } else {
        blogs = await prisma.post.findMany({
          take: take,
          skip: (page - 1) * take,
          include: {
            author: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        });
      }

      if (blogs.length == 0) {
        c.status(204);
        return c.json({
          success: false,
          message: "No blogs found !",
        });
      }

      c.set("blogBulk", blogs);
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
