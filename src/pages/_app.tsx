import { AppShell, MantineProvider } from "@mantine/core";
import axios from "axios";
import AppHeader from "components/AppHeader";
import Navigation from "components/Navigation";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { User, UserContext } from "utils/context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
          header={
            <AppHeader opened={navigationOpen} setOpened={setNavigationOpen} />
          }
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
