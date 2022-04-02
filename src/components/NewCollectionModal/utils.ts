import { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import { NewCollectionRequest } from "api/collections/types";
import { CreateRecipeRequest } from "api/recipes/types";
import { AxiosRequestConfig } from "axios";
import { CreateFormType } from ".";

export const getCollectionConfig = (
  form: UseForm<CreateFormType>,
  newId: string,
  parentId: string,
  userId: number
): AxiosRequestConfig<NewCollectionRequest> => {
  return {
    method: "POST",
    data: {
      name: form.values.name,
      parentId,
      id: newId,
      isPrivate: form.values.isPrivate,
    },
    withCredentials: true,
    url: `http://localhost:5000/collections/user/${userId}`,
  };
};

export const getRecipeConfig = (
  form: UseForm<CreateFormType>,
  newId: string,
  parentId: string,
  userId: number
): AxiosRequestConfig<CreateRecipeRequest> => {
  return {
    method: "POST",
    data: {
      type: form.values.recipeType,
      name: form.values.name,
      id: newId,
      parentId,
      isPrivate: form.values.isPrivate,
    },
    withCredentials: true,
    url: `http://localhost:5000/recipes/user/${userId}`,
  };
};
