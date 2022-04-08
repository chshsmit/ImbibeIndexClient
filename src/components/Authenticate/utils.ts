//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import axios, { AxiosPromise } from "axios";
import { LoginResponse, RegisterResponse } from "types/api";
import { apiUrl } from "utils";

//------------------------------------------------------------------------------------------

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams): AxiosPromise<RegisterResponse> => {
  return axios({
    method: "POST",
    data: {
      firstName,
      lastName,
      email,
      password,
    },
    withCredentials: true,
    url: apiUrl("/auth/register"),
  });
};

//------------------------------------------------------------------------------------------

interface LoginParams {
  email: string;
  password: string;
}

export const login = ({
  email,
  password,
}: LoginParams): AxiosPromise<LoginResponse> => {
  return axios({
    method: "POST",
    data: {
      username: email,
      password: password,
    },
    withCredentials: true,
    url: apiUrl("/auth/login"),
  });
};
