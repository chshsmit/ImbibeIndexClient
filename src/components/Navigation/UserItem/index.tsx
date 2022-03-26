//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Avatar,
  Box,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import Authenticate from "components/Authenticate";
import React, { useContext, useState } from "react";
import { ChevronLeft, ChevronRight, Login } from "tabler-icons-react";
import { UserContext } from "utils/context/UserContext";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const UserItem = (): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const theme = useMantineTheme();
  const { user } = useContext(UserContext);
  const [registerOpened, setRegisterOpened] = useState(false);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <>
      <Box
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <UnstyledButton
          sx={{
            display: "block",
            width: "100%",
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
          }}
          onClick={() => setRegisterOpened(true)}
        >
          <Group>
            {user ? (
              <>
                <Avatar
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  radius="xl"
                />
                <Box sx={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {user.username}
                  </Text>
                  <Text color="dimmed" size="xs">
                    {user.email}
                  </Text>
                </Box>

                {theme.dir === "ltr" ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </>
            ) : (
              <>
                <Login size={18} />
                <Box sx={{ flex: 1 }}>
                  <Text>Login</Text>
                </Box>
              </>
            )}
          </Group>
        </UnstyledButton>
      </Box>
      <Authenticate opened={registerOpened} setOpened={setRegisterOpened} />
    </>
  );
};

export default UserItem;
