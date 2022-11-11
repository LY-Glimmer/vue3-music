/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-29 15:17:13
 * @Last Modified by: LY_Glimmer
 * @Last Modified time: 2022-11-11 15:13:28
 */
/**
 * 手指滑动切歌
 **/
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { usePlayerStore } from '@/stores/player'
// 注册
BScroll.use(Slide)

export const useMiniSlider = () => {
  const sliderWrapperRef = ref(null)
  const playerStore = usePlayerStore()
  const slider = ref(null)
  // 是否显示
  const sliderShow = computed(() => {
    return !playerStore.fullScreen && playerStore.playList.length !== 0
  })

  onMounted(() => {
    let sliderVal
    // 监听显示
    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick()
        // 滚动
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true
            }
          })
          // 监听变化完毕
          sliderVal.on('slidePageChanged', ({ pageX }) => {
            playerStore.currentIndex = pageX
          })
        } else {
          sliderVal.refresh()
        }
        // 跳到当前的
        sliderVal.goToPage(playerStore.currentIndex, 0, 0)
      }
    })
    // 监听当前歌曲的索引
    watch(() => playerStore.currentIndex, (newCurrentIndex) => {
      if (sliderVal && sliderShow.value) {
        // 跳到当前歌曲的索引
        sliderVal.goToPage(playerStore.currentIndex, 0, 0)
      }
    })

    // 监听歌曲列表变化
    watch(() => playerStore.playList.length, async (newList) => {
      if (sliderVal && sliderShow.value && newList.length !== 0) {
        await nextTick()
        // 重新计算
        sliderVal.refresh()
      }
    })
  })

  onUnmounted(() => {
    if (slider.value) {
      // 销毁
      slider.value.destroy()
    }
  })
  return {
    slider,
    sliderWrapperRef
  }
}
