import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Badge,
  Stack,
  List,
  ListItem,
  Divider,
  Button,
} from "@chakra-ui/react";

export const RecipePage = ({ recipe, onBack }) => {
  if (!recipe) return null;

  const {
    label,
    image,
    mealType,
    dishType,
    totalTime,
    dietLabels,
    healthLabels,
    cautions,
    ingredientLines,
    yield: servings,
    totalNutrients,
  } = recipe;

  return (
    <VStack spacing={6} p={6} align="stretch ">
      <Button alignSelf="start" onClick={onBack}>
        ← Back to recipes
      </Button>

      <Heading textAlign="center"> {label}</Heading>
      <Image src={image} alt={label} borderRadius="md" />

      <Box>
        <Text>
          <strong>Meal Type</strong>
          {mealType?.join(", ")}
        </Text>
        <Text>
          <strong>Dish Tpe</strong>
          {dishType?.join(", ")}
        </Text>
        <Text>
          <strong>Total coocking time</strong>
          {totalTime} minutes{" "}
        </Text>
        <Text>
          <strong>Servings</strong>
          {servings}
        </Text>
      </Box>
      <Divider />

      <Box>
        <Text>
          <strong>Diet Labels:</strong>
          {dietLabels?.join(", ")}
        </Text>
        <Text>
          <strong>Health Labels:</strong>
        </Text>
        <Stack direction="row" wrap="wrap">
          {healthLabels.map((label) => (
            <Badge key={label} colorScheme="green" m={1}>
              {label}
            </Badge>
          ))}
        </Stack>

        {cautions.length > 0 && (
          <>
            <Text mt={4}>
              <strong>Cautions:</strong>
            </Text>
            <Stack direction="row" wrap="wrap">
              {cautions.map((caution) => (
                <Badge key={caution} colorScheme="red" m={1}>
                  {caution}
                </Badge>
              ))}
            </Stack>
          </>
        )}
      </Box>

      <Divider />

      <Box>
        <Text>
          <strong>Ingredients:</strong>
        </Text>
        <List spacing={2} mt={2}>
          {ingredientLines.map((line, index) => (
            <ListItem key={index}>• {line}</ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      <Box>
        <Text>
          <strong>Total nutrients:</strong>
        </Text>
        <List spacing={1} mt={2}>
          <ListItem>
            Energy: {Math.round(totalNutrients.ENERC_KCAL?.quantity)} kcal
          </ListItem>
          <ListItem>
            Protein: {Math.round(totalNutrients.PROCNT?.quantity)} g
          </ListItem>
          <ListItem>Fat {Math.round(totalNutrients.FAT?.quantity)} g</ListItem>
          <ListItem>
            Carbs: {Math.round(totalNutrients.CHOCDF?.quantity)} g
          </ListItem>
          <ListItem>
            Cholesterol: {Math.round(totalNutrients.CHOLE?.quantity)} mg
          </ListItem>
          <ListItem>
            Sodium: {Math.round(totalNutrients.NA?.quantity)} mg
          </ListItem>
        </List>
      </Box>
    </VStack>
  );
};
