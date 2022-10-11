import { createRouter, createWebHashHistory } from 'vue-router'
// 布局组件
import layout from '@/layout'
// 用户
import User from '@/views/User'
// 推荐
import Recommend from '@/views/Recommend'
// 歌手
import Singer from '@/views/Singer'
// 歌手详情
import SingerDetail from '@/views/Singer/pages/singerDetail'
// 排行
import TopList from '@/views/TopList'
// 搜索
import Search from '@/views/Search'

const baseRouters = [
  {
    path: '/',
    component: layout,
    redirect: '/recommend',
    children: [
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/singer',
        component: Singer,
        children: [{
          path: ':id',
          component: SingerDetail
        }]
      },
      {
        path: '/top-list',
        component: TopList
      },
      {
        path: '/search',
        component: Search
      }
    ]
  },
  {
    path: '/user',
    component: User
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: baseRouters
})

export default router
