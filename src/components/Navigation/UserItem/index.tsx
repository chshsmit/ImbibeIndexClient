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
          onClick={() => {
            if (user === undefined) {
              setRegisterOpened(true);
            } else {
              console.log("Here is the user: ", user);
            }
          }}
        >
          <Group>
            {user ? (
              <>
                <Avatar radius="xl">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {user.firstName} {user.lastName}
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
