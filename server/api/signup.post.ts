import bcrypt from "bcrypt";
import { prisma } from "@/database";
import { SignupFormSchema } from "@/schema";
import type { SignupFormType } from "@/schema";
import { setAuthCookie } from "@/server/helper/auth";
import { omit } from "@/utils/object";

const createUser = async (data: SignupFormType) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: "USER",
    },
  });

  return user;
};

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    SignupFormSchema.safeParse
  );

  if (!success) {
    throw createError({
      status: 400,
      statusMessage: "Bad Request",
      message: "Invalid request body",
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (existingUser) {
    throw createError({
      status: 401,
      message: "User already exists",
    });
  }

  const user = await createUser(data);

  setAuthCookie(event, user, Boolean(data.remember));

  return omit(user, ["password"]);
});
