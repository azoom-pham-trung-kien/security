<script setup lang="ts">
defineOptions({
  name: 'AzLoading'
})

const { loading, teleportTo = 'body' } = defineProps<{
  loading?: boolean
  teleportTo?: string
}>()

watchEffect(() => {
  document.body.inert = loading || false
})
</script>

<template>
  <Teleport :to="teleportTo">
    <div v-show="loading" class="az-loading">
      <az-loading-spinner />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.az-loading {
  position: fixed;
  user-select: none;
  inset: 0;
  z-index: 100000;
  background-color: theme-color(on-primary, 0.64);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
