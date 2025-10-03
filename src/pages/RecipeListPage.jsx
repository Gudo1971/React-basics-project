import { useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  Stack,
  Badge,
  Heading,
  Input,
  Checkbox,
  CheckboxGroup,
  Stack as HStack,
  Button,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ onSelectedRecipe }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedHealthLabels([]);
    setSelectedDiets([]);
  };

  const filteredRecipes = data.hits.filter(({ recipe }) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      recipe.label.toLowerCase().includes(term) ||
      recipe.healthLabels.some((label) => label.toLowerCase().includes(term));

    const matchesHealth =
      selectedHealthLabels.length === 0 ||
      selectedHealthLabels.every((label) =>
        recipe.healthLabels
          .map((l) => l.toLowerCase())
          .includes(label.toLowerCase())
      );

    const matchesDiet =
      selectedDiets.length === 0 ||
      selectedDiets.some((diet) => recipe.healthLabels.includes(diet));

    return matchesSearch && matchesHealth && matchesDiet;
  });

  return (
    <VStack spacing={6} p={6} align="stretch">
      <Heading textAlign="center">Your Recipe App</Heading>
      <Input
        placeholder="Search recipes or health labels ...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="md"
        variant="filled"
        mb={4}
      />
      <Text fontweight="Bold">Filter by Health labels: </Text>
      <CheckboxGroup
        value={selectedHealthLabels}
        onChange={setSelectedHealthLabels}
      >
        <HStack spacing={4} wrap="wrap">
          <Checkbox value="Gluten-Free">Gluten Free </Checkbox>
          <Checkbox value="Dairy-Free">Dairy Free </Checkbox>
          <Checkbox value="Sesame-Free">Sesame Free </Checkbox>
          <Checkbox value="Soy-Free">Soy Free </Checkbox>
        </HStack>
      </CheckboxGroup>

      <Text fontweight="bold" mt={4}>
        {" "}
        Filtered by diet:{" "}
      </Text>
      <CheckboxGroup value={selectedDiets} onChange={setSelectedDiets}>
        <HStack spacing={4}>
          <Checkbox value="Vegan">Vegan</Checkbox>
          <Checkbox value="Vegetarian">Vegetarian</Checkbox>
          <Checkbox value="Pescatarian">Pescatarian</Checkbox>
        </HStack>
      </CheckboxGroup>

      <Button onClick={handleResetFilters} colorScheme="teal" mt={4}>
        Reset filters
      </Button>
      {filteredRecipes.length === 0 ? (
        <Text
          fontWeight="bold"
          textAlign="center"
          fontSize="xl"
          color="red"
          mt={8}
        >
          No recipes match your filters. Try adjusting your search or reset
          filters.
        </Text>
      ) : (
        filteredRecipes.map(({ recipe }) => (
          <Box
            key={recipe.label}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            cursor="pointer"
            onClick={() => onSelectedRecipe(recipe)}
            _hover={{ bg: "gray.50" }}
          >
            <Stack direction="row" spacing={4}>
              <Image
                src={recipe.image}
                alt={recipe.label}
                boxSize="150px"
                objectFit="cover"
              />
              <Box>
                <Heading size="md"> {recipe.label}</Heading>

                {recipe.dietLabels.length > 0 && (
                  <Text>
                    <strong>Diet</strong> {recipe.dietLabels.join(", ")}
                  </Text>
                )}
                {recipe.cautions.length > 0 && (
                  <Text>
                    <strong>Warning</strong> {recipe.cautions.join(",")}
                  </Text>
                )}

                {recipe.mealType && (
                  <Text>
                    <strong>Meal type</strong>
                    {recipe.mealType.join(",")}
                  </Text>
                )}

                {recipe.dishType && (
                  <Text>
                    <strong>Dish type:</strong> {recipe.dishType.join(", ")}
                  </Text>
                )}

                <Stack direction="row" mt={2}>
                  {recipe.healthLabels.includes("Vegan") && (
                    <Badge colorScheme="green">Vegan</Badge>
                  )}
                  {recipe.healthLabels.includes("Vegetarian") && (
                    <Badge colorScheme="purple">Vegetarian</Badge>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Box>
        ))
      )}
    </VStack>
  );
};
