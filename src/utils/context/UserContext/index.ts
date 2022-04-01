import React from "react";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface IUserContext {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

const no_op = (user: User | undefined) => {
  console.log(user);
};

const UserContext = React.createContext<IUserContext>({
  user: undefined,
  setUser: no_op,
});

export { UserContext };
