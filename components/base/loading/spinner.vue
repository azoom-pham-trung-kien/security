<template>
  <div class="az-loading-spinner">
    <div class="segment"></div>
    <div class="segment"></div>
    <div class="segment"></div>
    <div class="segment"></div>
    <div class="segment"></div>
    <div class="segment"></div>
    <div class="segment"></div>
    <div class="segment"></div>
  </div>
</template>

<style lang="scss" scoped>
.az-loading-spinner {
  position: relative;
  width: 48px;
  height: 48px;
  animation: choppy-rotate 800ms steps(8) infinite;
  > .segment {
    content: '';
    position: absolute;
    width: 4px;
    height: 12px;
    background-color: theme-color(border);
    border-radius: 900px;
    transform-origin: 24px 24px;
    &:nth-child(1) {
      transform: rotate(0deg) translateX(22px);
      background-color: theme-color(primary);
    }
    &:nth-child(2) {
      transform: rotate(45deg) translateX(22px);
    }
    &:nth-child(3) {
      transform: rotate(90deg) translateX(22px);
    }
    &:nth-child(4) {
      transform: rotate(135deg) translateX(22px);
    }
    &:nth-child(5) {
      transform: rotate(180deg) translateX(22px);
    }
    &:nth-child(6) {
      transform: rotate(225deg) translateX(22px);
    }
    &:nth-child(7) {
      transform: rotate(270deg) translateX(22px);
    }
    &:nth-child(8) {
      transform: rotate(315deg) translateX(22px);
    }
  }
}

@keyframes choppy-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
