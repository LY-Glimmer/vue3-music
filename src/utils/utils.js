/**
 * 封装一些方法
 **/

/**
 * 随机算法
 * @param {*} source Array
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
