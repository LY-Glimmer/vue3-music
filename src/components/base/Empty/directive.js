// v-empty指令 处理没有数据的情况
import { createLoadingLikeDirective } from '@/utils/create-loading-like-directive'
import Empty from './index.vue'

export default app => {
  app.directive('empty', createLoadingLikeDirective(Empty, 'empty'))
}
