import { createApp } from 'vue'
import Loading from './index.vue'
const loadingDirective = {
  mounted(el, binding) {
    // 创建一个组件实例
    const app = createApp(Loading)
    // 挂载到一个div上 并且拿到这个实例
    const instance = app.mount(document.createElement('div'))
    // 保存一下 instance
    el.instance = instance
    // 如果是true那么加载loading
    if (binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    // 更新的时候如果值发生了变化
    if (binding.value !== binding.oldValue) {
      // 如果是ture那就添加否则就移除
      binding.value ? append(el) : remove(el)
    }
  }
}
// 添加
function append(el) {
  el.appendChild(el.instance.$el)
}

// 移除
function remove(el) {
  el.removeChild(el.instance.$el)
}

export default app => {
  app.directive('loading', loadingDirective)
}
