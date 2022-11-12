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
// 推荐页面详情
import Album from '@/views/Recommend/pages/Album.vue'
// 排行页面详情
import TopDetail from '@/views/TopList/pages/TopDetail.vue'

const baseRouters = [
  {
    path: '/',
    component: layout,
    redirect: '/recommend',
    children: [
      {
        path: '/recommend',
        component: Recommend,
        children: [
          {
            path: ':id',
            component: Album
          }
        ]
      },
      {
        path: '/singer',
        component: Singer,
        children: [
          {
            path: ':id',
            component: SingerDetail
          }
        ]
      },
      {
        path: '/top-list',
        component: TopList,
        children: [
          {
            path: ':id',
            component: TopDetail
          }
        ]
      },
      {
        path: '/search',
        component: Search,
        children: [{
          path: ':id',
          component: SingerDetail
        }]
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
