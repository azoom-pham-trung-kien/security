<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
});

const authUserStore = useAuthUserStore();
const { user } = storeToRefs(authUserStore);
</script>

<template>
  <div class="user-container">
    <h1>User page</h1>
    <p class="item">
      User name: <span class="detail">{{ user?.name || "" }}</span>
    </p>
    <p class="item">
      User email: <span class="detail">{{ user?.email || "" }}</span>
    </p>
    <p class="item">
      User role: <span class="detail">{{ user?.role || "" }}</span>
    </p>
    <p v-if="user?.avatar" class="item">
      User avatar:
      <v-avatar>
        <v-img alt="John" :src="user?.avatar"></v-img>
      </v-avatar>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.user-container {
  padding: 1rem;
  > .item > .detail {
    font-weight: bold;
    color: green;
  }
}
</style>
