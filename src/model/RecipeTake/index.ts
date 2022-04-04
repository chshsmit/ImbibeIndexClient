import { Recipe } from "model/Recipe";
import { TakeIngredients } from "model/TakeIngredients";

export interface RecipeTake {
  id: number;
  isPrivate: boolean;
  name: string;
  takeNumber: number;
  isPublished: boolean;
  ingredients: Array<TakeIngredients>;
  recipe: Recipe;
}
