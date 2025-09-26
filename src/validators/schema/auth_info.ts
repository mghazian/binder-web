import z from "zod";

const LoginInfoSchema = z.looseObject({
  phone: z.string().regex(/^\+\d{4,16}/, "Invalid phone"),
  // TODO: Use actual validation for OTP
  otp: z.literal("123456", "Incorrect OTP")
});

const RegisterInfoSchema = z.looseObject({
  name: z.string().min(1, "Name cannot be empty"),
  // TODO: Need to check phone uniqueness in DB
  phone: z.string().regex(/^\+\d{4,16}/, "Invalid phone"),
  // TODO: Use actual validation for OTP
  otp: z.literal("123456", "Incorrect OTP")
})

export { LoginInfoSchema, RegisterInfoSchema };