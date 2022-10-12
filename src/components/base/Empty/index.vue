<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="icon"></div>
      <p class="text">{{emptyText}}</p>
    </div>
  </div>
</template>

<script setup>
import { defineExpose, ref } from 'vue'
const emptyText = ref('抱歉没有结果')
const setTitle = (title) => {
  emptyText.value = title
}
defineExpose({
  setTitle
})
</script>

<style lang="scss" scoped>
.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  .no-result-content {
    text-align: center;

    .icon {
      width: 86px;
      height: 90px;
      margin: 0 auto;
      @include bg-image('no-result');
      background-size: 86px 90px;
    }

    .text {
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
}
</style>
