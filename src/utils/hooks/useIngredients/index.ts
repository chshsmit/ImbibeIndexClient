import axios, { AxiosError, AxiosResponse } from "axios";
import { Ingredient } from "model/Ingredient";
import { useEffect, useState } from "react";
import { ErrorResponse, GetUserIngredientsResponse } from "types/api";
import { apiUrl } from "utils";

export const useIngredients = (userId: number | undefined) => {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [error, setError] = useState<ErrorResponse | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    if (userId !== undefined) {
      setLoading(true);
      axios({
        method: "GET",
        withCredentials: true,
        url: apiUrl(`/ingredients/${userId}`),
      })
        .then((res: AxiosResponse<GetUserIngredientsResponse>) => {
          if (isMounted) {
            setLoading(false);
            setIngredients(res.data.userIngredients);
          }
        })
        .catch((err: AxiosError<ErrorResponse>) => {
          if (isMounted) {
            console.log(err);
            setLoading(false);
            setError(err.response?.data);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { loading, ingredients, error, setIngredients };
};
