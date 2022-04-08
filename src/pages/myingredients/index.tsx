//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import CollectionTree from "components/CollectionTree";
import React, { useContext } from "react";
import { RecipeContext } from "utils/context/RecipeContext";
import { UserContext } from "utils/context/UserContext";
import { useIngredients } from "utils/hooks/useIngredients";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const MyIngredients = (): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------\

  const { user } = useContext(UserContext);
  const { collections } = useContext(RecipeContext);
  const { ingredients } = useIngredients(user?.id);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  console.log(ingredients);

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <CollectionTree
      root={collections.get(`home-collection-${user!.id}`)!}
      isTopLevel
    />
  );
};

export default MyIngredients;
