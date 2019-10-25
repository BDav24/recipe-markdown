export const notEmpty = (v: any): boolean => !!v

export const joinNotEmpty = (array: any[], separator: string): string =>
  array.filter(notEmpty).join(separator)
