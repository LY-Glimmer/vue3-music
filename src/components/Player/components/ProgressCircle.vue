<!-- 迷你播放器的播放按钮 -->
<template>
  <div class="progress-circle">
    <!-- 2个圆 -->
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset" />
    </svg>
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { defineProps, ref } from 'vue'

const props = defineProps({
  // 半径
  radius: {
    type: Number,
    default: 100
  },
  // 进度
  progress: {
    type: Number,
    default: 0
  }
})

const dashArray = ref(Math.PI * 100)

const dashOffset = computed(() => {
  return (1 - props.progress) * dashArray.value
})

</script>

<style lang="scss" scoped>
.progress-circle {
  position: relative;

  circle {
    stroke-width: 8px;
    transform-origin: center;

    &.progress-background {
      transform: scale(0.9);
      stroke: $color-theme-d;
    }

    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>
