//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Navbar, ScrollArea } from "@mantine/core";
import { CollectionIcon } from "components/Icons";
import React from "react";
import { Home } from "tabler-icons-react";
import NavigationItem from "./NavigationItem";
import UserItem from "./UserItem";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface NavigationProps {
  opened: boolean;
}

interface ExampleItem {
  icon: React.ReactNode;
  text: string;
  path: string;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const Navigation = ({ opened }: NavigationProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const links: Array<ExampleItem> = [
    { icon: <Home size={16} />, text: "Home", path: "/" },
    {
      icon: <CollectionIcon />,
      text: "My Recipes",
      path: "/myrecipes/collection/home-collection",
    },
  ];

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 300 }}>
      <Navbar.Section grow component={ScrollArea}>
        {links.map((link, index) => (
          <NavigationItem
            key={index}
            icon={link.icon}
            text={link.text}
            path={link.path}
          />
        ))}
      </Navbar.Section>
      <Navbar.Section>
        <UserItem />
      </Navbar.Section>
    </Navbar>
  );
};

export default Navigation;
