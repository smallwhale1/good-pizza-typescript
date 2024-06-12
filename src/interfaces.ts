import type { Ingredient } from './enums';

export interface IGame {
  selectedIngredient: Ingredient;
}

export interface Order {
  ingredients: Ingredient[];
}

export interface IngredientInfo {
  ingredient: Ingredient;
  count: number;
}
