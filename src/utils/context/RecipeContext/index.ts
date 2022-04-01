import React from "react";
import { Collection } from "types";

interface IRecipeContext {
  recipes: Map<string, Collection>;
  setRecipes: (recipes: Map<string, Collection>) => void;
}

const no_op = (recipes: Map<string, Collection>) => {
  console.log(recipes);
};

const RecipeContext = React.createContext<IRecipeContext>({
  recipes: new Map(),
  setRecipes: no_op,
});

export { RecipeContext };
