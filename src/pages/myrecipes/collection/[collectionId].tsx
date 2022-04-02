//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Anchor,
  Breadcrumbs,
  Button,
  Group,
  SimpleGrid,
  Space,
} from "@mantine/core";
import CollectionCard from "components/CollectionCard";
import NewCollectionModal from "components/NewCollectionModal";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { FilePlus, FolderPlus } from "tabler-icons-react";
import { determineBreadcrumbPath } from "utils";
import { RecipeContext } from "utils/context/RecipeContext";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const CollectionList = (): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const router = useRouter();
  const { recipes, collections } = useContext(RecipeContext);
  const { collectionId } = router.query;

  const [newCollectionInfo, setNewCollectionInfo] = useState<{
    type: "recipe" | "collection";
    opened: boolean;
  }>({
    type: "collection",
    opened: false,
  });

  if (
    collectionId === undefined ||
    Array.isArray(collectionId) ||
    !collections.has(collectionId)
  ) {
    return <div>Error</div>;
  }

  const collection = collections.get(collectionId)!;

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const openNewCollection = (type: "recipe" | "collection") => {
    setNewCollectionInfo({
      type,
      opened: true,
    });
  };

  const setModalVisibility = (opened: boolean) => {
    setNewCollectionInfo((curr) => {
      return {
        ...curr,
        opened,
      };
    });
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <div>
      <Breadcrumbs>
        {determineBreadcrumbPath(collectionId, collections).map(
          (breadcrumbCollectionId) => {
            const collectionForAnchor = collections.get(
              breadcrumbCollectionId
            )!;

            return (
              <Link
                key={breadcrumbCollectionId}
                href={`/myrecipes/collection/${breadcrumbCollectionId}`}
              >
                <Anchor>{collectionForAnchor.name}</Anchor>
              </Link>
            );
          }
        )}
      </Breadcrumbs>
      <Space h="xl" />
      <Group>
        <Button
          variant="gradient"
          leftIcon={<FolderPlus />}
          onClick={() => openNewCollection("collection")}
        >
          New Collection in {collection.name}
        </Button>
        <Button
          variant="gradient"
          leftIcon={<FilePlus />}
          onClick={() => openNewCollection("recipe")}
        >
          New Recipe in {collection.name}
        </Button>
      </Group>
      <Space h="xl" />

      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 1400, cols: 3, spacing: "md" },
          { maxWidth: 992, cols: 2, spacing: "sm" },
          { maxWidth: 576, cols: 1, spacing: "sm" },
        ]}
      >
        {collection.subCollections.map((subCollectionId) => (
          <CollectionCard
            idForPath={subCollectionId}
            name={collections.get(subCollectionId)!.name}
            type="collection"
            key={subCollectionId}
          />
        ))}
        {collection.recipes.map((recipeId) => (
          <CollectionCard
            key={recipeId}
            idForPath={recipeId}
            name={recipes.get(recipeId)!.name}
            type="recipe"
          />
        ))}
      </SimpleGrid>

      <NewCollectionModal
        info={newCollectionInfo}
        setOpened={setModalVisibility}
        parent={collection}
      />
    </div>
  );
};

export default CollectionList;
