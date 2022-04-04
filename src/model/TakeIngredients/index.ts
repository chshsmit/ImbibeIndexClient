import { RecipeTake } from "model/RecipeTake";

export interface TakeIngredients {
  id: number;
  ingredientName: string;
  ingredientUnit: string;
  ingredientAmount: number;
  ingredientRecipeId?: string;
  recipeTake: RecipeTake;
}
