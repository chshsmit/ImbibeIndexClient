import axios, { AxiosError, AxiosResponse } from "axios";
import { Recipe } from "model/Recipe";
import { useEffect, useState } from "react";
import { ErrorResponse, RecipeResponse } from "types/api";
import { apiUrl } from "utils";

export const useRecipe = (recipeId: string | string[] | undefined) => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);

  useEffect(() => {
    if (recipeId !== undefined && !Array.isArray(recipeId))
      axios({
        method: "GET",
        withCredentials: true,
        url: apiUrl(`/recipes/${recipeId}`),
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
