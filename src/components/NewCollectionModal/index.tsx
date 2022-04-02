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
import { CollectionEntryItem, RecipeEntryItem } from "types";
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
  parent: CollectionEntryItem;
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
  const { recipes, setRecipes, collections, setCollections } =
    useContext(RecipeContext);
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
    setLoading(false);

    const newId = makeRandomId();

    if (info.type === "collection") {
      axios({
        method: "POST",
        data: {
          type: info.type,
          name: form.values.name,
          parentId: parent.id,
          id: newId,
        },
        withCredentials: true,
        url: `http://localhost:5000/collections/user/${user!.id}`,
      })
        .then(() => {
          const newCollection: CollectionEntryItem = {
            name: form.values.name,
            parent: parent.id,
            subCollections: [],
            id: newId,
            recipes: [],
          };

          const copyOfCollections = new Map(collections);
          copyOfCollections.set(newId, newCollection);
          copyOfCollections.set(parent.id, {
            ...parent,
            subCollections: [...parent.subCollections, newId],
          });

          setLoading(false);
          setCollections(copyOfCollections);
          setOpened(false);
          window.alert("New collection created");
        })
        .catch((err) => {
          setLoading(false);
          window.alert("Something went wrong");
          console.log("Something went wrong");
          console.log(err);
        });
    }

    if (info.type === "recipe") {
      // TODO: ADD recipe type
      axios({
        method: "POST",
        data: {
          type: "cocktail",
          name: form.values.name,
          id: newId,
          parentId: parent.id,
          isPrivate: false,
        },
        withCredentials: true,
        url: `http://localhost:5000/recipes/user/${user!.id}`,
      }).then((res) => {
        console.log({ res });
        const newRecipe: RecipeEntryItem = {
          name: form.values.name,
          isPrivate: false,
          recipeId: newId,
          collectionId: parent.id,
        };

        const copyOfRecipes = new Map(recipes);
        copyOfRecipes.set(newId, newRecipe);

        const copyOfCollections = new Map(collections);
        copyOfCollections.set(parent.id, {
          ...parent,
          recipes: [...parent.recipes, newId],
        });

        setRecipes(copyOfRecipes);
        setCollections(copyOfCollections);

        setLoading(false);
        setOpened(false);
        window.alert("New recipe created");
      });
    }
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
