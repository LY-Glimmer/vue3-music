<template>
  <div class="progress-bar" @click="onProgressClick" ref="progressBarRef">
    <!-- 无颜色的容器 -->
    <div class="bar-inner">
      <!-- 有颜色的进度 -->
      <div ref="progressRef" class="progress" :style="progressStyle"></div>
      <!-- 按钮 -->
      <div class="progress-btn-wrapper" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
        :style="btnStyle">
        <div class="progress-btn" ref="progressBtnRef"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, computed, defineEmits } from 'vue'
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
  const barWidth = progressBarRef.value.clientWidth - progressBtnRef.value.offsetWidth
  offset.value = barWidth * newProgress
})
// 记录触摸的数据
const touch = ref({
  // x坐标
  x1: 0,
  // 进度条开始位置
  beginWidth: 0
})
// 拿到有颜色的进度条
const progressRef = ref(null)
// 手指触摸开始
const onTouchStart = (e) => {
  // 记录鼠标触摸地方的坐标
  touch.value.x1 = e.touches[0].pageX
  // 初始位置应该是有颜色进度条的位置
  touch.value.beginWidth = progressRef.value.clientWidth
}
const emit = defineEmits(['progressChanging', 'progressChanged'])
// 手指触摸移动
const onTouchMove = (e) => {
  // 计算偏移量
  const delta = e.touches[0].pageX - touch.value.x1
  // 当前进度条的位置
  const tempWidth = touch.value.beginWidth + delta
  // 总长度
  const barWidth = progressBarRef.value.clientWidth - progressBtnRef.value.offsetWidth
  // 计算出百分之多少
  const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
  // 计算当前应该在什么位置
  offset.value = barWidth * progress
  // 通知player组件把歌曲进度调到当前位置
  emit('progressChanging', progress)
}
// 手指触摸结束
const onTouchEnd = () => {
  // 总长度
  const barWidth = progressBarRef.value.clientWidth - progressBtnRef.value.offsetWidth
  // 算百分比
  const progress = progressRef.value.clientWidth / barWidth
  // 改变完毕
  emit('progressChanged', progress)
}

// 点击了进度条
const onProgressClick = (e) => {
  // getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
  const rect = progressBarRef.value.getBoundingClientRect()
  // 算出距离
  const offsetWidth = e.pageX - rect.left
  // 总长度
  const barWidth = progressBarRef.value.clientWidth - progressBtnRef.value.offsetWidth
  // 计算百分比
  const progress = offsetWidth / barWidth
  // 通知player组件
  emit('progressChanged', progress)
}
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
      width: 16px;
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
