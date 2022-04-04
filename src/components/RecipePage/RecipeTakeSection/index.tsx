//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  Group,
  List,
  Select,
  TextInput,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import { RecipeTake } from "model/RecipeTake";
import React, { useContext, useState } from "react";
import { Checks, Edit } from "tabler-icons-react";
import { UNITS } from "utils/constants";
import { UserContext } from "utils/context/UserContext";

//------------------------------------------------------------------------------------------
// Interfaces/Props
//------------------------------------------------------------------------------------------

interface RecipeTakeSectionProps {
  take: RecipeTake;
  recipeUserId: number;
}

//------------------------------------------------------------------------------------------
// Component Definition
//------------------------------------------------------------------------------------------

export const RecipeTakeSection = ({
  take,
  recipeUserId,
}: RecipeTakeSectionProps): React.ReactElement => {
  //------------------------------------------------------------------------------------------
  // Calls to hooks
  //------------------------------------------------------------------------------------------

  const theme = useMantineTheme();
  const { user } = useContext(UserContext);
  const [editingIngredients, setEditingIngredients] = useState(false);

  //------------------------------------------------------------------------------------------
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const form = useForm({
    initialValues: {
      ingredients: formList(
        take.ingredients.map((ingredient) => {
          return {
            ingredientAmount: ingredient.ingredientAmount,
            ingredientUnit: ingredient.ingredientUnit,
            ingredientName: ingredient.ingredientName,
          };
        })
      ),
    },
  });

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  console.log(take);

  const fields = form.values.ingredients.map((_, index) => (
    <Group key={index}>
      <TextInput
        placeholder="Name"
        label="Name"
        required
        size="xs"
        {...form.getListInputProps("ingredients", index, "ingredientName")}
      />
      <TextInput
        placeholder="Amount"
        label="Amount"
        size="xs"
        required
        {...form.getListInputProps("ingredients", index, "ingredientAmount")}
      />

      <Select
        label="Unit"
        placeholder="Pick a unit"
        size="xs"
        data={UNITS.map((unit) => {
          return {
            value: unit,
            label: unit,
          };
        })}
        {...form.getListInputProps("ingredients", index, "ingredientUnit")}
      />
    </Group>
  ));

  return (
    <Group direction="column" sx={{ marginTop: theme.spacing.lg }}>
      <Title order={4}>
        Ingredients{" "}
        {user?.id === recipeUserId && (
          <UnstyledButton
            sx={{
              marginLeft: 10,
              padding: theme.spacing.xs,
              borderRadius: theme.radius.lg,
              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
            onClick={() => {
              setEditingIngredients(!editingIngredients);
            }}
          >
            {editingIngredients ? <Checks size={20} /> : <Edit size={20} />}
          </UnstyledButton>
        )}
      </Title>
      {editingIngredients ? (
        fields
      ) : (
        <List>
          {take.ingredients.map((ingredient) => (
            <List.Item key={ingredient.id}>
              {ingredient.ingredientAmount} {ingredient.ingredientUnit}{" "}
              {ingredient.ingredientName}
            </List.Item>
          ))}
        </List>
      )}

      <Title order={4}>Steps</Title>
    </Group>
  );
};

export default RecipeTakeSection;
