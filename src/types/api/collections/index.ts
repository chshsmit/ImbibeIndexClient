import { CollectionEntryItem, RecipeEntryItem } from "types";

//---------------------------------------------------------------
// Collections and Recipes for a User
// GET /collections/user/:userId
//---------------------------------------------------------------

export interface CollectionsForUserResponse {
  collections: { [k: string]: CollectionEntryItem };
  recipes: { [k: string]: RecipeEntryItem };
}

//---------------------------------------------------------------
// New Collection or Recipe
// POST /collections/user/:userId
//---------------------------------------------------------------

export interface NewCollectionRequest {
  id: string;
  name: string;
  parentId: string;
  isPrivate: boolean;
}

export interface NewCollectionResponse {
  success: boolean;
}
