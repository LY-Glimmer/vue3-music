/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-17 13:56:53
 * @Last Modified by:   LY_Glimmer
 * @Last Modified time: 2022-10-17 13:56:53
 */
/**
 * @name: 验证方法
 * @description:
 * @author: LY_Glimmer
 * @time: 2022.10.07
 **/
/**
 * 判断是否是外部资源
 * @param {*} path
 **/
// 是否是外部资源
export const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path)
