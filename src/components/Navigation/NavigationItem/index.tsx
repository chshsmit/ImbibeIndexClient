//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <div>
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
        onClick={() => navigate(path)}
      >
        <Group>
          <ThemeIcon>{icon}</ThemeIcon>
          <Text>{text}</Text>
        </Group>
      </UnstyledButton>
    </div>
  );
};

export default NavigationItem;
