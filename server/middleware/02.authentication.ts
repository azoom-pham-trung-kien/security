import jwt from "jsonwebtoken";
import { throwUnauthorizedError } from "@/server/helper/auth";

export default defineEventHandler(async (event) => {
  const path = event.path;
  if (path.startsWith("/api")) {
    const publicRoutes = [
      "/login",
      "/signup",
      "auth0/google",
      "auth0/google-callback",
    ];
    const isPublicRoute = publicRoutes.some((route) => path.includes(route));

    if (!isPublicRoute) {
      const { jwtSecretKey } = useRuntimeConfig(event);
      const bearerToken = getCookie(event, "Bearer_token") || "";

      try {
        jwt.verify(bearerToken, jwtSecretKey);
      } catch (error) {
        throwUnauthorizedError();
      }
    }
  }
});
