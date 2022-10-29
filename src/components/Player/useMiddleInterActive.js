/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-29 14:53:56
 * @Last Modified by:   LY_Glimmer
 * @Last Modified time: 2022-10-29 14:53:56
 */
import { ref } from 'vue'

export const useMiddleInterActive = () => {
  // 最终显示视图
  const currentShow = ref('cd')
  // cd样式
  const middleLeftStyle = ref(null)
  // 歌词样式
  const middleRightStyle = ref(null)
  // 保存手指触摸的各项信息
  const touch = {}
  // 当前显示的视图
  let currentView = 'cd'

  function onMiddleTouchStart(e) {
    touch.startX = e.touches[0].pageX
    touch.startY = e.touches[0].pageY
    // 方向锁
    touch.directionLocked = ''
  }

  function onMiddleTouchMove(e) {
    const deltaX = e.touches[0].pageX - touch.startX
    const deltaY = e.touches[0].pageY - touch.startY

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    // 如果没有方向锁
    if (!touch.directionLocked) {
      touch.directionLocked = absDeltaX >= absDeltaY ? 'h' : 'v'
    }
    // 如果是纵向滚动
    if (touch.directionLocked === 'v') {
      return
    }

    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    // 计算百分比
    touch.percent = Math.abs(offsetWidth / window.innerWidth)

    if (currentView === 'cd') {
      if (touch.percent > 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }
    // 设置cd样式
    middleLeftStyle.value = {
      opacity: 1 - touch.percent
    }
    // 设置歌词样式
    middleRightStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`
    }
  }

  function onMiddleTouchEnd() {
    let offsetWidth
    let opacity
    // 最终要显示的是cd
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    const duration = 300
    // 设置cd样式
    middleLeftStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`
    }
    // 设置歌词样式
    middleRightStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `${duration}ms`
    }
  }

  return {
    currentShow,
    middleLeftStyle,
    middleRightStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}
