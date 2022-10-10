<!-- 滚动组件 -->
<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue'
import useScroll from './use-scroll'
const props = defineProps({
  // 默认可以点击
  click: {
    type: Boolean,
    default: true
  },
  // 控制是否派发scroll事件
  probeType: {
    type: Number,
    default: 0
  }
})
// 定义派发事件
const emit = defineEmits(['scroll'])
const rootRef = ref(null)
const scroll = useScroll(rootRef, props, emit)
// 暴露该对象方便父组件调用该scroll上的方法
defineExpose({ scroll })
</script>
<style scoped lang='scss'>

</style>
