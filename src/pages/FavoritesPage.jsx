import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  IconButton,
  Tooltip,
  Badge,
  Button,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { StickyHeader } from "../components/StickyHeader";
import { LabelBadges } from "../components/LabelBadges";
import { data } from "../utils/data";

export const FavoritesPage = ({ onSelectedRecipe }) => {
  const [favorites, setFavorites] = useState([]);
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const { colorMode } = useColorMode();

  useEffect(() => {
    const favs = data.hits
      .map(({ recipe }) => recipe)
      .filter((r) => localStorage.getItem(`favorite-${r.url}`) === "true");
    setFavorites(favs);
  }, []);

  const handleResetFavorites = () => {
    favorites.forEach((r) => localStorage.removeItem(`favorite-${r.url}`));
    setFavorites([]);
  };

  const suggestRecipe = () => {
    if (favorites.length === 0) return;
    const random = favorites[Math.floor(Math.random() * favorites.length)];
    onSelectedRecipe(random);
  };

  return (
    <>
      <StickyHeader title="Your Favorites" onSuggest={suggestRecipe} />
      <Box bg={bg} p={{ base: 4, md: 6 }}>
        <Flex direction={{ base: "column", md: "row" }} align="start" gap={6}>
          {/* Sidebar */}
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
              src="./937034.png"
              alt="Grappige cartoon chef"
              borderRadius="xl"
              mb={4}
              boxSize="150px"
              objectFit="cover"
              mx="auto"
            />

            <Heading size="md" mb={4} textAlign="center" color="teal.400">
              Favorites
            </Heading>

            <Button
              onClick={handleResetFavorites}
              colorScheme="teal"
              mt={4}
              size="sm"
              w="100%"
            >
              Remove all favorites
            </Button>
          </Box>

          {/* Recipe grid */}
          <Box flex="1">
            {favorites.length === 0 ? (
              <Text
                fontWeight="bold"
                textAlign="center"
                fontSize="xl"
                color="red.500"
                mt={8}
              >
                You have no favorites yet. Try adding some from the recipe list.
              </Text>
            ) : (
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                spacing={6}
              >
                {favorites.map((recipe) => {
                  const toggleFavorite = (e) => {
                    e.stopPropagation();
                    localStorage.removeItem(`favorite-${recipe.url}`);
                    setFavorites((prev) =>
                      prev.filter((r) => r.url !== recipe.url)
                    );
                  };

                  return (
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
                        bg: bg,
                      }}
                      bg={cardBg}
                      minH="320px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="start"
                      position="relative"
                    >
                      <Flex justify="flex-end" mb={2}>
                        <Tooltip label="Remove from favorites" hasArrow>
                          <IconButton
                            icon={<StarIcon />}
                            onClick={toggleFavorite}
                            aria-label="Remove favorite"
                            variant="ghost"
                            color="yellow.400"
                            fontSize="xl"
                          />
                        </Tooltip>
                      </Flex>

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

                        <Badge
                          colorScheme="yellow"
                          mb={2}
                          fontSize="0.8em"
                          borderRadius="md"
                        >
                          ★ Favorite
                        </Badge>

                        {recipe.dietLabels.length > 0 && (
                          <Text fontSize="sm" color={textColor}>
                            <strong>Diet: </strong>{" "}
                            {recipe.dietLabels.join(", ")}
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
