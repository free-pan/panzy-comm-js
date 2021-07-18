/**
 * @module CommUtil
 */
/**
 * 这是concurrencyControlWrapper方法返回的异步方法的类型描述
 * @callback WrapperAsyncMethod
 * @param {*} ...args 任意参数
 * @returns {(Promise<T>|any)} responseMessage
 */
/**
 * 这是concurrencyControlWrapper方法入参异步函数的类型描述
 * @callback AsyncMethod
 * @param {*} ...args 任意参数
 * @returns {(Promise<T>|any)} responseMessage
 */
/**
 * 异步方法并发控制包装器, 内部通过闭包特性, 控制异步方法是否实际执行
 * @author panzy
 * @function
 * @param {AsyncMethod} asyncMethod 异步方法
 * @param {null|undefined|object} callbackMethods 用于定义执行成功和执行异常时的回调方法(可选) {suc:async (ret)=>void,exp:async (ret)=>void}
 * @return {WrapperAsyncMethod} asyncMethod包装器方法
 */
export const concurrencyControlWrapper = (asyncMethod, callbackMethods) => {
  // 通过闭包方式, 控制asyncMethod方法是否执行
  let executing = false
  return async (...args) => {
    if (executing) {
      // asyncMethod方法正在执行, 则直接返回
      return
    }
    // 设置asyncMethod方法正在执行
    executing = true
    let sucCallback = null
    let expCallback = null
    if (callbackMethods) {
      if (callbackMethods.suc) {
        sucCallback = callbackMethods.suc
      }
      if (callbackMethods.exp) {
        expCallback = callbackMethods.exp
      }
    }
    try {
      // 执行asyncMethod方法
      const ret = await asyncMethod(...args)
      sucCallback && (await sucCallback(ret))
      return ret
    } catch (err) {
      if (expCallback) {
        await expCallback(err)
      } else {
        throw err
      }
    } finally {
      // 设置asyncMethod方法执行完毕
      executing = false
    }
  }
}
