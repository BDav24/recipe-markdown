export const isEmpty = (v: any): boolean =>
  v === undefined || v === null || v === undefined || v === '' || v === false

export const notEmpty = (v: any): boolean => !isEmpty(v)

export const isEmptyArray = (v: any[]): boolean => isEmpty(v) || v.length === 0

export const nonEmptyArray = (v: any[]): boolean => notEmpty(v) && v.length > 0

export const joinNotEmpty = (array: any[], separator: string): string =>
  array.filter(notEmpty).join(separator)
