//------------------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------------------

import {
  ActionIcon,
  Box,
  Button,
  Group,
  List,
  Select,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import axios, { AxiosResponse } from "axios";
import { RecipeTake } from "model/RecipeTake";
import React, { useContext, useState } from "react";
import { Checks, Edit, Plus, Trash } from "tabler-icons-react";
import { CreateIngredientResponse } from "types/api";
import { UNITS } from "utils/constants";
import { UserContext } from "utils/context/UserContext";
import { useIngredients } from "utils/hooks/useIngredients";

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
  const { ingredients, setIngredients } = useIngredients(user?.id);

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
  // Helpers/Handlers
  //------------------------------------------------------------------------------------------

  const createNewIngredient = (ingredientName: string) => {
    axios({
      method: "POST",
      withCredentials: true,
      data: {
        name: ingredientName,
        userId: user!.id,
      },
      url: `http://localhost:5000/ingredients`,
    }).then((res: AxiosResponse<CreateIngredientResponse>) => {
      console.log(res.data);
      setIngredients(res.data.userIngredients);
    });
  };

  //------------------------------------------------------------------------------------------
  // Rendering
  //------------------------------------------------------------------------------------------

  const fields = form.values.ingredients.map((_, index) => (
    <Group key={index} mt="xs">
      <Select
        placeholder="Start typing"
        label={index === 0 ? "Name" : ""}
        required
        sx={{ flex: 1 }}
        size="xs"
        data={[...ingredients]
          .sort((a, b) => (a.ingredientName > b.ingredientName ? 1 : -1))
          .map((item) => item.ingredientName)}
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={createNewIngredient}
        {...form.getListInputProps("ingredients", index, "ingredientName")}
      />
      <TextInput
        placeholder="Amount"
        label={index === 0 ? "Amount" : ""}
        size="xs"
        sx={{ flex: 1 }}
        required
        {...form.getListInputProps("ingredients", index, "ingredientAmount")}
      />
      <Select
        placeholder="Pick a unit"
        label={index === 0 ? "Unit" : ""}
        size="xs"
        sx={{ flex: 1 }}
        data={UNITS.map((unit) => {
          return {
            value: unit,
            label: unit,
          };
        })}
        {...form.getListInputProps("ingredients", index, "ingredientUnit")}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem("ingredients", index)}
        sx={{ marginTop: index === 0 ? 30 : 0 }}
      >
        <Trash size={20} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Group direction="column" sx={{ marginTop: theme.spacing.lg }}>
      <Group direction="row">
        <Title order={4}>Ingredients</Title>
        {user?.id === recipeUserId && (
          <ActionIcon
            variant="hover"
            onClick={() => setEditingIngredients(!editingIngredients)}
          >
            {editingIngredients ? <Checks /> : <Edit />}
          </ActionIcon>
        )}
      </Group>
      {editingIngredients ? (
        <Box>
          {fields.length === 0 && (
            <Text color="dimmed" align="center">
              Add some ingredients
            </Text>
          )}
          {fields}

          <Group mt="md">
            <Button
              onClick={() =>
                form.addListItem("ingredients", {
                  ingredientAmount: "",
                  ingredientUnit: "",
                  ingredientName: "",
                })
              }
              leftIcon={<Plus size={16} />}
              variant="gradient"
            >
              Add ingredient
            </Button>
          </Group>
        </Box>
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
