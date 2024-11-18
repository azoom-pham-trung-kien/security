import { oauth2Client } from "@/auth0";
import { prisma } from "@/database";
import { setAuth0Cookie, getAuthJwtEncodedPayload } from "@/server/helper/auth";

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);

  if (!code) {
    return sendRedirect(event, "/authentication", 301);
  }

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    const { email, name, picture } = await getUserInfo(oauth2Client);

    const upsertUser = await prisma.user.upsert({
      where: { email },
      create: { email, name, role: "USER", avatar: picture },
      update: {
        avatar: picture,
      },
    });

    const authUserData = getAuthJwtEncodedPayload(upsertUser, tokens, "google");
    setAuth0Cookie(event, authUserData);
    sendRedirect(event, "/user", 301);
  } catch (error) {
    throw {
      status: 400,
      message: "Authentication Failed",
    };
  }
});

async function getUserInfo(authClient: any) {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const res = await authClient.request({ url });
  return res.data;
}
