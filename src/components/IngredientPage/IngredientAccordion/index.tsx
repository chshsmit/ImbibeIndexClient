//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Accordion, AccordionState, useAccordionState } from "@mantine/core";
import { Ingredient } from "model/Ingredient";
import { IngredientAccordionFilters } from "pages/myingredients";
import React, { useEffect } from "react";
import { usePreviousProps } from "utils/hooks/usePreviousProps";
import { useStyles } from "./util";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface IngredientAccordionProps {
  ingredients: Ingredient[];
  searchValue: string;
  filters: IngredientAccordionFilters;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const IngredientAccordion = ({
  ingredients,
  searchValue,
  filters,
}: IngredientAccordionProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const { classes } = useStyles();
  const [state, handlers] = useAccordionState({ total: ingredients.length });
  const previousFilters = usePreviousProps(filters);

  useEffect(() => {
    if (previousFilters !== filters) {
      const closedState = Array.from({ length: ingredients.length }).reduce(
        (acc: AccordionState, _, index) => {
          acc[index] = false;
          return acc;
        },
        {}
      ) as AccordionState;
      handlers.setState(closedState);
    }
  });

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const filteredIngredients = ingredients.filter((ingredient) => {
    console.log(filters);

    let radioFilterMet = true;

    if (filters.radioFilter === "hasRecipe") {
      radioFilterMet =
        ingredient.ingredientRecipeId !== undefined &&
        ingredient.ingredientRecipeId !== null;
    } else if (filters.radioFilter === "noRecipe") {
      radioFilterMet =
        ingredient.ingredientRecipeId === null ||
        ingredient.ingredientRecipeId === undefined;
    }

    console.log({ ingredient, radioFilterMet });

    return (
      (searchValue === "" ||
        ingredient.ingredientName
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) > -1) &&
      radioFilterMet
    );
  });

  const rows = filteredIngredients.map((ingredient) => (
    <Accordion.Item key={ingredient.id} label={ingredient.ingredientName}>
      Here is the ingredient dropdown
    </Accordion.Item>
  ));

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <Accordion
      state={state}
      onChange={handlers.setState}
      classNames={classes}
      iconPosition="right"
    >
      {rows}
    </Accordion>
  );
};

export default IngredientAccordion;
