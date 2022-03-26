//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Burger, Header, MediaQuery, Text, useMantineTheme } from "@mantine/core";
import React from "react";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface AppHeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const AppHeader = ({ opened, setOpened }: AppHeaderProps): React.ReactElement => {
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
    <Header height={70} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none " }}>
          <Burger opened={opened} onClick={() => setOpened(o => !o)}
            mr="xl" color={theme.colors.gray[6]} />
        </MediaQuery>
        <Text>Imbibe Index</Text>
      </div>
    </Header>
  );

};


export default AppHeader;
