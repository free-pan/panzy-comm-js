import { mapStruct, mapStructArr } from './mapStruct'

const date = new Date()
const obj = {
  userName: '张三',
  userAge: 12,
  userBirthday: date,
  userHobby: null
}

test('值为字符串的属性名转换', () => {
  const target = mapStruct(obj, { userName: 'name' })
  const expectObj = {
    name: '张三',
    userAge: 12,
    userBirthday: date,
    userHobby: null
  }
  const expectObjStr = JSON.stringify(expectObj)
  const targetStr = JSON.stringify(target)
  expect(targetStr).toBe(expectObjStr)
})

test('值为数字的属性名转换', () => {
  const target = mapStruct(obj, { userName: 'name', userAge: 'age' })
  const targetStr = JSON.stringify(target)
  const expectObj = {
    name: '张三',
    age: 12,
    userBirthday: date,
    userHobby: null
  }
  const expectObjStr = JSON.stringify(expectObj)
  expect(targetStr).toBe(expectObjStr)
})

test('值为日期的属性名转换', () => {
  const target = mapStruct(obj, {
    userName: 'name',
    userAge: 'age',
    userBirthday: 'birthday'
  })
  const targetStr = JSON.stringify(target)
  const expectObj = {
    name: '张三',
    age: 12,
    birthday: date,
    userHobby: null
  }
  const expectObjStr = JSON.stringify(expectObj)
  expect(targetStr).toBe(expectObjStr)
})

test('值为null的属性名转换', () => {
  const target = mapStruct(obj, {
    userName: 'name',
    userAge: 'age',
    userBirthday: 'birthday',
    userHobby: 'hobby'
  })
  const targetStr = JSON.stringify(target)
  const expectObj = {
    name: '张三',
    age: 12,
    birthday: date,
    hobby: null
  }
  const expectObjStr = JSON.stringify(expectObj)
  expect(targetStr).toBe(expectObjStr)
})

test('属性名在obj中不存在', () => {
  const target = mapStruct(obj, {
    userName: 'name',
    userAge: 'age',
    userBirthday: 'birthday',
    userHobby: 'hobby',
    userUnknow: 'unknow'
  })
  const targetStr = JSON.stringify(target)
  const expectObj = {
    name: '张三',
    age: 12,
    birthday: date,
    hobby: null
  }
  const expectObjStr = JSON.stringify(expectObj)
  expect(targetStr).toBe(expectObjStr)
})

test('obj为null', () => {
  const sourceObj = null
  const target = mapStruct(sourceObj, {
    userName: 'name',
    userAge: 'age',
    userBirthday: 'birthday',
    userHobby: 'hobby'
  })
  expect(target).toBe(sourceObj)
})

test('obj为undefined', () => {
  const sourceObj = {}.unknownField
  const target = mapStruct(sourceObj, {
    userName: 'name',
    userAge: 'age',
    userBirthday: 'birthday',
    userHobby: 'hobby'
  })
  expect(sourceObj).toBe(target)
})

test('子对象映射', () => {
  const sourceObj = {
    fullName: '张三',
    child: {
      childName: '张小三',
      childAGe: 13
    }
  }
  const expectObj = {
    name: '张三',
    child: {
      sonName: '张小三',
      childAGe: 13
    }
  }
  const expectStr = JSON.stringify(expectObj)
  const target = mapStruct(sourceObj, {
    fullName: 'name',
    child: {
      mappingMethod: (val) => {
        const tmp = mapStruct(val, { childName: 'sonName' })
        return tmp
      }
    }
  })
  expect(JSON.stringify(target)).toBe(expectStr)
})

test('对象集合映射', () => {
  const sourceObj = {
    fullName: '张三',
    bookList: [
      {
        bookName: '红岩',
        price: 13.5
      },
      {
        bookName: '机器猫',
        price: 23.5
      }
    ]
  }
  const expectObj = {
    name: '张三',
    books: [
      {
        title: '红岩',
        price: 13.5
      },
      {
        title: '机器猫',
        price: 23.5
      }
    ]
  }
  const expectStr = JSON.stringify(expectObj)
  const target = mapStruct(sourceObj, {
    fullName: 'name',
    bookList: {
      mappingFieldName: 'books',
      mappingMethod: (arr) => {
        return mapStructArr(arr, { bookName: 'title' })
      }
    }
  })
  expect(JSON.stringify(target)).toBe(expectStr)
})

test('保留原始字段', () => {
  const sourceObj = {
    username: '张三'
  }
  const target = mapStruct(sourceObj, { username: 'name' }, true)
  const expectObj = {
    name: '张三',
    username: '张三'
  }
  const expectObjStr = JSON.stringify(expectObj)
  const targetStr = JSON.stringify(target)
  expect(targetStr).toBe(expectObjStr)
})

test('数组对象复制:子对象为null', () => {
  const arrObj = null
  const targetArrObj = mapStructArr(arrObj, { name: 'username' })
  expect(arrObj).toBe(targetArrObj)
})

test('数组对象复制:子对象为空', () => {
  const arrObj = []
  const targetArrObj = mapStructArr(arrObj, { name: 'username' })
  expect(JSON.stringify(arrObj)).toBe(JSON.stringify(targetArrObj))
})

test('目标对象不是对象', () => {
  const obj = 1
  const targetArrObj = mapStruct(obj, { name: 'username' })
  expect(obj).toBe(targetArrObj)
})

test('目标对象是日期', () => {
  const obj = date
  const targetArrObj = mapStruct(obj, { name: 'username' })
  expect(JSON.stringify(obj)).toBe(JSON.stringify(targetArrObj))
})
