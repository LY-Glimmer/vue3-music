/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-17 13:56:19
 * @Last Modified by:   LY_Glimmer
 * @Last Modified time: 2022-10-17 13:56:19
 */
/**
 * 洗牌算法
 * @param {*} source Array 返回一个被打乱的数组
 */
export const randomPlay = (source) => {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}
// 返回一个0到max之间的整数
function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}
// 交换数组中两个值的位置
function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
/**
 * 格式化时间 把多少秒格式化为分钟格式
 * @param {*} interval 时间
 **/
export const formatTime = (interval) => {
  interval = interval | 0
  // padStart padEnd 如果某个字符串不够指定长度，会在头部或尾部补全
  // 拿到分钟
  const minute = ((interval / 60 | 0) + '').padStart(2, '0')
  // 拿到秒
  const second = (interval % 60 + '').padStart(2, '0')
  // 返回分钟和秒
  return `${minute}:${second}`
}
