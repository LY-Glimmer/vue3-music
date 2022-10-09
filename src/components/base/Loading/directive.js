import { createApp } from 'vue'
import { addClass, removeClass } from '@/utils/dom'
import Loading from './index.vue'
// 添加的类名
const relativeClass = '.g-relative'
// loading指令
const loadingDirective = {
  mounted(el, binding) {
    // 创建一个组件实例
    const app = createApp(Loading)
    // 挂载到一个div上 并且拿到这个实例
    const instance = app.mount(document.createElement('div'))
    // 保存一下 instance
    el.instance = instance
    // 拿到指令传递的参数
    const title = binding.arg
    // 如果title存在那么调用实例上的方法添加title
    if (title) {
      instance.setTitle(title)
    }
    // 如果是true那么加载loading
    if (binding.value) {
      // 添加到DOM
      append(el)
    }
  },
  updated(el, binding) {
    // 拿到指令传递的参数
    const title = binding.arg
    // 如果title存在那么调用实例上的方法添加title
    if (title) {
      el.instance.setTitle(title)
    }
    // 更新的时候如果值发生了变化
    if (binding.value !== binding.oldValue) {
      // 如果是ture那就添加否则就移除
      binding.value ? append(el) : remove(el)
    }
  }
}
// 添加
function append(el) {
  // 获取元素的所有样式
  const style = getComputedStyle(el)
  // 如果父元素上没有定位
  if (!['absolute', 'fixed', 'relative'].includes(style.position)) {
    // 添加类名
    addClass(el, relativeClass)
  }
  // 添加到DOM
  el.appendChild(el.instance.$el)
}

// 移除
function remove(el) {
  // 移除类名
  removeClass(el, relativeClass)
  // 移除出DOM
  el.removeChild(el.instance.$el)
}

export default app => {
  app.directive('loading', loadingDirective)
}
