/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-29 14:54:00
 * @Last Modified by:   LY_Glimmer
 * @Last Modified time: 2022-10-29 14:54:00
 */
/**
 * 处理播放器的状态
 **/
import { usePlayerStore } from '@/stores/player'
import { computed } from 'vue'
import { PLAY_MODE } from '@/constant/constant'
export const useMode = () => {
  const playerStore = usePlayerStore()
  // 模式的样式
  const modeIcon = computed(() => {
    switch (playerStore.playMode) {
      case PLAY_MODE.sequence:
        return 'icon-sequence'
      case PLAY_MODE.random:
        return 'icon-random'
      case PLAY_MODE.loop:
        return 'icon-loop'
      default:
        return 'icon-loop'
    }
  })
  // 点击了改变模式的图标
  const changeMode = playerStore.changeMode
  return {
    modeIcon,
    changeMode
  }
}
