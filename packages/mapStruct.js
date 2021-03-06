/**
 * @module CommUtil
 */

/**
 * 根据fieldsMappings的映射规则,将sourceObj中对应的字段映射成新字段名
 * @function
 * @author panzy
 * @param {*} sourceObj 原始对象
 * @param {object} fieldsMapping 字段映射规则(key必须为sourceObj中的字段名, value为需要改成的字段名。如: 期望将sourceObj.username改成name则映射为:{username:'name'})
 * @param {boolean} [keepOriginalField=false] keepOriginalField 是否在新对象中保留原始字段. 默认:false
 * @return {*}
 */
export const mapStruct = (
  sourceObj,
  fieldsMapping,
  keepOriginalField = false
) => {
  if (sourceObj === null || undefined === sourceObj) {
    // 原始对象为null或undefined, 直接返回
    return sourceObj
  }
  // 源对象不是对象类型, 直接返回
  if (typeof sourceObj !== 'object') return sourceObj
  // 源对象是日期类型
  if (sourceObj.constructor === Date) return new Date(sourceObj)
  // 创建新的目标对象(保持继承链)
  const targetObj = sourceObj.constructor()
  // 获取原始对象本身的所有属性名(不包含继承的属性)
  Object.keys(sourceObj).forEach((fieldName) => {
    // 获取当前属性的属性值
    const val = sourceObj[fieldName]
    // 获取当前属性的映射名
    const mappingFieldName = fieldsMapping[fieldName]
    if (mappingFieldName) {
      if (typeof mappingFieldName === 'string') {
        // 映射名存在, 则进行新名称映射
        targetObj[mappingFieldName] = val
      } else {
        // 映射名非字符串,则认为是一个自定义映射
        // 获取映射名称, 如果存在新的映射名称,则用新名称, 否则认为字段名称不改变
        const newMappingFieldName = mappingFieldName.mappingFieldName
          ? mappingFieldName.mappingFieldName
          : fieldName
        // 执行自定义映射转换
        targetObj[newMappingFieldName] = mappingFieldName.mappingMethod(val)
      }
      if (keepOriginalField) {
        // 保存原始属性名, 则在目标对象中, 再保存一次原始字段
        targetObj[fieldName] = val
      }
    } else {
      // 映射名不存在, 则复制原始字段
      targetObj[fieldName] = val
    }
  })
  return targetObj
}

/**
 * 根据fieldsMappings的映射规则,将objArr中每个对象对应的字段映射成新字段名
 * @function
 * @author panzy
 * @param {array|null|undefined} objArr 原始对象数组
 * @param {object} fieldsMapping 字段映射规则(key必须为sourceObj中的字段名, value为需要改成的字段名。如: 期望将sourceObj.username改成name则映射为:{username:'name'})
 * @param {boolean} [keepOriginalField=false] keepOriginalField 是否在新对象中保留原始字段. 默认:false
 * @returns {array|*}
 */
export const mapStructArr = (
  objArr,
  fieldsMapping,
  keepOriginalField = false
) => {
  if (objArr === null || undefined === objArr) {
    return objArr
  } else if (objArr.length === 0) {
    return []
  } else {
    const tmpArr = []
    for (const arrItem of objArr) {
      const tmp = mapStruct(arrItem, fieldsMapping, keepOriginalField)
      tmpArr.push(tmp)
    }
    return tmpArr
  }
}
