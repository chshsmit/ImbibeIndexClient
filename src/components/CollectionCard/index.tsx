//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  AspectRatio,
  Button,
  Card,
  Divider,
  Group,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Settings, Trash } from "tabler-icons-react";
import { Collection } from "types";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface CollectionCardProps {
  collection: Collection;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const CollectionCard = ({
  collection,
}: CollectionCardProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const theme = useMantineTheme();

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <Card shadow="xl" p="lg">
      <Card.Section>
        <AspectRatio ratio={5184 / 3456}>
          <Image src="/cocktail.jpg" alt="cocktail" layout="fill" />
        </AspectRatio>
      </Card.Section>
      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text weight={500}>{collection.name}</Text>
        <Menu>
          <Menu.Label>Update</Menu.Label>
          <Menu.Item icon={<Settings size={14} />}>Rename</Menu.Item>
          <Menu.Item icon={<Settings size={14} />}>Move</Menu.Item>
          <Divider />
          <Menu.Label>Danger Zone</Menu.Label>
          <Menu.Item color="red" icon={<Trash size={14} />}>
            Delete
          </Menu.Item>
        </Menu>
      </Group>
      <Link
        href={
          collection.type === "collection"
            ? `/myrecipes/collection/${collection.id}`
            : `/recipe/${collection.id}`
        }
      >
        <Button variant="gradient" fullWidth style={{ marginTop: 15 }}>
          View {collection.type === "collection" ? "Collection" : "Recipe"}
        </Button>
      </Link>
    </Card>
  );
};

export default CollectionCard;
