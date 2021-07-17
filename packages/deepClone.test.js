import { deepClone } from './deepClone'

test('简单对象复制', () => {
  const date = new Date()
  const sourceObj = { name: '张三', age: 14, birthday: date, male: true }
  const targetObj = deepClone(sourceObj)
  expect(targetObj !== sourceObj).toBeTruthy()
})

test('原始对象为null', () => {
  const sourceObj = null
  const targetObj = deepClone(sourceObj)
  expect(targetObj === sourceObj).toBeTruthy()
})

test('原始对象非对象类型', () => {
  const sourceObj = 11
  const targetObj = deepClone(sourceObj)
  expect(targetObj === sourceObj).toBeTruthy()
})

test('prototype属性测试', () => {
  function Person(name) {
    this.name = name
  }

  const person = new Person('张三')
  Person.prototype.age = 13
  const targetObj = deepClone(person)
  expect(JSON.stringify(targetObj)).toBe(JSON.stringify(person))
})
