import { createApp } from 'vue'
import App from './App.vue'
// 图片懒加载
import lazyPlugin from 'vue3-lazy'
// 路由
import router from './router'
// 状态管理工具
import pinia from '@/stores/index'

// 引入全局样式文件
import '@/assets/styles/index.scss'
// 导入SvgIcon
import installSvgIcon from '@/icons/index'
// 导入loading指令
import installLoading from '@/directive/Loading'
import installEmpty from '@/directive/Empty'
const app = createApp(App)
// 全局注册SvgIcon
installSvgIcon(app)
// 注册loading指令
installLoading(app)
// 注册empty指令
installEmpty(app)
// 使用pinia
app.use(pinia)
// 使用路由
app.use(router)
// 图片懒加载
app.use(lazyPlugin, {
  loading: 'https://img1.baidu.com/it/u=2785743127,1658316659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889'
})
app.mount('#app')
