import { AppShell } from "@mantine/core";
import AppHeader from "components/AppHeader";
import Navigation from "components/Navigation";
import Routes from "components/Navigation/Routes";
import React, { useState } from "react";
import { UserContext } from "utils/context/UserContext";

function App() {
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
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={<Navigation opened={navigationOpen} />}
        header={
          <AppHeader opened={navigationOpen} setOpened={setNavigationOpen} />
        }
      >
        <Routes />
      </AppShell>
    </UserContext.Provider>
  );
}

export default App;
