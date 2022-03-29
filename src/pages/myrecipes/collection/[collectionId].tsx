//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Anchor, Breadcrumbs, Button, Group, Space } from "@mantine/core";
import CollectionListItem from "components/CollectionListItem";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FilePlus, FolderPlus } from "tabler-icons-react";
import { CollectionMap } from "types";
import { determineBreadcrumbPath } from "utils";

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

  const { collectionId } = router.query;

  if (collectionId === undefined || Array.isArray(collectionId)) {
    return <div>Error</div>;
  }

  const collection = CollectionMap.get(collectionId)!;

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <div>
      <Breadcrumbs>
        {determineBreadcrumbPath(collectionId).map((breadcrumbCollectionId) => {
          const collectionForAnchor = CollectionMap.get(
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
        })}
      </Breadcrumbs>
      <Space h="xl" />
      {collection.subCollections.length !== 0 && (
        <Group>
          <Button variant="gradient" leftIcon={<FolderPlus />}>
            New Collection
          </Button>
          <Button variant="gradient" leftIcon={<FilePlus />}>
            New Recipe
          </Button>
        </Group>
      )}
      <Space h="xl" />
      {collection.subCollections.length === 0 ? (
        <Group direction="column">
          <Button
            variant="gradient"
            leftIcon={<FolderPlus />}
            style={{ width: 300 }}
          >
            New Collection in {collection.name}
          </Button>
          <Button
            variant="gradient"
            leftIcon={<FolderPlus />}
            style={{ width: 300 }}
          >
            New Recipe in {collection.name}
          </Button>
        </Group>
      ) : (
        <Group direction="column">
          {collection.subCollections.map((item) => (
            <CollectionListItem item={CollectionMap.get(item)!} key={item} />
          ))}
        </Group>
      )}
    </div>
  );
};

export default CollectionList;
