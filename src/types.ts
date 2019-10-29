export enum RecipeType {
  Appetizer = 'appetizer',
  Starter = 'starter',
  MainDish = 'main dish',
  SideDish = 'side dish',
  Sauce = 'sauce',
  Dessert = 'dessert',
  Drink = 'drink'
}

export interface Recipe {
  title: string
  directionGroups: DirectionGroup[]
  meta?: RecipeMetaType
  description?: Content
  ingredientGroups?: IngredientGroup[]
  servings?: number
  ustensils?: Ustensil[]
}

export interface DirectionGroup {
  name?: string
  directions: Direction[]
}

export interface Direction {
  step?: string
  content: Content
}

export interface RecipeMetaType {
  type?: RecipeType | string
  tags?: string[]
  places?: Place[]
  prepTime?: string
  cookTime?: string
  complexity?: string
  cost?: string
  // nutrition?: calories...
}

export type Content = Array<Text | Media>

export interface IngredientGroup {
  name?: string
  ingredients: Ingredient[]
}

export interface Ingredient {
  name: string
  quantity: number
  unit?: string
  media?: Media
}

export interface Ustensil {
  label: string
  quantity?: number
  media?: Media
}

export interface Text {
  type: 'text' | 'comment'
  text: string
}

export interface Media {
  type: 'photo' | 'video'
  src: string
  url?: string
  alt?: string
}

export interface Place {
  type?: string
  label: string
}
