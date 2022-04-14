import { AxiosRequestConfig } from "axios";
import { CreateRecipeRequest } from "types/api";

export const getCreateRecipeConfig = (
  newId: string,
  parentId: string,
  name: string,
  userId: number,
  ingredientId: number
): AxiosRequestConfig<CreateRecipeRequest> => {
  return {
    method: "POST",
    data: {
      type: "ingredient",
      name,
      id: newId,
      parentId,
      isPrivate: true,
      ingredientId,
    },
    withCredentials: true,
    url: `http://localhost:5000/recipes/user/${userId}`,
  };
};
