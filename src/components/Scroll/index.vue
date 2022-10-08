<!-- 滚动组件 -->
<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import useScroll from './use-scroll'
const props = defineProps({
  // 默认可以点击
  click: {
    type: Boolean,
    default: true
  }
})
const rootRef = ref(null)
useScroll(rootRef, props)
</script>
<style scoped lang='scss'>

</style>
