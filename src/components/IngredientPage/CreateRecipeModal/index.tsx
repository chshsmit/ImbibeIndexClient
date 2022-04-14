//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import CollectionTree from "components/CollectionTree";
import { Ingredient } from "model/Ingredient";
import React, { useContext, useState } from "react";
import { CollectionEntryItem, RecipeEntryItem } from "types";
import { makeRandomId } from "utils";
import { RecipeContext } from "utils/context/RecipeContext";
import { UserContext } from "utils/context/UserContext";
import { getCreateRecipeConfig } from "./util";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface CreateRecipeModalProps {
  opened: boolean;
  close: () => void;
  ingredient: Ingredient | null;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const CreateRecipeModal = ({
  opened,
  close,
  ingredient,
}: CreateRecipeModalProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const { collections, setCollections, recipes, setRecipes } =
    useContext(RecipeContext);
  const { user } = useContext(UserContext);
  const theme = useMantineTheme();
  const [selectedCollection, setSelectedCollection] = useState<
    CollectionEntryItem | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  console.log(collections);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const createNewRecipeForIngredient = () => {
    setLoading(true);
    const newId = makeRandomId();
    const parentId = selectedCollection!.id;
    const name = ingredient!.ingredientName;

    axios(getCreateRecipeConfig(newId, parentId, name, user!.id)).then(() => {
      updateRecipes(newId, parentId);
      setLoading(false);
      close();
      window.alert("New recipe created");
    });
  };

  const updateRecipes = (
    newRecipeId: string,
    parentCollectionId: string
  ): void => {
    const newRecipe: RecipeEntryItem = {
      name: ingredient!.ingredientName,
      isPrivate: true,
      recipeId: newRecipeId,
      collectionId: parentCollectionId,
      type: "other",
    };

    const parentCollection = collections.get(parentCollectionId)!;

    const copyOfRecipes = new Map(recipes);
    copyOfRecipes.set(newRecipeId, newRecipe);

    const copyOfCollections = new Map(collections);
    copyOfCollections.set(parentCollectionId, {
      ...parentCollection,
      recipes: [...parentCollection.recipes, newRecipeId],
    });

    setCollections(copyOfCollections);
    setRecipes(copyOfRecipes);
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<b>Create Recipe for {ingredient?.ingredientName}</b>}
      >
        <Paper
          p={0}
          style={{
            position: "relative",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          }}
        >
          <LoadingOverlay visible={loading} />
          <Text mb="xl">
            Select the collection you would like your recipe to go in.
          </Text>

          <CollectionTree
            root={collections.get(`home-collection-${user?.id}`)!}
            isTopLevel
            onCollectionItemClick={setSelectedCollection}
          />
        </Paper>

        <Group position="apart" mt="xl">
          <Text>
            {selectedCollection ? (
              <>Create in {selectedCollection.name}</>
            ) : (
              <>Select a collection</>
            )}
          </Text>
          <Button
            disabled={selectedCollection === undefined}
            onClick={createNewRecipeForIngredient}
          >
            Create Recipe
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default CreateRecipeModal;
