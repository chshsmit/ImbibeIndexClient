//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "utils/context/UserContext";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface NavigationItemProps {
  icon: React.ReactNode;
  text: string;
  path: string;
  protectedRoute: boolean;
  setRegisterOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const NavigationItem = ({
  icon,
  text,
  path,
  protectedRoute,
  setRegisterOpened,
}: NavigationItemProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const { user } = useContext(UserContext);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  const ParentComponent: React.FC<{ path: string }> =
    user === undefined && protectedRoute
      ? (props) => (
        <div onClick={() => setRegisterOpened((opened) => !opened)}>
          {props.children}
        </div>
        )
      : (props) => <Link href={props.path}>{props.children}</Link>;

  return (
    <ParentComponent path={path}>
      <UnstyledButton
        sx={(theme) => ({
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
        })}
      >
        <Group>
          <ThemeIcon>{icon}</ThemeIcon>
          <Text>{text}</Text>
        </Group>
      </UnstyledButton>
    </ParentComponent>
  );
};

export default NavigationItem;
