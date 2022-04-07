//---------------------------------------------------------------
// Imports
//---------------------------------------------------------------

import { Ingredient } from "model/Ingredient";

//---------------------------------------------------------------
// Create new Ingredient
// POST /
//---------------------------------------------------------------

export interface CreateIngredientRequest {
  name: string;
  userId: number;
}

export interface CreateIngredientResponse {
  success: boolean;
  userIngredients: Array<Ingredient>;
}

//---------------------------------------------------------------
// Get ingredients for user
// GET /:userId
//---------------------------------------------------------------

export interface GetUserIngredientsResponse {
  userIngredients: Array<Ingredient>;
}
