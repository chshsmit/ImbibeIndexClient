import { Collection } from "types";

//-------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const no_op = () => {};

//-------------------------------------------------------------------------

/**
 * Recursive method to determine the order of the breadcrumbs
 *
 * @param collectionId The id we are building the breadcrumb path off of
 * @param path The current state of the breadcrumb path
 * @returns array of the ids in the order for the breadcrumb
 */
export const determineBreadcrumbPath = (
  collectionId: string,
  recipes: Map<string, Collection>,
  path: Array<string> = []
): Array<string> => {
  const collection = recipes.get(collectionId)!;

  if (collection.parent === null) {
    return [collection.id, ...path];
  }

  return determineBreadcrumbPath(collection.parent, recipes, [
    collection.id,
    ...path,
  ]);
};

//-------------------------------------------------------------------------

export const makeRandomId = (): string => {
  let result = "";

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
