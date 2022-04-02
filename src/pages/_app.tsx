import { AppShell, MantineProvider } from "@mantine/core";
import { CollectionsForUserResponse } from "api/collections/types";
import axios, { AxiosResponse } from "axios";
import AppHeader from "components/AppHeader";
import Navigation from "components/Navigation";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { CollectionEntryItem, RecipeEntryItem } from "types";
import { RecipeContext } from "utils/context/RecipeContext";
import { User, UserContext } from "utils/context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const [userCollections, setUserCollections] = useState<
    Map<string, CollectionEntryItem>
  >(
    new Map([
      [
        "home-collection",
        {
          name: "My Recipes",
          id: "home-collection",
          parent: null,
          subCollections: [],
          recipes: [],
        },
      ],
    ])
  );

  const [userRecipes, setUserRecipes] = useState<Map<string, RecipeEntryItem>>(
    new Map()
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
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/collections/user/${user.id}`,
      }).then((res: AxiosResponse<CollectionsForUserResponse>) => {
        setUserRecipes(new Map(Object.entries(res.data.recipes)));
        setUserCollections(new Map(Object.entries(res.data.collections)));
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RecipeContext.Provider
        value={{
          recipes: userRecipes,
          setRecipes: setUserRecipes,
          collections: userCollections,
          setCollections: setUserCollections,
        }}
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
