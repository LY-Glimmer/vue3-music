/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-17 13:56:39
 * @Last Modified by: LY_Glimmer
 * @Last Modified time: 2022-10-17 13:57:01
 */

// element.classList 通过ClassList可以获取元素的全部类名
// 通过ClassList.remove()可以删除元素的一个或多个类名
// 通过ClassList.add()可以向元素添加一个或多个类名
// 通过ClassList.length可以获取到元素类名的数量
// 通过ClassList.item(n)可以获取到元素类名索引为n的类名
// 通过ClassList.toggle可以为元素切换类
// 通过ClassList.contains(n)查看元素是否存在类名为"n"的类
/**
 * 给元素添加一个class
 * @param {*} el 元素
 * @param {*} className 类名
 */
export const addClass = (el, className) => {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}
/**
 * 给元素删除一个class
 * @param {*} el  元素
 * @param {*} className 类名
 */
export const removeClass = (el, className) => {
  el.classList.remove(className)
}
