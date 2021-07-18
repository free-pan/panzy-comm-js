import { concurrencyControlWrapper } from './concurrencyControlWrapper'

let x = 0
const asyncMethod = async () => {
  console.log('执行')
  return new Promise((resolve) => {
    setTimeout(() => {
      x += 1
      resolve(111)
    }, 500)
  })
}

const sleep = async (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}
// test('验证是异步的', async () => {
//   asyncMethod()
//   asyncMethod()
//   asyncMethod()
//   await sleep(3)
//   expect(x).toBe(3)
// })
test('防止重复提交测试', async () => {
  const wrapperAsyncMethod = concurrencyControlWrapper(asyncMethod)
  wrapperAsyncMethod()
  wrapperAsyncMethod()
  wrapperAsyncMethod()
  wrapperAsyncMethod()
  await sleep(3)
  expect(x === 1).toBeTruthy()
}, 10000)

test('suc回调测试', async () => {
  expect.assertions(1) //断言:必须执行一次expect
  const suc = async (ret) => {
    expect(ret).toBe(111)
  }
  const wrapperAsyncMethod = concurrencyControlWrapper(asyncMethod, { suc })
  wrapperAsyncMethod()
  await sleep(3)
}, 10000)

test('exp回调测试', async () => {
  expect.assertions(1) //断言:必须执行一次expect
  const exp = async (err) => {
    expect(err.toString()).toBe('执行失败')
  }
  const asyncTest = async () => {
    return Promise.reject('执行失败')
  }
  const wrapperAsyncMethod = concurrencyControlWrapper(asyncTest, { exp })
  wrapperAsyncMethod()
  await sleep(3)
}, 10000)

test('reject测试', async () => {
  expect.assertions(1) //断言:必须执行一次expect
  const asyncTest = async () => {
    return Promise.reject('执行失败')
  }
  const wrapperAsyncMethod = concurrencyControlWrapper(asyncTest)
  try {
    await wrapperAsyncMethod()
  } catch (exp) {
    expect(exp.toString()).toBe('执行失败')
  }
  await sleep(3)
}, 10000)

test('exp回调继续抛出异常测试', async () => {
  expect.assertions(2) //断言:必须执行一次expect
  const exp = async (err) => {
    expect(err.toString()).toBe('执行失败')
    throw '继续抛出异常'
  }
  const asyncTest = async () => {
    return Promise.reject('执行失败')
  }
  const wrapperAsyncMethod = concurrencyControlWrapper(asyncTest, { exp })
  try {
    await wrapperAsyncMethod()
  } catch (err) {
    expect(err.toString()).toBe('继续抛出异常')
  }
  await sleep(3)
}, 10000)
