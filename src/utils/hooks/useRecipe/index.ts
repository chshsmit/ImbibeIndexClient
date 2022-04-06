import { RecipeResponse } from "api/recipes/types";
import { ErrorResponse } from "api/types/apiTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Recipe } from "model/Recipe";
import { useEffect, useState } from "react";

export const useRecipe = (recipeId: string | string[] | undefined) => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);

  useEffect(() => {
    if (recipeId !== undefined && !Array.isArray(recipeId))
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/recipes/${recipeId}`,
      })
        .then((res: AxiosResponse<RecipeResponse>) => {
          setRecipe(res.data.recipe);
          setLoading(false);
        })
        .catch((err: AxiosError<ErrorResponse>) => {
          console.log(err);
          setError(err.response?.data);
          setLoading(false);
        });
  }, [recipeId]);

  return { loading, recipe, error };
};
