import { z } from "zod";
export const registerSchema = z
    .object({
    name: z
        .string({ message: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(20, { message: "Name must be at most 20 characters long" }),
    email: z
        .string({ message: "Email is required" })
        .email({ message: "Invalid email" }),
    // .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email" }),
    password: z
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" }),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // ),
    confirm_password: z
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" }),
})
    .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});
