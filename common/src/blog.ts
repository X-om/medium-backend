import { z } from "zod";


export const blogPostSchema = z.object({
  title: z.string().min(1, { message: "title is missing" }),
  content: z.string().min(1, { message: "content is missing" }),
  published: z.boolean().optional(),
});

export const updateBlogSchema = z.object({
    title : z.string().min(1, { message : "title is missing"}).optional(),
    content : z.string().min(1, { message : "content is missing"}).optional(),
    published : z.boolean().optional(),
    blogId : z.string().uuid({ message: "Invalid blog ID format" })
});

export type blogPostTypeReturn = {
    id : string,
    title : string,
    content : string,
    published : boolean,
    authorId : string,
    author : {
        name : string,
        email : string
    }
}



export type blogPostType = z.infer<typeof blogPostSchema>;
export type updateBlogType = z.infer<typeof updateBlogSchema>;