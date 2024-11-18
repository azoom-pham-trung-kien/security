export default defineEventHandler(async (event) => {
  deleteCookie(event, "Bearer_token");

  return {
    message: "Successfully logged out",
  };
});
