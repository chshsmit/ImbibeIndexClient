import { AppShell, MantineProvider } from "@mantine/core";
import AppHeader from "components/AppHeader";
import Navigation from "components/Navigation";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { UserContext } from "utils/context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user: {
          email: "chshsmit@gmail.com",
          firstName: "Christopher",
          lastName: "Smith",
        },
      }}
    >
      <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
        <AppShell
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
