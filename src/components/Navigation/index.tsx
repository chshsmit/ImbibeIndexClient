//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Navbar, ScrollArea } from "@mantine/core";
import { CollectionIcon } from "components/Icons";
import React, { useContext } from "react";
import { Home } from "tabler-icons-react";
import { UserContext } from "utils/context/UserContext";
import NavigationItem from "./NavigationItem";
import UserItem from "./UserItem";

// const ENDPOINT = "http://127.0.0.1:5000";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface NavigationProps {
  opened: boolean;
}

interface NavigationLink {
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

  const { user } = useContext(UserContext);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  // const links: Array<NavigationLink> = [
  //   { icon: <Home size={16} />, text: "Home", path: "/" },
  //   {
  //     icon: <CollectionIcon />,
  //     text: "My Recipes",
  //     path: "/myrecipes/collection/recipes-collection",
  //   },
  // ];

  const loggedInLinks: Array<NavigationLink> = [
    { icon: <Home size={16} />, text: "Home", path: "/" },
    {
      icon: <CollectionIcon />,
      text: "My Recipes",
      path: "/myrecipes/collection/recipes-collection",
    },
    // { icon: <Star size={16} />, text: "Favorites", path: "/favorites"}
  ];

  const nonLoggedInLinks: Array<NavigationLink> = [
    { icon: <Home size={16} />, text: "Home", path: "/" },
  ];

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  const links = user === undefined ? nonLoggedInLinks : loggedInLinks;

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 275 }}>
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
