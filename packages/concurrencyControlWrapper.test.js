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
