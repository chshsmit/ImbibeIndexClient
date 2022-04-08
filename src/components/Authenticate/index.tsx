//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Anchor,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import { Lock, User } from "tabler-icons-react";
import { ErrorResponse } from "types/api";
import { UserContext } from "utils/context/UserContext";
import { login, register } from "./utils";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface AuthenticateProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const Authenticate = ({
  opened,
  setOpened,
}: AuthenticateProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState<"register" | "login">("login");
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useContext(UserContext);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationRules: {
      firstName: (value) => formType === "login" || value.trim().length >= 2,
      lastName: (value) => formType === "login" || value.trim().length >= 2,
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => value.length >= 8,
      confirmPassword: (val, values) =>
        formType === "login" || val === values?.password,
    },

    errorMessages: {
      email: "Invalid email",
      password: "Password must be at least 8 characters",
      confirmPassword: "Passwords don't match.",
    },
  });

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const toggleFormType = () => {
    setFormType((current) => (current === "register" ? "login" : "register"));
  };

  const handleSubmit = () => {
    setLoading(true);
    setError(null);

    const { firstName, lastName, email, password } = form.values;

    if (formType === "register") {
      register({ firstName, lastName, email, password })
        .then(() => {
          setLoading(false);
          window.alert("Account created successfully. Login Now");
          setFormType("login");
        })
        .catch((response: AxiosError<ErrorResponse>) => {
          setLoading(false);
          setError(
            response.response?.data.message ?? "Something unexpected happened"
          );
        });
    }

    if (formType === "login") {
      login({ email, password })
        .then((res) => {
          setLoading(false);
          setUser({
            ...res.data,
          });
          setOpened(false);
        })
        .catch((err: AxiosError<ErrorResponse>) => {
          setLoading(false);
          setError(
            err.response?.data.message ?? "Something unexpected happened"
          );
        });
    }
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        setError(null);
        setFormType("login");
        form.reset();
      }}
      title={formType === "register" ? "Register" : "Log In"}
    >
      <Paper
        p={0}
        style={{
          position: "relative",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading} />
          {formType === "register" && (
            <Group grow>
              <TextInput
                data-autofocus
                required
                placeholder="Your first name"
                label="First name"
                {...form.getInputProps("firstName")}
              />

              <TextInput
                required
                placeholder="Your last name"
                label="Last name"
                {...form.getInputProps("lastName")}
              />
            </Group>
          )}

          <TextInput
            mt="md"
            required
            placeholder="Your email"
            autoComplete="off"
            label="Email"
            icon={<User />}
            {...form.getInputProps("email")}
          />

          <PasswordInput
            mt="md"
            required
            placeholder="Password"
            label="Password"
            icon={<Lock />}
            {...form.getInputProps("password")}
          />

          {formType === "register" && (
            <PasswordInput
              mt="md"
              required
              label="Confirm Password"
              placeholder="Confirm password"
              icon={<Lock />}
              {...form.getInputProps("confirmPassword")}
            />
          )}

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="gray"
              onClick={toggleFormType}
              size="sm"
            >
              {formType === "register"
                ? "Have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button color="blue" type="submit">
              {formType === "register" ? "Register" : "Login"}
            </Button>
          </Group>
          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}
        </form>
      </Paper>
    </Modal>
  );
};

export default Authenticate;
