export type Recipe = {
  title: string
  description?: Text
  ingredients: Ingredient[]
  servings?: number
  directions: { [step: number]: Direction[] }
  media?: Media[]
  meta: {
    type?: RecipeType | string
    tags?: string[]
    place?: Place[]
    prepareTimeSeconds?: number
    cookTimeSeconds?: number
    complexity?: number
    cost?: number
    utensils?: Utensil[]
    // nutrition?: calories...
  }
}

enum RecipeType {
  Appetizer,
  Starter,
  MainDish,
  SideDish,
  Sauce,
  Dessert,
  Drink
}

type Text = {
  type: 'text' | 'comment'
  text: string
}[]

type Ingredient = {
  name: string
  quantity: number
  unit?: string
  media?: Media
}

type Direction = {
  text: Text
  media?: Media[]
}

type Place = {
  type?: string
  label: string
}

type Media = {
  type: 'picture' | 'video'
  url: string
}

type Utensil = {
  label: string
  quantity?: number
  media?: Media
}
