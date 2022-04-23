//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  AspectRatio,
  Divider,
  Grid,
  LoadingOverlay,
  Tabs,
  Title,
} from "@mantine/core";
import RecipePageNotes from "components/RecipePage/RecipePageNotes";
import RecipeTakeSection from "components/RecipePage/RecipeTakeSection";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecipe } from "utils/hooks/useRecipe";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const RecipePage = (): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const router = useRouter();
  const { recipeId } = router.query;
  const [activeTab, setActiveTab] = useState(0);
  const [editingNotes, setEditingNotes] = useState(false);
  const { loading, recipe, error, refetch } = useRecipe(recipeId);

  useEffect(() => {
    if (recipe !== undefined) {
      setActiveTab(recipe.takes.length - 1);
    }
  }, [recipe]);

  if (recipeId === undefined || Array.isArray(recipeId))
    return <div>Error recipeid not provided or the recipe is an array</div>;

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  if (error) {
    console.error(error);
    return <div>Error check console</div>;
  }

  if (recipe === undefined && loading) {
    return <LoadingOverlay visible>Loading recipe</LoadingOverlay>;
  }

  if (recipe === undefined) {
    return <div>Error finding recipe</div>;
  }

  const take = recipe.takes.find((take) => {
    return take.takeNumber === activeTab + 1;
  })!;

  const takeNotes = take.takeNotes;

  return (
    <Grid columns={24} gutter="xl">
      <Grid.Col span={24}>
        <Title order={2}>{recipe.name}</Title>
      </Grid.Col>
      <Grid.Col span={24}>
        <Divider />
      </Grid.Col>
      <Grid.Col sm={24} md={12} lg={10}>
        <Grid columns={24}>
          <Grid.Col span={24}>
            <AspectRatio ratio={5184 / 3456}>
              <Image
                src="/cocktail.jpg"
                alt="cocktail"
                layout="fill"
                priority
              />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={24}>
            <Divider />
          </Grid.Col>
          <RecipePageNotes
            recipeUserId={recipe.collection.user.id}
            editingNotes={editingNotes}
            notes={takeNotes}
            setEditingNotes={setEditingNotes}
            takeId={take.id}
            refetch={refetch}
          />
        </Grid>
      </Grid.Col>

      <Grid.Col
        sm={24}
        md={12}
        lg={14}
        style={{
          height: "100%",
        }}
      >
        <Tabs
          position="center"
          onTabChange={(tab) => setActiveTab(tab)}
          active={activeTab}
        >
          {[...recipe.takes]
            .sort((a, b) => a.takeNumber - b.takeNumber)
            .map((take) => (
              <Tabs.Tab
                key={take.takeNumber}
                label={`Take ${take.takeNumber}`}
                disabled={editingNotes}
              >
                <RecipeTakeSection
                  take={take}
                  recipeUserId={recipe!.collection.user.id}
                  refetch={refetch}
                />
              </Tabs.Tab>
            ))}
        </Tabs>
      </Grid.Col>
    </Grid>
  );
};

export default RecipePage;
