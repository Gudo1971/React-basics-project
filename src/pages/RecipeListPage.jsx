import {
  Box,
  Image,
  Text,
  VStack,
  Stack,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ onSelectedRecipe }) => {
  return (
    <VStack spacing={6} p={6} align="stretch">
      <Heading textAlign="center">Your Recipe App</Heading>
      {data.hits.map((hit) => {
        const recipe = hit.recipe;

        return (
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
        );
      })}
    </VStack>
  );
};
