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

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface CollectionCardProps {
  idForPath: string;
  name: string;
  type: "collection" | "recipe";
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const CollectionCard = ({
  idForPath,
  name,
  type,
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
        <Text weight={500}>{name}</Text>
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
          type === "collection"
            ? `/myrecipes/collection/${idForPath}`
            : `/recipe/${idForPath}`
        }
      >
        <Button variant="gradient" fullWidth style={{ marginTop: 15 }}>
          View {type === "collection" ? "Collection" : "Recipe"}
        </Button>
      </Link>
    </Card>
  );
};

export default CollectionCard;
