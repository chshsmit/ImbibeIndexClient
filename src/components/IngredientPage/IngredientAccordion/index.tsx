//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Accordion,
  AccordionState,
  Button,
  SimpleGrid,
  useAccordionState,
} from "@mantine/core";
import { Ingredient } from "model/Ingredient";
import Link from "next/link";
import { IngredientAccordionFilters } from "pages/myingredients";
import React, { useEffect, useState } from "react";
import { usePreviousProps } from "utils/hooks/usePreviousProps";
import CreateRecipeModal from "../CreateRecipeModal";
import { useStyles } from "./util";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface ModalState {
  opened: boolean;
  ingredient: Ingredient | null;
}

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
  const [createRecipeState, setCreateRecipeState] = useState<ModalState>({
    opened: false,
    ingredient: null,
  });

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

  const openModal = (ingredient: Ingredient) => {
    setCreateRecipeState({
      opened: true,
      ingredient,
    });
  };

  const filteredIngredients = ingredients.filter((ingredient) => {
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

    return (
      (searchValue === "" ||
        ingredient.ingredientName
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) > -1) &&
      radioFilterMet
    );
  });

  const rows = filteredIngredients.map((ingredient) => {
    return (
      <Accordion.Item label={ingredient.ingredientName} key={ingredient.id}>
        <SimpleGrid>
          {ingredient.ingredientRecipeId ? (
            <Link href={`/recipe/${ingredient.ingredientRecipeId}`}>
              <Button>View Recipe</Button>
            </Link>
          ) : (
            <Button onClick={() => openModal(ingredient)}>Create Recipe</Button>
          )}
        </SimpleGrid>
      </Accordion.Item>
    );
  });

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <>
      <Accordion
        state={state}
        onChange={handlers.setState}
        classNames={classes}
        iconPosition="right"
      >
        {rows}
      </Accordion>
      <CreateRecipeModal
        opened={createRecipeState.opened}
        ingredient={createRecipeState.ingredient}
        close={() => {
          setCreateRecipeState({
            opened: false,
            ingredient: null,
          });
        }}
      />
    </>
  );
};

export default IngredientAccordion;
