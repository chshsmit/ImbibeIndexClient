import { AxiosRequestConfig } from "axios";
import { CreateRecipeRequest } from "types/api";

export const getCreateRecipeConfig = (
  newId: string,
  parentId: string,
  name: string,
  userId: number
): AxiosRequestConfig<CreateRecipeRequest> => {
  return {
    method: "POST",
    data: {
      type: "other",
      name,
      id: newId,
      parentId,
      isPrivate: true,
    },
    withCredentials: true,
    url: `http://localhost:5000/recipes/user/${userId}`,
  };
};
