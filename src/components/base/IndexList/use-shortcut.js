import { computed, ref } from 'vue'

export const useShortcut = (props, groupRef) => {
  // 滚动组件实例
  const scrollRef = ref(null)
  // 获取li拿到高度
  const ulRef = ref(null)
  const LI_HEIGHT = computed(() => {
    return Math.ceil(ulRef.value.children[0].clientHeight)
  })
  // 收集手指触摸的坐标
  const touch = {}
  // 计算标题数据
  const shortcutList = computed(() => {
    return props.data.map(group => group.title)
  })
  // 手指触摸开始的回调函数
  const onShortcutTouchStart = (event) => {
    // 获取元素索引
    const anchorIndex = parseInt(event.target.dataset.index)
    // 记录开始触摸时候的y坐标
    touch.y1 = event.touches[0].pageY
    // 保存触摸时元素的index值
    touch.anchorIndex = anchorIndex
    // 跳转到对应组
    scrollTo(anchorIndex)
  }
  // 手指触摸结束的回调函数
  const onShortcutTouchMove = (event) => {
    touch.y2 = event.touches[0].pageY
    // 计算2个坐标的差值
    const delta = (touch.y2 - touch.y1) / LI_HEIGHT.value | 0
    // 计算当前索引
    const anchorIndex = touch.anchorIndex + delta
    // 跳转到对应组
    scrollTo(anchorIndex)
  }

  // 根据索引获取元素跳转到对应组
  const scrollTo = (index) => {
    // 如果index不合法
    if (isNaN(index)) return
    // index的值最小是0最大是index
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    // 获取当前索引对应组的元素
    const targetEl = groupRef.value.children[index]
    // 拿到scroll组件实例
    const scroll = scrollRef.value.scroll
    // 调用方法跳转到当前组
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    ulRef
  }
}
