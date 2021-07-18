import { concurrencyControlWrapper as _concurrencyControlWrapper } from '../packages/concurrencyControlWrapper'
import { deepClone as _deepClone } from '../packages/deepClone'
import {
  mapStruct as _mapStruct,
  mapStructArr as _mapStructArr
} from '../packages/mapStruct'

export const concurrencyControlWrapper = _concurrencyControlWrapper
export const deepClone = _deepClone
export const mapStruct = _mapStruct
export const mapStructArr = _mapStructArr
export default {
  concurrencyControlWrapper,
  deepClone,
  mapStruct,
  mapStructArr
}
