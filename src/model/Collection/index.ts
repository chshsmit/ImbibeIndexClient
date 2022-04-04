import { Recipe } from "model/Recipe";
import { User } from "model/User";

export interface Collection {
  id: string;
  name: string;
  isPrivateCollection: boolean;
  parent: Collection;
  subCollections: Collection[];
  recipes: Array<Recipe>;
  user: User;
}
