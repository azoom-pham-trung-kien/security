<script setup lang="ts">
import { toast } from "vue3-toastify";
import { routesNames } from "@typed-router";

const authUserStore = useAuthUserStore();
const { isLoggedIn } = storeToRefs(authUserStore);

const logout = async () => {
  const response = await authUserStore.logout();

  if (!response) return;

  await navigateTo({
    name: routesNames.index,
  });
  toast.success("Log Out Successful!");
};

const login = () => {
  navigateTo({
    name: routesNames.authentication,
  });
};
</script>
<template>
  <v-app-bar app>
    <v-toolbar-title>My Project</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-show="!isLoggedIn" @click="login" color="primary">Login</v-btn>
    <v-btn v-show="isLoggedIn" @click="logout" color="secondary">Logout</v-btn>
  </v-app-bar>
</template>
