import bcrypt from "bcrypt";
import { prisma } from "@/database";
import { LoginFormSchema } from "@/schema";
import { setAuthCookie } from "@/server/helper/auth";
import { omit } from "@/utils/object";

const rejectIncorrectAuthInfo = () => {
  throw createError({
    status: 400,
    message: "Email or password is incorrect",
  });
};

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    LoginFormSchema.safeParse
  );

  if (!success) {
    throw createError({
      status: 400,
      statusMessage: "Bad Request",
      message: "Invalid request body",
    });
  }

  const loggedInUser = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (!loggedInUser) {
    return rejectIncorrectAuthInfo();
  }

  const { password: hashedPassword } = loggedInUser;

  if (!hashedPassword) {
    return rejectIncorrectAuthInfo();
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    hashedPassword as string
  );

  if (!passwordMatch) {
    return rejectIncorrectAuthInfo();
  }

  setAuthCookie(event, loggedInUser, Boolean(data.remember));

  return omit(loggedInUser, ["password"]);
});
