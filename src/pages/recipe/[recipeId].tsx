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
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
  const { width } = useViewportSize();
  const { recipeId } = router.query;

  const [recipe, setRecipe] = useState<RecipeResponse | undefined>(undefined);
  const [recipeLoading, setRecipeLoading] = useState(false);

  useEffect(() => {
    if (recipeId !== undefined) {
      setRecipeLoading(true);
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/recipes/${recipeId}`,
      })
        .then((res: AxiosResponse<RecipeResponse>) => {
          setRecipe(res.data);
          setRecipeLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecipeLoading(false);
        });
    }
  }, [recipeId]);

  if (recipeId === undefined || Array.isArray(recipeId))
    return <div>Error</div>;

  console.log(recipe);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  if (recipe === undefined && recipeLoading) {
    return <LoadingOverlay visible>Loading recipe</LoadingOverlay>;
  }

  if (recipe === undefined) {
    return <div>Error finding recipe</div>;
  }

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
              <Image src="/cocktail.jpg" alt="cocktail" layout="fill" />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={24}>
            <Divider />
          </Grid.Col>
          <Grid.Col span={24}>
            <Title order={3}>Notes</Title>
          </Grid.Col>
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
        <Tabs position="center">
          <Tabs.Tab label="Take 1">Take 1</Tabs.Tab>
          <Tabs.Tab label="Take 2">Take 2</Tabs.Tab>
          <Tabs.Tab label="Take 3">Take 3</Tabs.Tab>
          <Tabs.Tab label="Take 4">Take 4</Tabs.Tab>
          <Tabs.Tab label="Take 5">Take 5</Tabs.Tab>
        </Tabs>
      </Grid.Col>
    </Grid>
  );
};

export default RecipePage;
