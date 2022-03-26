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
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { RegisterResponse } from "api/authentication/types";
import { ErrorResponse } from "api/types/apiTypes";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { User } from "tabler-icons-react";

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

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },

    validationRules: {
      firstName: (value) => formType === "login" || value.trim().length >= 2,
      lastName: (value) => formType === "login" || value.trim().length >= 2,
      email: (value) => /^\S+@\S+$/.test(value),
    },

    errorMessages: {
      email: "Invalid email",
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

    if (formType === "register") {
      axios
        .post<RegisterResponse>(
          "http://localhost:5000/auth/register",
          form.values
        )
        .then(() => {
          setError(null);
          setLoading(false);
          setOpened(false);
        })
        .catch((response: AxiosResponse<ErrorResponse>) => {
          setLoading(false);
          setError(response.data.errorCode);
        });
    }
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
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
            {error && (
              <Text color="red" size="sm" mt="sm">
                {error}
              </Text>
            )}

            <Button color="blue" type="submit">
              {formType === "register" ? "Register" : "Login"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};

export default Authenticate;
