import { z } from "zod";

export const signupInputSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long." })
    .refine((val) => (val.match(/[A-Z]/g) || []).length >= 1, {
      message: "Ensure password has at least one uppercase letter.",
    })
    .refine((val) => /[!@#$&*]/.test(val), {
      message: "Ensure password has at least one special character.",
    })
    .refine((val) => (val.match(/[0-9]/g) || []).length >= 1, {
      message: "Ensure password has at least one digit.",
    })
    .refine((val) => (val.match(/[a-z]/g) || []).length >= 1, {
      message: "Ensure password has at least one lowercase letter.",
    }),
});

export const signinInputSchema = z.object({
  email: z.string().email({ message: "please enter valid email" }),
  password: z.string().min(2, { message: "password can not be that short" }),
});


export type signupInputType = z.infer<typeof signupInputSchema>;
export type signinInputType = z.infer<typeof signinInputSchema>;