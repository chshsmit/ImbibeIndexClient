import React from "react";

interface User {
  username: string;
  email: string;
}

interface IUserContext {
  user: User | undefined;
}

const UserContext = React.createContext<IUserContext>({ user: undefined });

export { UserContext };
