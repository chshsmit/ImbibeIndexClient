import { Collection } from "model/Collection";
import { RecipeTake } from "model/RecipeTake";

export interface Recipe {
  recipeId: string;
  isPrivate: boolean;
  name: string;
  recipeType: "cocktail" | "syrup" | "liqueur" | "other";
  collection: Collection;
  takes: Array<RecipeTake>;
}
