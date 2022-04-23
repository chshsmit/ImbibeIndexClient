import { Ingredient } from "model/Ingredient";
import { RecipeTake } from "model/RecipeTake";

export interface TakeIngredients {
  id: number;
  ingredientAmount: string;
  unit: string;
  recipeTake: RecipeTake;
  ingredient: Ingredient;
}
