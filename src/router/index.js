import { createRouter, createWebHashHistory } from 'vue-router'
// 布局组件
import layout from '@/layout'
// 登录
// import Login from '@/views/Login'
// 用户
import User from '@/views/User'
// 推荐
import Recommend from '@/views/Recommend'
// 歌手
import Singer from '@/views/Singer'
// 排行
import TopList from '@/views/TopList'
// 搜索
import Search from '@/views/Search'

const baseRouters = [
  {
    path: '/user',
    component: User
  },
  {
    path: '/',
    component: layout,
    redirect: '/recommend',
    children: [
      // {
      //   path: '/login',
      //   component: Login
      // },
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/singer',
        component: Singer
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
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: baseRouters
})

export default router
