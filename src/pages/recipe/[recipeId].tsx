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
import { useViewportSize } from "@mantine/hooks";
import { RecipeResponse } from "api/recipes/types";
import axios, { AxiosResponse } from "axios";
import RecipePageNotes from "components/RecipePage/RecipePageNotes";
import { Recipe } from "model/Recipe";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface RecipePageState {
  recipe: Recipe | undefined;
  recipeLoading: boolean;
  activeTab: number;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const RecipePage = (): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const router = useRouter();
  const { recipeId } = router.query;
  const { width } = useViewportSize();
  const [state, setState] = useState<RecipePageState>({
    recipe: undefined,
    recipeLoading: false,
    activeTab: 0,
  });

  const [editingNotes, setEditingNotes] = useState(false);

  useEffect(() => {
    if (recipeId !== undefined) {
      setState((curr) => {
        return {
          ...curr,
          recipeLoading: true,
        };
      });
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/recipes/${recipeId}`,
      })
        .then((res: AxiosResponse<RecipeResponse>) => {
          setState((curr) => {
            return {
              ...curr,
              recipeLoading: false,
              recipe: res.data.recipe,
              activeTab: res.data.recipe.takes.length - 1,
            };
          });
        })
        .catch((err) => {
          console.log(err);
          setState((curr) => {
            return {
              ...curr,
              recipeLoading: false,
            };
          });
        });
    }
  }, [recipeId]);

  if (recipeId === undefined || Array.isArray(recipeId))
    return <div>Error</div>;

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  if (state.recipe === undefined && state.recipeLoading) {
    return <LoadingOverlay visible>Loading recipe</LoadingOverlay>;
  }

  if (state.recipe === undefined) {
    return <div>Error finding recipe</div>;
  }

  const takeNotes = state.recipe.takes.find((take) => {
    return take.takeNumber === state.activeTab + 1;
  })!.takeNotes;

  return (
    <Grid columns={24} gutter="xl">
      <Grid.Col span={24}>
        <Title order={2}>{state.recipe.name}</Title>
      </Grid.Col>
      <Grid.Col span={24}>
        <Divider />
      </Grid.Col>
      <Grid.Col sm={24} md={12} lg={10}>
        <Grid columns={24}>
          <Grid.Col span={24}>
            <AspectRatio ratio={5184 / 3456}>
              <Image src="/cocktail.jpg" alt="cocktail" layout="fill" />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={24}>
            <Divider />
          </Grid.Col>
          <RecipePageNotes
            recipeUserId={state.recipe.collection.user.id}
            editingNotes={editingNotes}
            notes={takeNotes}
            setEditingNotes={setEditingNotes}
          />
        </Grid>
      </Grid.Col>

      {width < 992 && (
        <Grid.Col span={24}>
          <Divider />
        </Grid.Col>
      )}

      <Grid.Col
        sm={24}
        md={12}
        lg={14}
        style={{
          borderLeft: width >= 992 ? "1px solid #5c5f66" : "",
          height: "100%",
        }}
      >
        <Tabs
          position="center"
          onTabChange={(tab) => {
            setState((curr) => {
              return {
                ...curr,
                activeTab: tab,
              };
            });
          }}
          active={state.activeTab}
        >
          {[...state.recipe.takes]
            .sort((a, b) => a.takeNumber - b.takeNumber)
            .map((take) => (
              <Tabs.Tab
                key={take.takeNumber}
                label={`Take ${take.takeNumber}`}
                disabled={editingNotes}
              >
                Take {take.takeNumber}
              </Tabs.Tab>
            ))}
        </Tabs>
      </Grid.Col>
    </Grid>
  );
};

export default RecipePage;
