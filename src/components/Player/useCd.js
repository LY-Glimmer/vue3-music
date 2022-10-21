/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-21 20:25:13
 * @Last Modified by: LY_Glimmer
 * @Last Modified time: 2022-10-21 20:59:23
 */

// 唱片的相关逻辑
import { usePlayerStore } from '@/stores/player'
import { computed, ref, watch } from 'vue'

export const useCd = () => {
  const cdRef = ref(null)
  const cdImageRef = ref(null)
  const playerStore = usePlayerStore()
  // 图片的计算样式
  const cdClass = computed(() => {
    return playerStore.playing ? 'playing' : ''
  })
  // 记录旋转角度
  const syncTransform = (wrapper, inner) => {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    console.log(innerTransform.concat(' ', wrapperTransform))
    wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
  }
  // 为什么要写成一个函数 因为playerStore是一个reactive对象并且里面的值并不是一个ref对象
  watch(() => playerStore.playing, (newPlaying) => {
    // 如果暂停了 那么让外层保持旋转角度
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  return { cdClass, cdRef, cdImageRef }
}
