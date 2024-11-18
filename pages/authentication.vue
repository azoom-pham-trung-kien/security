<script setup lang="ts">
import { routesNames } from "@typed-router";
const authUserStore = useAuthUserStore();
const { isLoggedIn } = storeToRefs(authUserStore);

if (isLoggedIn.value) {
  navigateTo({
    name: routesNames.index,
  });
}

const activeTab = ref("login");
</script>
<template>
  <div class="auth-container">
    <div class="tab">
      <v-btn
        :class="['button', { active: activeTab === 'signup' }]"
        size="large"
        @click="activeTab = 'signup'"
      >
        Sign Up
      </v-btn>
      <v-btn
        :class="['button', { active: activeTab === 'login' }]"
        size="large"
        @click="activeTab = 'login'"
      >
        Log In
      </v-btn>
    </div>

    <div v-if="activeTab === 'signup'" class="form-container">
      <SignupForm />
    </div>

    <div v-else class="form-container">
      <LoginForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.auth-container > .tab {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;

  > .button {
    flex: 1;
    font-weight: bold;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
    &.active {
      background: theme-color(primary);
      color: theme-color(on-primary);
    }
  }
}
</style>
