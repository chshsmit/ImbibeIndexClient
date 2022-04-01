//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Navbar, ScrollArea } from "@mantine/core";
import { CollectionIcon } from "components/Icons";
import React, { useState } from "react";
import { Home, LayoutList, Search, Star } from "tabler-icons-react";
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
  protectedRoute: boolean;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const Navigation = ({ opened }: NavigationProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const [registerOpened, setRegisterOpened] = useState(false);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const links: Array<NavigationLink> = [
    {
      icon: <Home size={16} />,
      text: "Home",
      path: "/",
      protectedRoute: false,
    },
    {
      icon: <CollectionIcon />,
      text: "My Recipes",
      path: "/myrecipes/collection/recipes-collection",
      protectedRoute: true,
    },
    {
      icon: <LayoutList size={16} />,
      text: "My Ingredients",
      path: "/",
      protectedRoute: true,
    },
    {
      icon: <Star size={16} />,
      text: "Favorites",
      path: "/",
      protectedRoute: true,
    },
    {
      icon: <Search size={16} />,
      text: "Discover",
      path: "/",
      protectedRoute: false,
    },
  ];

  // const loggedInLinks: Array<NavigationLink> = [
  //   { icon: <Home size={16} />, text: "Home", path: "/" },
  //   {
  //     icon: <CollectionIcon />,
  //     text: "My Recipes",
  //     path: "/myrecipes/collection/recipes-collection",
  //   },
  //   // { icon: <Star size={16} />, text: "Favorites", path: "/favorites"}
  // ];

  // const nonLoggedInLinks: Array<NavigationLink> = [
  //   { icon: <Home size={16} />, text: "Home", path: "/" },
  // ];

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  // const links = user === undefined ? nonLoggedInLinks : loggedInLinks;

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 275 }}>
      <Navbar.Section grow component={ScrollArea}>
        {links.map((link, index) => (
          <NavigationItem
            key={index}
            {...link}
            setRegisterOpened={setRegisterOpened}
          />
        ))}
      </Navbar.Section>
      <Navbar.Section>
        <UserItem
          registerOpened={registerOpened}
          setRegisterOpened={setRegisterOpened}
        />
      </Navbar.Section>
    </Navbar>
  );
};

export default Navigation;
