//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { AspectRatio, Divider, Grid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

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

  if (recipeId === undefined || Array.isArray(recipeId))
    return <div>Error</div>;

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <Grid columns={24} gutter="xl">
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
          <Grid.Col span={24}>Hello</Grid.Col>
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
        }}
      >
        Hello Again
      </Grid.Col>
    </Grid>
  );
};

export default RecipePage;
