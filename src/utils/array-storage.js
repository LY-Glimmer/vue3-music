/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-17 13:56:48
 * @Last Modified by:   LY_Glimmer
 * @Last Modified time: 2022-10-17 13:56:48
 */
import storage from 'good-storage'
// 添加一个元素
const inertArray = (arr, val, compare) => {
  const result = arr.some(compare)
  if (result) return
  arr.unshift(val)
}
// 保存
export const save = (item, key, compare) => {
  const items = storage.get(key, [])
  inertArray(items, item, compare)
  storage.set(key, items)
  return items
}
// 删除一个元素
const deleteFromArray = (arr, compare) => {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// 移除
export const remove = (key, compare) => {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

// 加载数据
export const load = (key) => {
  return storage.get(key, [])
}
