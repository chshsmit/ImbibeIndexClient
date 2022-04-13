//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import { Divider, Grid, Radio, RadioGroup, TextInput } from "@mantine/core";
import { IngredientAccordion } from "components/IngredientPage";
import React, { useContext, useState } from "react";
import { Search } from "tabler-icons-react";
import { UserContext } from "utils/context/UserContext";
import { useIngredients } from "utils/hooks/useIngredients";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

export interface IngredientAccordionFilters {
  searchValue: string;
  radioFilter: string;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const MyIngredients = (): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const { user } = useContext(UserContext);
  // const { collections } = useContext(RecipeContext);
  const { ingredients } = useIngredients(user?.id);

  const [filters, setFilters] = useState<IngredientAccordionFilters>({
    searchValue: "",
    radioFilter: "allIngredients",
  });

  const [searchValue, setSearchValue] = useState("");

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  return (
    <Grid justify="center">
      <Grid.Col span={6}>
        <TextInput
          icon={<Search size={16} />}
          placeholder="Search for ingredients"
          onChange={(event) =>
            setFilters((curr) => {
              return {
                ...curr,
                searchValue: event.target.value,
              };
            })
          }
          value={filters.searchValue}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <RadioGroup
          size="sm"
          value={filters.radioFilter}
          onChange={(value) => {
            setFilters((curr) => {
              return {
                ...curr,
                radioFilter: value,
              };
            });
          }}
        >
          <Radio value="allIngredients" label="All Ingredients" />
          <Radio value="hasRecipe" label="Has Recipe" />
          <Radio value="noRecipe" label="No Recipe" />
        </RadioGroup>
      </Grid.Col>
      <Grid.Col>
        <Divider label="Ingredients" labelPosition="center" />
      </Grid.Col>
      <Grid.Col span={12}>
        <IngredientAccordion
          ingredients={ingredients}
          searchValue={filters.searchValue}
          filters={filters}
        />
      </Grid.Col>
    </Grid>
  );

  // return (
  //   <CollectionTree
  //     root={collections.get(`home-collection-${user!.id}`)!}
  //     isTopLevel
  //     onCollectionItemClick={(collection) => console.log(collection)}
  //   />
  // );
};

export default MyIngredients;
