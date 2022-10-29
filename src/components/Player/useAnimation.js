/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-29 16:47:26
 * @Last Modified by: LY_Glimmer
 * @Last Modified time: 2022-10-29 20:03:17
 */
/**
 * cd的动画
 **/
import { ref } from 'vue'
import animations from 'create-keyframe-animation'
export const useAnimation = () => {
  const cdWrapperRef = ref(null)
  let entering = false
  let leaving = false
  // 进入
  const enter = (el, done) => {
    if (leaving) {
      afterLeave()
    }
    entering = true
    const { x, y, scale } = getPosAndScale()
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    }
    // 注册一个动画
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }
    })
    animations.runAnimation(cdWrapperRef.value, 'move', done)
  }
  // 进入之后
  const afterEnter = () => {
    entering = false
    animations.unregisterAnimation('move')
    cdWrapperRef.value.style.animation = ''
  }
  // 离开
  const leave = (el, done) => {
    if (entering) {
      afterEnter()
    }
    leaving = true
    const { x, y, scale } = getPosAndScale()
    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    // 监听过度结束
    cdWrapperEl.addEventListener('transitionend', next)

    function next() {
      // 移除
      cdWrapperEl.removeEventListener('transitionend', next)
      done()
    }
  }
  // 离开之后
  const afterLeave = () => {
    leaving = false
    const cdWrapperEl = cdWrapperRef.value
    cdWrapperEl.style.transition = ''
    cdWrapperEl.style.transform = ''
  }
  // 计算偏移量和缩放比
  const getPosAndScale = () => {
    // 这里得换成动态的 但是获取DOM来算太麻烦了😂
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    // 偏移
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    // 缩放
    const scale = targetWidth / width

    return {
      x,
      y,
      scale
    }
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}
