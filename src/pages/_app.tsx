import { AppShell, MantineProvider } from "@mantine/core";
import axios from "axios";
import AppHeader from "components/AppHeader";
import Navigation from "components/Navigation";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { Collection } from "types";
import { RecipeContext } from "utils/context/RecipeContext";
import { User, UserContext } from "utils/context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userRecipes, setUserRecipes] = useState<Map<string, Collection>>(
    new Map([
      [
        "recipes-collection",
        {
          type: "collection",
          name: "Recipes",
          id: "recipes-collection",
          subCollections: [],
          parent: null,
        },
      ],
    ])
  );

  // Only to check if we have a user logged in
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/user`,
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // TODO: Use the user id for the recipes
  useEffect(() => {
    if (user !== undefined) {
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/recipes/collections/user/${user.id}`,
      }).then((res) => {
        setUserRecipes(new Map(Object.entries(res.data.recipes)));
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RecipeContext.Provider
        value={{ recipes: userRecipes, setRecipes: setUserRecipes }}
      >
        <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
          <AppShell
            styles={{
              main: {
                minHeight: 0,
              },
            }}
            navbarOffsetBreakpoint="sm"
            fixed
            navbar={<Navigation opened={navigationOpen} />}
            header={(
              <AppHeader
                opened={navigationOpen}
                setOpened={setNavigationOpen}
              />
            )}
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </RecipeContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
