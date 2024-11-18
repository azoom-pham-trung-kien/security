import { Prisma } from "@/database";

export type UserInfo = Omit<
  Prisma.User,
  "id" | "password" | "createdAt" | "updatedAt"
>;

export type AuthProvider = "google" | "facebook";

export type JwtAuthPayload = {
  email: string;
  name: string | null;
  role: Prisma.RoleName;
  provider?: AuthProvider;
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
};

export type JwtConfig = {
  payload: JwtAuthPayload;
  expiresIn?: number;
};

export type Auth0Token = {
  refresh_token?: string | null;
  expiry_date?: number | null;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
};
