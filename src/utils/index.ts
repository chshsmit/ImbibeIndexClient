import { CollectionMap } from "types";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const no_op = () => {};

/**
 * Recursive method to determine the order of the breadcrumbs
 *
 * @param collectionId The id we are building the breadcrumb path off of
 * @param path The current state of the breadcrumb path
 * @returns array of the ids in the order for the breadcrumb
 */
export const determineBreadcrumbPath = (
  collectionId: string,
  path: Array<string> = []
): Array<string> => {
  const collection = CollectionMap.get(collectionId)!;

  if (collection.parent === null) {
    return [collection.id, ...path];
  }

  return determineBreadcrumbPath(collection.parent, [collection.id, ...path]);
};
