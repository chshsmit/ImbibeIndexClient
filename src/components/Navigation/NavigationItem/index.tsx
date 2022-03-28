//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import React from "react";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface NavigationItemProps {
  icon: React.ReactNode;
  text: string;
  path: string;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const NavigationItem = ({
  icon,
  text,
  path,
}: NavigationItemProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <Link href={path}>
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
    </Link>
  );
};

export default NavigationItem;
