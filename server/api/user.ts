import { prisma } from "@/database";
import jwt from "jsonwebtoken";
import type { JwtAuthPayload } from "@/types";
import {
  refreshAuthCookieFromGoogleRefreshToken,
  throwUnauthorizedError,
} from "@/server/helper/auth";

export default defineEventHandler(async (event) => {
  const { jwtSecretKey } = useRuntimeConfig(event);
  const bearerToken = getCookie(event, "Bearer_token") || "";

  try {
    const jwtPayload = jwt.verify(bearerToken, jwtSecretKey);
    const { email, provider, refreshToken } = jwtPayload as JwtAuthPayload;

    if (provider === "google" && refreshToken) {
      await refreshAuthCookieFromGoogleRefreshToken(
        event,
        jwtPayload as JwtAuthPayload
      );
    }

    const user = prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    });

    return user;
  } catch (error) {
    throwUnauthorizedError();
  }
});
