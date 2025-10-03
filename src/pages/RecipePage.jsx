import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { LabelBadges } from "../components/LabelBadges";

export const RecipePage = ({ recipe, onBack }) => {
  if (!recipe) return null;

  return (
    <Box bg="gray.50" p={{ base: 4, md: 6 }}>
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="teal"
        mb={6}
        onClick={onBack}
        position="sticky"
        top="80px"
        zIndex="10"
      >
        Back to recipes
      </Button>

      <Box
        maxW="6xl"
        mx="auto"
        bg="white"
        p={{ base: 4, md: 6 }}
        borderRadius="2xl"
        boxShadow="2xl"
        maxH="100vh"
        overflowY="auto"
      >
        <Image
          src={recipe.image}
          alt={recipe.label}
          borderRadius="xl"
          w="100%"
          maxH={{ base: "250px", md: "300px" }}
          objectFit="cover"
          mb={6}
          boxShadow="lg"
        />

        <Heading
          size="xl"
          textAlign={{ base: "center", md: "left" }}
          color="teal.600"
          mb={4}
        >
          {recipe.label}
        </Heading>

        <LabelBadges
          dietLabels={recipe.dietLabels}
          healthLabels={recipe.healthLabels}
        />

        {recipe.cautions.length > 0 && (
          <Box
            bg="red.50"
            p={4}
            borderRadius="xl"
            boxShadow="md"
            mb={6}
            textAlign="center"
          >
            <Heading size="sm" color="red.600" mb={2}>
              ⚠️ Health Warnings
            </Heading>
            <Text color="red.500" fontWeight="medium">
              {recipe.cautions.join(", ")}
            </Text>
          </Box>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          {/* Ingrediënten */}
          <Box>
            <Heading size="md" mb={4} color="teal.500">
              🧾 Ingredients
            </Heading>
            <Box maxH="300px" overflowY="auto" pr={2}>
              <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={3}>
                {recipe.ingredients.map((ingredient, index) => (
                  <GridItem key={index} display="flex" alignItems="start">
                    <CheckCircleIcon color="teal.400" mt={1} mr={2} />
                    <Text>{ingredient.text}</Text>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Box>

          {/* Nutrition Info */}
          <Box alignSelf="start" ml={{ base: 0, md: 12 }}>
            <Heading size="md" mb={4} color="teal.500">
              🥦 Nutrition Info
            </Heading>
            <Stack spacing={2}>
              {recipe.totalNutrients.ENERC_KCAL?.quantity && (
                <Text>
                  <strong>Calories:</strong>{" "}
                  {Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} kcal
                </Text>
              )}
              {recipe.totalNutrients.FAT?.quantity && (
                <Text>
                  <strong>Fat:</strong>{" "}
                  {Math.round(recipe.totalNutrients.FAT.quantity)} g
                </Text>
              )}
              {recipe.totalNutrients.CHOCDF?.quantity && (
                <Text>
                  <strong>Carbs:</strong>{" "}
                  {Math.round(recipe.totalNutrients.CHOCDF.quantity)} g
                </Text>
              )}
              {recipe.totalNutrients.PROCNT?.quantity && (
                <Text>
                  <strong>Protein:</strong>{" "}
                  {Math.round(recipe.totalNutrients.PROCNT.quantity)} g
                </Text>
              )}
              {recipe.totalNutrients.FIBTG?.quantity && (
                <Text>
                  <strong>Fiber:</strong>{" "}
                  {Math.round(recipe.totalNutrients.FIBTG.quantity)} g
                </Text>
              )}
              {recipe.totalNutrients.SUGAR?.quantity && (
                <Text>
                  <strong>Sugar:</strong>{" "}
                  {Math.round(recipe.totalNutrients.SUGAR.quantity)} g
                </Text>
              )}
              {recipe.totalNutrients.NA?.quantity && (
                <Text>
                  <strong>Sodium:</strong>{" "}
                  {Math.round(recipe.totalNutrients.NA.quantity)} mg
                </Text>
              )}
            </Stack>
          </Box>
        </SimpleGrid>

        <Text fontStyle="italic" textAlign="center" mt={6}>
          Source:{" "}
          <a href={recipe.url} target="_blank" rel="noopener noreferrer">
            {recipe.source}
          </a>
        </Text>
      </Box>
    </Box>
  );
};
