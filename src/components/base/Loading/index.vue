<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>

<script setup>
import { defineExpose, ref } from 'vue'
// 加载时的文本
const title = ref('加载中...')
// 设置加载时的文本
const setTitle = (titleText) => {
  title.value = titleText
}
// 暴露属性
defineExpose({ setTitle })
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  .loading-content {
    text-align: center;

    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
}
</style>
