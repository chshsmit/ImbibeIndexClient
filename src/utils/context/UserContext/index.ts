import React from "react";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface IUserContext {
  user: User | undefined;
  setUser: (user: User) => void;
}

const no_op = (user: User) => {
  console.log(user);
};

const UserContext = React.createContext<IUserContext>({
  user: undefined,
  setUser: no_op,
});

export { UserContext };
