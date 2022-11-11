/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-29 14:54:00
 * @Last Modified by: LY_Glimmer
 * @Last Modified time: 2022-11-11 13:16:18
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
        throw new Error('歌曲模式出错啦')
    }
  })

  // 显示的文字
  const modeText = computed(() => {
    switch (playerStore.playMode) {
      case PLAY_MODE.sequence:
        return '顺序播放'
      case PLAY_MODE.random:
        return '随机播放'
      case PLAY_MODE.loop:
        return '单曲循环'
      default:
        throw new Error('歌曲模式出错啦')
    }
  })

  // 点击了改变模式的图标
  const changeMode = playerStore.changeMode
  return {
    modeIcon,
    modeText,
    changeMode
  }
}
