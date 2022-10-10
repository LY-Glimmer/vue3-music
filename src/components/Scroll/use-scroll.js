import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'
// 监听DOM
BScroll.use(ObserveDOM)
export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)
  onMounted(() => {
    // 开启滚动
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options
    })

    // 如果probeType大于0那么监听scroll事件拿到滚动坐标
    if (options.probeType > 0) {
      scroll.value.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })
  // 返回该对象 方便其他模块操作
  return scroll
}
