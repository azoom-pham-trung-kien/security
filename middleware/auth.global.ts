import { routesNames } from "@typed-router";
export default defineNuxtRouteMiddleware(async (to) => {
  const { requiresAuth, roles = [] } = to.meta;
  const authUserStore = useAuthUserStore();
  const { isLoggedIn } = storeToRefs(authUserStore);
  const { fetchUser } = authUserStore;

  const authPath = ["/authentication"];

  if (authPath.includes(to.path)) {
    return;
  }

  if (!isLoggedIn.value) {
    await fetchUser();
  }

  if (requiresAuth && !isLoggedIn.value) {
    return navigateTo({
      name: routesNames.authentication,
    });
  }
});
