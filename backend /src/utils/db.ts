import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPrisma = (env : { DATABASE_URL : string}) => {
    return new PrismaClient({
        datasourceUrl : env.DATABASE_URL
    }).$extends(withAccelerate());
}