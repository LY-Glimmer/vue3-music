<template>
  <div class="progress-bar" ref="progressBarRef">
    <!-- 无颜色的容器 -->
    <div class="bar-inner">
      <!-- 有颜色的进度 -->
      <div class="progress" :style="progressStyle"></div>
      <!-- 按钮 -->
      <div class="progress-btn-wrapper" :style="btnStyle">
        <div class="progress-btn" ref="progressBtnRef"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, computed } from 'vue'
const props = defineProps({
  // 进度
  progress: {
    type: Number,
    default: 0
  }
})
// 获取按钮
const progressBtnRef = ref(null)
// 获取进度条
const progressBarRef = ref(null)
// 偏移量
const offset = ref(0)
// 计算按钮的宽度
const progressBtnWidth = computed(() => {
  return progressBtnRef.value.offsetWidth
})
// 进度条的样式
const progressStyle = computed(() => {
  return `width:${offset.value}px`
})
// 按钮的样式
const btnStyle = computed(() => {
  return `transform:translate3d(${offset.value}px,0,0)`
})
// 监听进度变化
watch(() => props.progress, (newProgress) => {
  const barWidth = progressBarRef.value.offsetWidth - progressBtnWidth.value
  offset.value = barWidth * newProgress
})

</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
