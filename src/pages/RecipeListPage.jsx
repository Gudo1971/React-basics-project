import { useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Input,
  Checkbox,
  CheckboxGroup,
  Flex,
  Button,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { data } from "../utils/data";
import { LabelBadges } from "../components/LabelBadges";
import { StickyHeader } from "../components/StickyHeader";
export const RecipeListPage = ({ onSelectedRecipe }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

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

  const suggestRecipe = () => {
    const hour = new Date().getHours();
    let meal;

    if (hour < 11) meal = "Breakfast";
    else if (hour < 17) meal = "Lunch";
    else meal = "Dinner";

    const matching = data.hits.filter(({ recipe }) =>
      recipe.mealType?.includes(meal)
    );

    const pool = matching.length > 0 ? matching : data.hits;
    const random = pool[Math.floor(Math.random() * pool.length)];

    if (random) {
      onSelectedRecipe(random.recipe);
    }
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
      {/* Sticky header */}
      <StickyHeader title="Taste Scout" onSuggest={suggestRecipe} />

      {/* Main content */}
      <Box bg={bg} p={{ base: 4, md: 6 }}>
        <Flex direction={{ base: "column", md: "row" }} align="start" gap={6}>
          {/* Sidebar filters */}
          <Box
            w={{ base: "100%", md: "250px" }}
            bg={cardBg}
            p={4}
            borderRadius="md"
            boxShadow="sm"
            position={{ base: "static", md: "sticky" }}
            top="100px"
            alignSelf="start"
          >
            <Image
              src="https://clipart-library.com/images/rijKyMB7T.gif"
              alt="Grappige cartoon chef"
              borderRadius="xl"
              mb={4}
              boxSize="150px"
              objectFit="cover"
              mx="auto"
            />
            <Heading size="md" mb={4} textAlign="center" color="teal.400">
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

            <Text fontWeight="bold" mb={2} color={textColor}>
              Health labels:
            </Text>
            <CheckboxGroup
              value={selectedHealthLabels}
              onChange={setSelectedHealthLabels}
            >
              <Stack spacing={2}>
                <Checkbox value="Gluten-Free">Gluten Free</Checkbox>
                <Checkbox value="Dairy-Free">Dairy Free</Checkbox>
                <Checkbox value="Sesame-Free">Sesame Free</Checkbox>
                <Checkbox value="Soy-Free">Soy Free</Checkbox>
              </Stack>
            </CheckboxGroup>

            <Text fontWeight="bold" mt={4} mb={2} color={textColor}>
              Diet:
            </Text>
            <CheckboxGroup value={selectedDiets} onChange={setSelectedDiets}>
              <Stack spacing={2}>
                <Checkbox value="Vegan">Vegan</Checkbox>
                <Checkbox value="Vegetarian">Vegetarian</Checkbox>
                <Checkbox value="Pescatarian">Pescatarian</Checkbox>
              </Stack>
            </CheckboxGroup>

            <Text fontWeight="bold" mt={4} mb={2} color={textColor}>
              Ingredient:
            </Text>
            <Box mb={2}>
              <label
                htmlFor="ingredient-select"
                style={{ fontWeight: "bold", color: textColor }}
              >
                Select ingredient:
              </label>
            </Box>
            <select
              id="ingredient-select"
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
              w="100%"
            >
              Reset filters
            </Button>
          </Box>
          {/* Recipe grid */}
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
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={6}
              >
                {filteredRecipes.map(({ recipe }) => (
                  <Box
                    key={recipe.label}
                    borderRadius="2xl"
                    boxShadow="xl"
                    overflow="hidden"
                    p={4}
                    cursor="pointer"
                    onClick={() => onSelectedRecipe(recipe)}
                    _hover={{
                      transform: "scale(1.05)",
                      transition: "0.2s",
                      bg: useColorModeValue("gray.100", "gray.600"),
                    }}
                    bg={cardBg}
                    minH="320px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Image
                      src={recipe.image}
                      alt={recipe.label}
                      maxH="180px"
                      objectFit="cover"
                      borderRadius="lg"
                      mx="auto"
                      mb={2}
                    />

                    <Box textAlign="center">
                      <Heading size="md" mt={2} mb={2} color="teal.400">
                        {recipe.label}
                      </Heading>

                      {recipe.dietLabels.length > 0 && (
                        <Text fontSize="sm" color={textColor}>
                          <strong>Diet: </strong> {recipe.dietLabels.join(", ")}
                        </Text>
                      )}

                      {recipe.cautions.length > 0 && (
                        <Text fontSize="sm" color="red.400">
                          <strong>Warning: </strong>{" "}
                          {recipe.cautions.join(", ")}
                        </Text>
                      )}

                      {recipe.mealType && (
                        <Text fontSize="sm" color={textColor}>
                          <strong>Meal type: </strong>{" "}
                          {recipe.mealType.join(", ")}
                        </Text>
                      )}

                      {recipe.dishType && (
                        <Text fontSize="sm" color={textColor}>
                          <strong>Dish type: </strong>{" "}
                          {recipe.dishType.join(", ")}
                        </Text>
                      )}
                    </Box>

                    <LabelBadges
                      dietLabels={recipe.dietLabels}
                      healthLabels={recipe.healthLabels}
                    />
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
