//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Navbar, ScrollArea } from "@mantine/core";
import { CollectionIcon } from "components/Icons";
import React, { useContext, useState } from "react";
import { Home, LayoutList, Search, Star } from "tabler-icons-react";
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
  const { user } = useContext(UserContext);

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
      path: `/myrecipes/collection/home-collection-${user?.id}`,
      protectedRoute: true,
    },
    {
      icon: <LayoutList size={16} />,
      text: "My Ingredients",
      path: "/myingredients",
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
