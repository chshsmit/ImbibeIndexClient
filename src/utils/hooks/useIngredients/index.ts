import { GetUserIngredientsResponse } from "api/ingredients/types";
import { ErrorResponse } from "api/types/apiTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Ingredient } from "model/Ingredient";
import { useEffect, useState } from "react";

export const useIngredients = (userId: number | undefined) => {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);

  useEffect(() => {
    if (userId !== undefined) {
      setLoading(true);
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/ingredients/${userId}`,
      })
        .then((res: AxiosResponse<GetUserIngredientsResponse>) => {
          setLoading(false);
          setIngredients(res.data.userIngredients);
        })
        .catch((err: AxiosError<ErrorResponse>) => {
          console.log(err);
          setLoading(false);
          setError(err.response?.data);
        });
    }
  }, [userId]);

  return { loading, ingredients, error, setIngredients };
};
