/*
 * @Author: LY_Glimmer
 * @Date: 2022-11-11 16:03:44
 * @Last Modified by: LY_Glimmer
 * @Last Modified time: 2022-11-11 16:16:47
 */
// 高阶Scroll组件
import { h, mergeProps, withCtx, renderSlot, ref, computed, watch, nextTick } from 'vue'
import Scroll from '@/components/Scroll/index.vue'
import { usePlayerStore } from '@/stores/player'

export default {
  name: 'wrap-scroll',
  props: Scroll.props,
  emits: Scroll.emits,
  render(ctx) {
    return h(Scroll, mergeProps({
      ref: 'scrollRef'
    }, ctx.$props, {
      onScroll: (e) => {
        ctx.$emit('scroll', e)
      }
    }), {
      default: withCtx(() => {
        return [renderSlot(ctx.$slots, 'default')]
      })
    })
  },
  setup() {
    const scrollRef = ref(null)
    const scroll = computed(() => {
      return scrollRef.value.scroll
    })

    const playerStore = usePlayerStore()

    watch(() => playerStore.playList, async () => {
      await nextTick()
      scroll.value.refresh()
    })

    return {
      scrollRef,
      scroll
    }
  }
}
