import { number, z } from "zod";

export const SignInSchema = z.object({
  //   name: z.string().min(1),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address ",
    })
    .min(2)
    .max(50),
  password: z
    .string()
    .min(8, {
      message: "Minimum password length is 8 characters",
    })
    .max(50, "Password should not exceed 50 characters"),
  // password: z.string().min(6),
});

// interface FormData {
//   password: string;
//   confirm_password: string;
// }
export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name should be at least 2 characters  " })
      .max(50, { message: "Name should not exceed 50 characters" }),
    email: z
      .string()
      .email({
        message: "Please enter a valid email address ",
      })
      .min(2)
      .max(50),
    password: z
      .string()
      .min(8, {
        message: "Minimum password length is 8 characters",
      })
      .max(50, "Password should not exceed 50 characters"),
    confirm_password: z
      .string()
      .min(8, {
        message: "Minimum password length is 8 characters",
      })
      .max(50, "Password should not exceed 50 characters"),
  })
  .refine((val) => val.password === val.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
