import { ref, watch, nextTick, computed } from 'vue'

export const useFixed = (props) => {
  // 标题DOM
  const fixedTitleRef = ref(null)
  // 组标题的高度
  const TITLE_HEIGHT = computed(() => {
    return parseInt(fixedTitleRef.value.clientHeight)
  })
  // 拿到DOM
  const groupRef = ref(null)
  // 收集高度
  const listHeights = ref([])
  // 收集当前滚动的坐标
  const scrollY = ref(0)
  // 当前渲染组的索引
  const currentIndex = ref(0)
  // 下一个组距离顶部的距离
  const distance = ref(0)
  // 计算当前组快离开时候的偏移量
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT.value) ? distanceVal - TITLE_HEIGHT.value : 0
    return {
      transform: `translateY(${diff}px)`
    }
  })
  // 计算当前固定的位置的标题
  const fixedTitle = computed(() => {
    // console.log(scrollY.value)
    if (scrollY.value < 0) return false
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })
  // 观察数据变化重新收集高度
  watch(() => props.data, () => {
    // 数据变化页面不会马上发生变化 所以拿到的高度是不对的
    // 使用nextTick保证收集高度的时候 DOM已经更新
    nextTick(() => {
      calculate()
    })
  })
  // 监听scrollY值的变化
  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value
    Array.from(listHeightsVal).reduce((item, currentItem, index) => {
      // 获取当前位置所在的区间
      if (newY >= item && newY <= currentItem) {
        // 保存当前所处位置的索引
        // 高度区间是比列表的索引多一个的所以获得的索引要 -1
        currentIndex.value = index - 1
        distance.value = currentItem - newY
        // console.log('currentIndex', currentIndex.value)
      }
      return currentItem
    })
  })
  // 收集高度区间
  const calculate = () => {
    const listHeightsVal = listHeights.value
    const list = groupRef.value.children
    // 清空
    listHeightsVal.length = 0
    let height = 0
    listHeightsVal.push(height)
    // 遍历DOM的子元素 记录高度
    Array.from(list).forEach(item => {
      height += item.clientHeight
      listHeightsVal.push(height)
    })
  }
  // 滚动事件
  const onScroll = (pos) => {
    scrollY.value = -pos.y
  }
  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex,
    fixedTitleRef
  }
}
