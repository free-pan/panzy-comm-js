/**
 * @module CommUtil
 */
/**
 * 对象深度克隆
 * @function
 * @author panzy
 * @param {*} obj 被克隆的对象
 * @return {*} 克隆出的新对象
 */
export const deepClone = (obj) => {
  if (obj === null || obj === undefined) return obj
  if (typeof obj !== 'object') return obj
  if (obj.constructor === Date) return new Date(obj)
  const newObj = new obj.constructor() // 保持继承链
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 不遍历其原型链上的属性
      const val = obj[key]
      // eslint-disable-next-line
      newObj[key] = typeof val === 'object' ? deepClone(val) : val // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newObj
}
