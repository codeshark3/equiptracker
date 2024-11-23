import { number, z } from "zod";

export const SignInSchema = z.object({
  //   name: z.string().min(1),
  email: z.string().email({
    message: "Email is required ",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  // password: z.string().min(6),
});

// interface FormData {
//   password: string;
//   confirm_password: string;
// }
export const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({
      message: "Email is required ",
    }),
    password: z.string().min(6, {
      message: "Minimum password length is 6",
    }),
    confirm_password: z.string().min(6, {
      message: "Minimum password length is 6",
    }),
  })
  .refine((val) => val.password === val.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
