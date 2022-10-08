/**
 * @name: Vuex注册全部模块
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.10.07
 **/
import { createStore } from 'vuex'
import getters from '@/store/getters'

// 获取modules下的所有js文件
const modulesFiles = require.context('./modules', true, /\.js$/)

// 组合模块对象
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 拿到纯文件名
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 拿到文件导出对象
  const value = modulesFiles(modulePath)
  // 将默认导出的给一个对象
  modules[moduleName] = value.default
  // 返回这个对象
  return modules
}, {})
export default createStore({
  getters,
  modules
})
