/**
 * @module CommUtil
 */

/**
 * 用于在async方法中, 实现类似休眠效果
 * @param {number} sleepTime 休眠时间. 单位:毫秒 默认:300毫秒
 * @return {Promise<unknown>}
 */
export const sleep = (sleepTime = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, sleepTime)
  })
}
