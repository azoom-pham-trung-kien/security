<script lang="ts" setup>
const { provide, $loading } = useNuxtApp();

const loading = ref(false);

const showLoading = () => {
  loading.value = true;
};

const hideLoading = () => {
  loading.value = false;
};

if (!$loading) {
  provide("loading", { show: showLoading, hide: hideLoading });
}
</script>

<template>
  <v-app class="layout-default">
    <base-header />
    <v-main class="content">
      <nuxt-page />
      <az-loading :loading="loading" />
    </v-main>
  </v-app>
</template>
<style lang="scss" scoped>
.layout-default {
  background-color: theme-color(white);

  > .v-application__wrap > .content {
    background: theme-color(background);
  }

  > .v-application__wrap > .drawer-sidebar :deep(.tooglemenu) {
    display: flex;
    justify-content: flex-end;
    padding: 12px;
    height: 36px;
  }
}
</style>
