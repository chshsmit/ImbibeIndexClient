export interface Collection {
  type: "recipe" | "collection";
  name: string;
  id: string;
  subCollections: Array<string>;
  parent: string | null;
}
