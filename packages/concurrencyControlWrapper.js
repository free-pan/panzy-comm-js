/**
 * 异步方法并发控制包装器, 内部通过闭包特性, 控制异步方法是否实际执行
 * @param asyncMethod 异步方法
 * @return {(function(...[*]): Promise<undefined|*>)|*} asyncMethod包装器方法
 */
export const concurrencyControlWrapper = (asyncMethod) => {
  // 通过闭包方式, 控制asyncMethod方法是否执行
  let executing = false
  return async (...args) => {
    if (executing) {
      // asyncMethod方法正在执行, 则直接返回
      return
    }
    // 设置asyncMethod方法正在执行
    executing = true
    try {
      // 执行asyncMethod方法
      return await asyncMethod(...args)
    } finally {
      // 设置asyncMethod方法执行完毕
      executing = false
    }
  }
}
