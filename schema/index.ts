import z from "zod";

const PasswordSchema = z
  .string()
  .min(4, { message: "Password must be at least 4 characters" });
const EmailSchema = z.string().email({ message: "Invalid email format" });

export const SignupFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" }),
  remember: z.number().min(0).max(1),
});

export const FESignupFormSchema = SignupFormSchema.extend({
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export const LoginFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  remember: z.number().min(0).max(1),
});

export type SignupFormType = z.infer<typeof SignupFormSchema>;
export type LoginFormType = z.infer<typeof LoginFormSchema>;
