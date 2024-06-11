import { z } from "zod";

export const UserRegistrationFormSchema = z
  .object({
    firstName: z.string({ required_error: "First Name is required." }),
    lastName: z.string({ required_error: "Last Name is required." }),
    email: z
      .string({ required_error: "Email is required." })
      .email("Email should be valid email"),
    password: z.string({ required_error: "Password is required." }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required.",
    }),
    agree: z.boolean({
      required_error: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.agree === true, {
    message: "You must agree to the terms and conditions",
    path: ["agree"],
  });

export type User = z.infer<typeof UserRegistrationFormSchema>;
