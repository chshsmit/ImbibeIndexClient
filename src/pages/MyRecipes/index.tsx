//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Space,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import {
  File,
  FilePlus,
  Folder,
  FolderPlus,
  Settings,
  Trash,
} from "tabler-icons-react";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface ListItemEntry {
  type: "recipe" | "collection";
  name: string;
  id: string;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const MyRecipes = (): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const [items] = useState<Array<ListItemEntry>>([
    {
      type: "collection",
      name: "Collection 1",
      id: "collection-1",
    },
    {
      type: "collection",
      name: "Collection 2",
      id: "collection-2",
    },
    {
      type: "recipe",
      name: "Recipe 1",
      id: "recipe-1",
    },
  ]);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <div>
      <Group>
        <Button variant="gradient" leftIcon={<FolderPlus />}>
          New Collection
        </Button>
        <Button variant="gradient" leftIcon={<FilePlus />}>
          New Recipe
        </Button>
      </Group>
      <Space h="xl" />
      <Group direction="column">
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </Group>
    </div>
  );
};

export default MyRecipes;

interface ListItemProps {
  item: ListItemEntry;
}

const ListItem = ({ item }: ListItemProps): React.ReactElement => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        display: "block",
        width: "50%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
        cursor: "pointer",
      }}
    >
      <Group position="apart">
        <Group
          onClick={() => console.log("Clicking the recipe")}
          sx={{ flex: 1 }}
        >
          <Avatar radius="xl">
            {item.type === "collection" ? <Folder /> : <File />}
          </Avatar>
          {item.name}
        </Group>
        <Group direction="column">
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
      </Group>
    </Box>
  );
};
