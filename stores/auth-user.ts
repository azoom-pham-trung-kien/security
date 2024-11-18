import type { UserInfo } from "@/types";

export const useAuthUserStore = defineStore("authUser", () => {
  const isLoggedIn = ref(false);
  const user = ref<UserInfo>();

  const fetchUser = async () => {
    const response = await $fetch("/api/user").catch(() => false);

    if (!response) {
      isLoggedIn.value = false;
      return false;
    }

    isLoggedIn.value = true;
    user.value = response as UserInfo;

    return response;
  };

  const logout = async () => {
    const response = await $fetch("/api/logout").catch(() => false);

    if (response) {
      isLoggedIn.value = false;
      user.value = undefined;
    }

    return response;
  };

  return {
    isLoggedIn,
    user,
    fetchUser,
    logout,
  };
});
