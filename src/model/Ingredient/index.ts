import { User } from "model/User";

export interface Ingredient {
  id: number;
  ingredientName: string;
  ingredientRecipeId?: string;
  user: User;
}
