
import {email, z} from "zod";


export const registerSchema = z.object({
    name:z.string().trim().min(2).max(50),
    email:z.string().trim().email().max(50).transform(v => v.toLowerCase()),
    password:z.string().min(8).max(72)


});

export const loginSchema = z.object({
     email:z.string().trim().email().max(50).transform(v => v.toLowerCase()),
    password:z.string().min(8).max(72)
})

export type registerInput = z.infer<typeof registerSchema>;
export type LoginInput  = z.infer<typeof loginSchema>;