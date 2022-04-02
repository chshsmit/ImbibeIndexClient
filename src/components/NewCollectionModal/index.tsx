//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  Select,
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

  type CreateFormType = {
    name: string;
    recipeType: "cocktail" | "syrup" | "liqeur" | "other";
    isPrivate: boolean;
  };

  const form = useForm<CreateFormType>({
    initialValues: {
      name: "",
      recipeType: "cocktail",
      isPrivate: false,
    },
  });

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const handleSubmit = () => {
    setLoading(true);
    // setLoading(false);

    const newId = makeRandomId();

    console.log(form.values);

    if (info.type === "collection") {
      axios({
        method: "POST",
        data: {
          type: info.type,
          name: form.values.name,
          parentId: parent.id,
          id: newId,
          isPrivate: form.values.isPrivate,
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

          form.reset();
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
      axios({
        method: "POST",
        data: {
          type: form.values.recipeType,
          name: form.values.name,
          id: newId,
          parentId: parent.id,
          isPrivate: form.values.isPrivate,
        },
        withCredentials: true,
        url: `http://localhost:5000/recipes/user/${user!.id}`,
      }).then(() => {
        const newRecipe: RecipeEntryItem = {
          name: form.values.name,
          isPrivate: form.values.isPrivate,
          recipeId: newId,
          collectionId: parent.id,
          type: form.values.recipeType,
        };

        const copyOfRecipes = new Map(recipes);
        copyOfRecipes.set(newId, newRecipe);

        const copyOfCollections = new Map(collections);
        copyOfCollections.set(parent.id, {
          ...parent,
          recipes: [...parent.recipes, newId],
        });

        form.reset();

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
      onClose={() => {
        form.reset();
        setOpened(false);
      }}
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
          <Group grow direction="column">
            <TextInput
              data-autofocus
              required
              placeholder={`${baseTypeText}`}
              label={`${baseTypeText} Name`}
              {...form.getInputProps("name")}
            />

            {info.type === "recipe" && (
              <Select
                label="What type of recipe is this?"
                placeholder="Pick One"
                required
                data={[
                  { value: "cocktail", label: "Cocktail" },
                  { value: "syrup", label: "Syrup" },
                  { value: "liqueur", label: "Liqueur" },
                  { value: "other", label: "Other" },
                ]}
                {...form.getInputProps("recipeType")}
              />
            )}
            <Checkbox
              label="This is private"
              size="md"
              {...form.getInputProps("isPrivate", { type: "checkbox" })}
            />
          </Group>
          <Group position="right">
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
