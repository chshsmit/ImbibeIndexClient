import React from "react";
import { CollectionEntryItem, RecipeEntryItem } from "types";

interface IRecipeContext {
  collections: Map<string, CollectionEntryItem>;
  recipes: Map<string, RecipeEntryItem>;
  setRecipes: (recipes: Map<string, RecipeEntryItem>) => void;
  setCollections: (recipes: Map<string, CollectionEntryItem>) => void;
}

const no_op_recipes = (recipes: Map<string, RecipeEntryItem>) => {
  console.log(recipes);
};

const no_op_collections = (collections: Map<string, CollectionEntryItem>) => {
  console.log(collections);
};

const RecipeContext = React.createContext<IRecipeContext>({
  recipes: new Map(),
  collections: new Map(),
  setRecipes: no_op_recipes,
  setCollections: no_op_collections,
});

export { RecipeContext };
