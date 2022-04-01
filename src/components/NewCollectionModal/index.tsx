//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Plus } from "tabler-icons-react";
import { Collection } from "types";
import { makeRandomId } from "utils";
import { RecipeContext } from "utils/context/RecipeContext";
import { UserContext } from "utils/context/UserContext";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface NewCollectionModalProps {
  info: {
    type: "recipe" | "collection";
    opened: boolean;
  };
  setOpened: (opened: boolean) => void;
  parent: Collection;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const NewCollectionModal = ({
  info,
  setOpened,
  parent,
}: NewCollectionModalProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const theme = useMantineTheme();
  const { recipes, setRecipes } = useContext(RecipeContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const handleSubmit = () => {
    setLoading(true);

    const newCollectionId = makeRandomId();

    axios({
      method: "POST",
      data: {
        type: info.type,
        name: form.values.name,
        parentId: parent.id,
        id: newCollectionId,
      },
      withCredentials: true,
      url: `http://localhost:5000/recipes/collections/user/${user!.id}`,
    })
      .then(() => {
        const newCollection: Collection = {
          type: info.type,
          name: form.values.name,
          parent: parent.id,
          subCollections: [],
          id: newCollectionId,
        };

        const copyOfRecipes = new Map(recipes);
        copyOfRecipes.set(newCollectionId, newCollection);
        copyOfRecipes.set(parent.id, {
          ...parent,
          subCollections: [...parent.subCollections, newCollectionId],
        });

        setLoading(false);
        setRecipes(copyOfRecipes);
        setOpened(false);
        window.alert("New collection or recipe created");
      })
      .catch((err) => {
        setLoading(false);
        window.alert("Something went wrong");
        console.log("Something went wrong");
        console.log(err);
      });
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  const baseTypeText = info.type === "collection" ? "Collection" : "Recipe";

  return (
    <Modal
      opened={info.opened}
      onClose={() => setOpened(false)}
      title={`${baseTypeText} Name`}
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
          <Group grow>
            <TextInput
              data-autofocus
              required
              placeholder={`${baseTypeText}`}
              label={`${baseTypeText} Name`}
              {...form.getInputProps("name")}
            />
          </Group>
          <Group position="right" mt="xl">
            <Button
              variant="gradient"
              type="submit"
              leftIcon={<Plus size={16} />}
            >
              Create
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};

export default NewCollectionModal;
