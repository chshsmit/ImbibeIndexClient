//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Avatar,
  Box,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import Authenticate from "components/Authenticate";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Login,
  Logout,
  User,
} from "tabler-icons-react";
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
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [registerOpened, setRegisterOpened] = useState(false);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const logUserOut = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/auth/logout",
      withCredentials: true,
    })
      .then((res) => {
        console.log({ res });
        setUser(undefined);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  const userButton = (
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
  );

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
        {user === undefined ? (
          userButton
        ) : (
          <Menu control={userButton} trigger="click" position="right">
            <Menu.Item icon={<User size={14} />}>Profile</Menu.Item>
            <Menu.Item
              color="red"
              icon={<Logout size={14} />}
              onClick={logUserOut}
            >
              Log Out
            </Menu.Item>
          </Menu>
        )}
      </Box>
      <Authenticate opened={registerOpened} setOpened={setRegisterOpened} />
    </>
  );
};

export default UserItem;
