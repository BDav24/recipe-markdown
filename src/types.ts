export enum RecipeType {
  Appetizer = 'appetizer',
  Starter = 'starter',
  MainDish = 'main dish',
  SideDish = 'side dish',
  Sauce = 'sauce',
  Dessert = 'dessert',
  Drink = 'drink'
}

export type Recipe = {
  title: string
  description?: Text
  ingredients?: Ingredient[]
  servings?: number
  ustensils?: Ustensil[]
  directions: Direction[]
  media?: Media[]
  meta?: RecipeMetaType
}

export type RecipeMetaType = {
  type?: RecipeType | string
  tags?: string[]
  places?: Place[]
  prepTime?: string
  cookTime?: string
  complexity?: string
  cost?: string
  // nutrition?: calories...
}

export type Text = {
  type: 'text' | 'comment'
  text: string
}[]

export type Ingredient = {
  group?: string
  name: string
  quantity: number
  unit?: string
  media?: Media
}

export type Direction = {
  group?: string
  step?: string
  text: Text
  media?: Media[]
}

export type Place = {
  type?: string
  label: string
}

export type Media = {
  src: string
  url?: string
  alt?: string
}

export type Ustensil = {
  label: string
  quantity?: number
  media?: Media
}
