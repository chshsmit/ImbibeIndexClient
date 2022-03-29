//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Avatar,
  Box,
  Divider,
  Group,
  Menu,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { File, Folder, Settings, Trash } from "tabler-icons-react";
import { Collection } from "types";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface CollectionListItemProps {
  item: Collection;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const CollectionListItem = ({
  item,
}: CollectionListItemProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------
  const theme = useMantineTheme();
  const router = useRouter();

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

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
          onClick={() => router.push(`/myrecipes/collection/${item.id}`)}
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

export default CollectionListItem;
