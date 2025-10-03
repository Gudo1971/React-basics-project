import { useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  Badge,
  Heading,
  Input,
  Checkbox,
  CheckboxGroup,
  Flex,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ onSelectedRecipe }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");

  // filter on selected ingredient

  const allIngredients = Array.from(
    new Set(
      data.hits
        .flatMap(({ recipe }) => recipe.ingredients.map((i) => i.food))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedHealthLabels([]);
    setSelectedDiets([]);
    setSelectedIngredient("");
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
      selectedDiets.some((diet) =>
        recipe.healthLabels
          .map((l) => l.toLowerCase())
          .includes(diet.toLowerCase())
      );

    const matchesIngredient =
      selectedIngredient === "" ||
      recipe.ingredients.some((i) =>
        i.food.toLowerCase().includes(selectedIngredient.toLowerCase())
      );

    return matchesSearch && matchesHealth && matchesDiet && matchesIngredient;
  });

  return (
    <>
      <Box
        position="sticky"
        top="0"
        zIndex="10"
        bg="gray.50"
        py={4}
        px={6}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center">
          {/* Logo links */}
          <Image
            src="/TasteScoutLogo.png"
            alt="Taste Scout Logo"
            boxSize="80px"
            objectFit="contain"
          />

          {/* Titel gecentreerd */}
          <Box flex="1" textAlign="center">
            <Heading color="teal.600" mb="0">
              Taste Scout
            </Heading>
          </Box>

          {/* Lege ruimte rechts voor balans */}
          <Box w="60px" />
        </Flex>
      </Box>

      <Box bg="gray.50" p={6}>
        <Flex align="start" gap={6}>
          <Box
            w="250px"
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="sm"
            position="sticky"
            top="125px"
            alignSelf="start"
          >
            <Image
              src="https://clipart-library.com/images/rijKyMB7T.gif"
              alt="Grappige cartoon chef"
              borderRadius="xl"
              mb={4}
              boxSize="200px"
              objectFit="cover"
            />
            <Heading size="md" mb={4}>
              Filters
            </Heading>

            <Input
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="sm"
              variant="filled"
              mb={4}
            />

            <Text fontWeight="bold" mb={2}>
              Health labels:
            </Text>
            <CheckboxGroup
              value={selectedHealthLabels}
              onChange={setSelectedHealthLabels}
            >
              <Stack spacing={2}>
                <Checkbox value="Gluten-Free" w="full" justifyContent="start">
                  Gluten Free
                </Checkbox>
                <Checkbox value="Dairy-Free" w="full" justifyContent="start">
                  Dairy Free
                </Checkbox>
                <Checkbox value="Sesame-Free" w="full" justifyContent="start">
                  Sesame Free
                </Checkbox>
                <Checkbox value="Soy-Free" w="full" justifyContent="start">
                  Soy Free
                </Checkbox>
              </Stack>
            </CheckboxGroup>

            <Text fontWeight="bold" mt={4} mb={2}>
              Diet:
            </Text>
            <CheckboxGroup value={selectedDiets} onChange={setSelectedDiets}>
              <Stack spacing={2}>
                <Checkbox value="Vegan" w="full" justifyContent="start">
                  Vegan
                </Checkbox>
                <Checkbox value="Vegetarian" w="full" justifyContent="start">
                  Vegetarian
                </Checkbox>
                <Checkbox value="Pescatarian" w="full" justifyContent="start">
                  Pescatarian
                </Checkbox>
              </Stack>
            </CheckboxGroup>

            <Text fontWeight="bold" mt={4} mb={2}>
              Ingredient:
            </Text>
            <select
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #CBD5E0",
                backgroundColor: "#EDF2F7",
                marginBottom: "12px",
              }}
            >
              <option value="">-- Select an ingredient --</option>
              {allIngredients.map((ingredient, index) => (
                <option key={index} value={ingredient}>
                  {ingredient}
                </option>
              ))}
            </select>

            <Button
              onClick={handleResetFilters}
              colorScheme="teal"
              mt={4}
              size="sm"
            >
              Reset filters
            </Button>
          </Box>

          <Box flex="1">
            {filteredRecipes.length === 0 ? (
              <Text
                fontWeight="bold"
                textAlign="center"
                fontSize="xl"
                color="red.500"
                mt={8}
              >
                No recipes match your filters. Try adjusting your search or
                reset filters.
              </Text>
            ) : (
              <SimpleGrid columns={5} spacing={6}>
                {filteredRecipes.map(({ recipe }) => (
                  <Box
                    key={recipe.label}
                    borderWidth="25px"
                    borderRadius="2xl"
                    boxShadow="xl"
                    overflow="hidden"
                    p={4}
                    cursor="pointer"
                    onClick={() => onSelectedRecipe(recipe)}
                    _hover={{
                      transform: "scale(1.25)",
                      transition: "0.2s",
                      bg: "gray.100",
                    }}
                    bg="gray.50"
                  >
                    <Image
                      src={recipe.image}
                      alt={recipe.label}
                      boxSize={{ base: "100%", md: "150px" }}
                      objectFit="cover"
                      borderRadius="lg"
                      mx="auto"
                      mb={4}
                    />

                    <Heading
                      size="md"
                      mb={2}
                      color="teal.600"
                      textAlign="center"
                    >
                      {recipe.label}
                    </Heading>
                    {recipe.dietLabels.length > 0 && (
                      <Text fontSize="sm" color="gray.600 " textAlign="center">
                        <strong>Diet: </strong> {recipe.dietLabels.join(", ")}
                      </Text>
                    )}

                    {recipe.cautions.length > 0 && (
                      <Text fontSize="sm" color="red.500">
                        <strong>Warning: </strong> {recipe.cautions.join(", ")}
                      </Text>
                    )}
                    {recipe.mealType && (
                      <Text fontSize="sm" color="gray.600">
                        <strong>Meal type: </strong>{" "}
                        {recipe.mealType.join(", ")}
                      </Text>
                    )}
                    {recipe.dishType && (
                      <Text fontSize="sm" color="gray.600">
                        <strong>Dish type: </strong>{" "}
                        {recipe.dishType.join(", ")}
                      </Text>
                    )}

                    <Stack direction="row" mt={2}>
                      {recipe.healthLabels.includes("Vegan") && (
                        <Badge colorScheme="green">Vegan </Badge>
                      )}
                      {recipe.healthLabels.includes("Vegetarian") && (
                        <Badge colorScheme="purple">Vegetarian </Badge>
                      )}
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};
