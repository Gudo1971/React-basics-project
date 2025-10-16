import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
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
  useColorMode,
  IconButton,
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { data } from "../utils/data";
import { LabelBadges } from "../components/LabelBadges";
import { StickyHeader } from "../components/StickyHeader";

export const RecipeListPage = ({ onSelectedRecipe }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const debouncedUpdate = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  useEffect(() => {
    debouncedUpdate(inputValue);
  }, [inputValue, debouncedUpdate]);

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const { colorMode } = useColorMode();

  const allIngredients = Array.from(
    new Set(
      data.hits
        .flatMap(({ recipe }) => recipe.ingredients.map((i) => i.food))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  const handleResetFilters = () => {
    setInputValue("");
    setSearchTerm("");
    setSelectedHealthLabels([]);
    setSelectedDiets([]);
    setSelectedIngredient("");
  };

  const suggestRecipe = () => {
    const hour = new Date().getHours();
    const meal = hour < 11 ? "Breakfast" : hour < 17 ? "Lunch" : "Dinner";
    const matching = data.hits.filter(({ recipe }) =>
      recipe.mealType?.includes(meal)
    );
    const pool = matching.length > 0 ? matching : data.hits;
    const random = pool[Math.floor(Math.random() * pool.length)];
    if (random) onSelectedRecipe(random.recipe);
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
      <StickyHeader title="Taste Scout" onSuggest={suggestRecipe} />
      <Box bg={bg} p={{ base: 4, md: 6 }}>
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {/* 🔍 Sidebar met filters */}
          <Box
            w={{ base: "100%", md: "250px" }}
            bg={cardBg}
            p={4}
            borderRadius="md"
            boxShadow="sm"
            position={{ base: "static", md: "sticky" }}
            top="100px"
          >
            <Image
              src="./937034.png"
              alt="Chef"
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
            <select
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #CBD5E0",
                backgroundColor: colorMode === "light" ? "#EDF2F7" : "#2D3748",
                color: colorMode === "light" ? "#2D3748" : "#EDF2F7",
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

          {/* 🍽️ Recepten-grid */}
          <Box flex="1">
            {filteredRecipes.length === 0 ? (
              <Text
                fontWeight="bold"
                textAlign="center"
                fontSize="xl"
                color="red.500"
                mt={8}
              >
                No recipes match your filters.
              </Text>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
                {filteredRecipes.map(({ recipe }) => {
                  const isFavourite =
                    localStorage.getItem(`favorite-${recipe.url}`) === "true";

                  const toggleFavorite = (e) => {
                    e.stopPropagation();
                    localStorage.setItem(
                      `favorite-${recipe.url}`,
                      (!isFavourite).toString()
                    );
                    setRefreshTrigger((prev) => !prev);
                  };

                  return (
                    <Box
                      key={`${recipe.label}-${refreshTrigger}`}
                      borderRadius="2xl"
                      boxShadow="xl"
                      overflow="hidden"
                      p={4}
                      cursor="pointer"
                      onClick={() => onSelectedRecipe(recipe)}
                      _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
                      bg={cardBg}
                      minH="320px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="start"
                      position="relative"
                    >
                      <Flex justify="flex-end" mb={2}>
                        <Tooltip
                          label={
                            isFavourite
                              ? "Unmark as favorite"
                              : "Mark as favorite"
                          }
                          hasArrow
                        >
                          <IconButton
                            icon={<StarIcon />}
                            onClick={toggleFavorite}
                            aria-label="Toggle favorite"
                            variant="ghost"
                            color={isFavourite ? "yellow.400" : "gray.400"}
                            fontSize="xl"
                            isRound
                          />
                        </Tooltip>
                      </Flex>

                      <Image
                        src={recipe.image}
                        alt={recipe.label}
                        maxH="180px"
                        objectFit="cover"
                        borderRadius="lg"
                        mb={2}
                      />

                      <Box textAlign="center">
                        <Heading size="md" mt={2} mb={2} color="teal.400">
                          {recipe.label}
                        </Heading>

                        {isFavourite && (
                          <Badge
                            colorScheme="yellow"
                            mb={2}
                            fontSize="0.8em"
                            borderRadius="md"
                          >
                            ★ Favorite
                          </Badge>
                        )}

                        {recipe.dietLabels.length > 0 && (
                          <Text fontSize="sm" color={textColor}>
                            <strong>Diet: </strong>
                            {recipe.dietLabels.join(", ")}
                          </Text>
                        )}

                        {recipe.cautions.length > 0 && (
                          <Text mt={2} mb={2} fontSize="sm" color="red.400">
                            <strong>Warning: </strong>
                            {recipe.cautions.join(", ")}
                          </Text>
                        )}

                        {recipe.mealType && (
                          <Text fontSize="sm" color={textColor}>
                            <strong>Meal type: </strong>
                            {recipe.mealType.join(", ")}
                          </Text>
                        )}

                        {recipe.dishType && (
                          <Text fontSize="sm" color={textColor}>
                            <strong>Dish type: </strong>
                            {recipe.dishType.join(", ")}
                          </Text>
                        )}

                        <LabelBadges
                          dietLabels={recipe.dietLabels}
                          healthLabels={recipe.healthLabels}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </SimpleGrid>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};
