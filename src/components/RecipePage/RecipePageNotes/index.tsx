//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Grid,
  Text,
  Textarea,
  Title,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import axios, { AxiosRequestConfig } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Checks, Edit } from "tabler-icons-react";
import { UpdateTakeRequest } from "types/api";
import { apiUrl } from "utils";
import { UserContext } from "utils/context/UserContext";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface RecipePageNotesProps {
  recipeUserId: number;
  editingNotes: boolean;
  setEditingNotes: React.Dispatch<React.SetStateAction<boolean>>;
  notes: string;
  takeId: number;
  refetch: () => void;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const RecipePageNotes = ({
  recipeUserId,
  editingNotes,
  notes,
  setEditingNotes,
  takeId,
  refetch,
}: RecipePageNotesProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const theme = useMantineTheme();
  const { user } = useContext(UserContext);
  const [notesValue, setNotesValue] = useState(notes);

  useEffect(() => {
    setNotesValue(notes);
  }, [notes]);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const saveNotes = () => {
    if (notesValue === notes) {
      setEditingNotes(false);
      return;
    }

    const saveNotesConfig: AxiosRequestConfig<UpdateTakeRequest> = {
      method: "PUT",
      data: {
        takeNotes: notesValue,
      },
      withCredentials: true,
      url: apiUrl(`/recipes/take/${takeId}`),
    };

    axios(saveNotesConfig)
      .then(() => {
        refetch();
        setEditingNotes(false);
      })
      .catch((err) => {
        console.error("Something went wrong", err);
        setEditingNotes(false);
      });
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <>
      <Grid.Col span={24}>
        <Title order={3}>
          Notes
          {user?.id === recipeUserId && (
            <Tooltip
              label={
                editingNotes
                  ? "Save your changes"
                  : "Edit your notes for this take"
              }
              position="right"
            >
              <UnstyledButton
                sx={{
                  marginLeft: 10,
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.lg,
                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                }}
                onClick={() => {
                  editingNotes ? saveNotes() : setEditingNotes(!editingNotes);
                }}
              >
                {editingNotes ? <Checks size={20} /> : <Edit size={20} />}
              </UnstyledButton>
            </Tooltip>
          )}
        </Title>
      </Grid.Col>
      <Grid.Col span={24}>
        {editingNotes ? (
          <Textarea
            value={notesValue ?? ""}
            autosize
            minRows={5}
            maxRows={10}
            onChange={(event) => setNotesValue(event.target.value)}
          />
        ) : (
          <Text size="lg">{notes}</Text>
        )}
      </Grid.Col>
    </>
  );
};

export default RecipePageNotes;
