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
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { LabelBadges } from "../components/LabelBadges";
import { StickyHeader } from "../components/StickyHeader";

export const RecipePage = ({ recipe, onBack }) => {
  if (!recipe) return null;

  // 🎨 Dark mode ondersteuning
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cautionBg = useColorModeValue("red.50", "red.900");
  const cautionText = useColorModeValue("red.500", "red.200");

  return (
    <>
      <StickyHeader title="Recipe Card" />

      <Box bg={useColorModeValue("gray.50", "gray.900")} p={{ base: 2, md: 4 }}>
        <Box
          maxW="6xl"
          mx="auto"
          bg={cardBg}
          p={{ base: 4, md: 6 }}
          borderRadius="2xl"
          boxShadow="2xl"
        >
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="teal"
            mb={6}
            onClick={onBack}
          >
            Back to recipes
          </Button>

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
            color={headingColor}
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
              bg={cautionBg}
              p={4}
              borderRadius="xl"
              boxShadow="md"
              mb={6}
              textAlign="center"
            >
              <Heading size="sm" color="red.600" mb={2}>
                ⚠️ Health Warnings
              </Heading>
              <Text color={cautionText} fontWeight="medium">
                {recipe.cautions.join(", ")}
              </Text>
            </Box>
          )}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            {/* Ingrediënten */}
            <Box>
              <Heading size="md" mb={4} color={headingColor}>
                🧾 Ingredients
              </Heading>
              <Box maxH="300px" overflowY="auto" pr={2}>
                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={3}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <GridItem key={index} display="flex" alignItems="start">
                      <CheckCircleIcon color="teal.400" mt={1} mr={2} />
                      <Text color={textColor}>{ingredient.text}</Text>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </Box>

            {/* Nutrition Info */}
            <Box alignSelf="start" ml={{ base: 0, md: 12 }}>
              <Heading size="md" mb={4} color={headingColor}>
                🥦 Nutrition Info
              </Heading>
              <Stack spacing={2}>
                {recipe.totalNutrients.ENERC_KCAL?.quantity && (
                  <Text color={textColor}>
                    <strong>Calories:</strong>{" "}
                    {Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} kcal
                  </Text>
                )}
                {recipe.totalNutrients.FAT?.quantity && (
                  <Text color={textColor}>
                    <strong>Fat:</strong>{" "}
                    {Math.round(recipe.totalNutrients.FAT.quantity)} g
                  </Text>
                )}
                {recipe.totalNutrients.CHOCDF?.quantity && (
                  <Text color={textColor}>
                    <strong>Carbs:</strong>{" "}
                    {Math.round(recipe.totalNutrients.CHOCDF.quantity)} g
                  </Text>
                )}
                {recipe.totalNutrients.PROCNT?.quantity && (
                  <Text color={textColor}>
                    <strong>Protein:</strong>{" "}
                    {Math.round(recipe.totalNutrients.PROCNT.quantity)} g
                  </Text>
                )}
                {recipe.totalNutrients.FIBTG?.quantity && (
                  <Text color={textColor}>
                    <strong>Fiber:</strong>{" "}
                    {Math.round(recipe.totalNutrients.FIBTG.quantity)} g
                  </Text>
                )}
                {recipe.totalNutrients.SUGAR?.quantity && (
                  <Text color={textColor}>
                    <strong>Sugar:</strong>{" "}
                    {Math.round(recipe.totalNutrients.SUGAR.quantity)} g
                  </Text>
                )}
                {recipe.totalNutrients.NA?.quantity && (
                  <Text color={textColor}>
                    <strong>Sodium:</strong>{" "}
                    {Math.round(recipe.totalNutrients.NA.quantity)} mg
                  </Text>
                )}
                {recipe.totalNutrients.CHOLE?.quantity && (
                  <Text color={textColor}>
                    <strong>Cholesterol:</strong>{" "}
                    {Math.round(recipe.totalNutrients.CHOLE.quantity)} mg
                  </Text>
                )}
              </Stack>
            </Box>
          </SimpleGrid>

          <Text fontStyle="italic" textAlign="center" mt={6} color={textColor}>
            Source:{" "}
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              {recipe.source}
            </a>
          </Text>
        </Box>
      </Box>
    </>
  );
};
