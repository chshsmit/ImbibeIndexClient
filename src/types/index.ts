export interface Collection {
  type: "recipe" | "collection";
  name: string;
  id: string;
  subCollections: Array<string>;
  parent: string | null;
}

export interface CollectionEntryItem {
  name: string;
  id: string;
  parent: string | null;
  subCollections: Array<string>;
  recipes: Array<string>;
}

export interface RecipeEntryItem {
  recipeId: string;
  name: string;
  isPrivate: boolean;
  collectionId: string;
}
