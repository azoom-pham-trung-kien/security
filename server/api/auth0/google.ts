import { oauth2Client } from "@/auth0";

export default defineEventHandler(async (event) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // get refresh token
    prompt: "consent", // always show consent screen for select account
    scope: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/bigquery.readonly",
    ],
  });

  return url;
});
