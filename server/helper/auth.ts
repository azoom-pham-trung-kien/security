import { H3Event, EventHandlerRequest } from "h3";
import { oauth2Client } from "@/auth0";
import { Prisma } from "@/database";
import jwt from "jsonwebtoken";
import type {
  JwtAuthPayload,
  JwtConfig,
  Auth0Token,
  AuthProvider,
} from "@/types";

const oneDayTime = 1000 * 60 * 60 * 24;
const expiredAuthTokenDays = 7;

export const getAuthJwtEncodedPayload = (
  user: Prisma.User,
  tokens: Auth0Token,
  provider: AuthProvider
) => {
  const { email, name, role } = user;
  const { refresh_token, access_token, expiry_date } = tokens;

  return {
    email,
    name,
    role,
    provider,
    accessToken: access_token as string,
    refreshToken: refresh_token as string,
    expiresIn: expiry_date as number,
  };
};

const getCookieOptions = (
  event: H3Event<EventHandlerRequest>,
  expires?: number
) => {
  const { environment } = useRuntimeConfig(event);
  const cookieOptions = {
    httpOnly: true,
    samesite: "lax",
    secure: environment === "production", // Use HTTPS only in production
  };

  if (expires) {
    Object.assign(cookieOptions, {
      expires: new Date(expires),
    });
  }

  return cookieOptions;
};

const setBearerToken = (
  event: H3Event<EventHandlerRequest>,
  jwtConfig: JwtConfig,
  cookieOptions: Record<string, any> = {}
) => {
  const { jwtSecretKey } = useRuntimeConfig(event);
  const { expiresIn, payload } = jwtConfig;
  const jwtOption = expiresIn ? { expiresIn } : undefined;
  const authToken = jwt.sign(payload, jwtSecretKey, jwtOption);

  setCookie(event, "Bearer_token", authToken, cookieOptions);
};

export const setAuthCookie = (
  event: H3Event<EventHandlerRequest>,
  userData: Prisma.User,
  userRemember: boolean = false
) => {
  const expires = userRemember
    ? Date.now() + oneDayTime * expiredAuthTokenDays
    : undefined;
  const cookieOptions = getCookieOptions(event, expires);

  const jwtConfig: JwtConfig = {
    payload: {
      email: userData.email,
      name: userData.name,
      role: userData.role,
    },
    expiresIn: expires,
  };
  setBearerToken(event, jwtConfig, cookieOptions);
};

export const setAuth0Cookie = (
  event: H3Event<EventHandlerRequest>,
  jwtAuthPayload: JwtAuthPayload
) => {
  const { jwtSecretKey } = useRuntimeConfig(event);
  const { expiresIn } = jwtAuthPayload;
  const cookieOptions = getCookieOptions(event, expiresIn);
  const authToken = jwt.sign(jwtAuthPayload, jwtSecretKey, {
    expiresIn,
  });

  setCookie(event, "Bearer_token", authToken, cookieOptions);
};

export const refreshAuthCookieFromGoogleRefreshToken = async (
  event: H3Event<EventHandlerRequest>,
  jwtAuthPayload: JwtAuthPayload
) => {
  const { refreshToken, ...otherFields } = jwtAuthPayload;
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const now = Date.now();
  const expiryThreshold = 15 * 60 * 1000; // 15 minutes in milliseconds
  const credentials = oauth2Client.credentials;
  const needToRefreshNewToken =
    (otherFields.expiresIn as number) - now <= expiryThreshold;

  if (needToRefreshNewToken) {
    const { token } = await oauth2Client.getAccessToken();
    const expiresIn = credentials.expiry_date;
    setAuth0Cookie(event, {
      ...otherFields,
      accessToken: token as string,
      expiresIn: expiresIn as number,
    });
  }
};

export const throwUnauthorizedError = () => {
  throw createError({
    status: 401,
    message: "Unauthorized",
  });
};
