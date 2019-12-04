export const isEmpty = (v: any): boolean =>
  v === undefined || v === null || v === undefined || v === '' || v === false

export const isNotEmpty = (v: any): boolean => !isEmpty(v)

export const isEmptyOrEmptyArray = (v: any[]): boolean => isEmpty(v) || v.length === 0

export const isNotEmptyArray = (v: any[]): boolean => isNotEmpty(v) && v.length > 0

export const joinNotEmpty = (array: any[], separator: string): string =>
  array.filter(isNotEmpty).join(separator)
