import {
  Box,
  Heading,
  Text,
  Stack,
  Icon,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { InfoIcon, StarIcon, SearchIcon } from "@chakra-ui/icons";
import { StickyHeader } from "../components/StickyHeader";

export const AboutPage = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box minH="100vh" bg={bg}>
      <StickyHeader title="About" />

      <Box
        maxW="4xl"
        mx="auto"
        bg={cardBg}
        p={{ base: 6, md: 8 }}
        mt={8}
        borderRadius="2xl"
        boxShadow="xl"
      >
        <Heading size="xl" mb={4} color={headingColor}>
          About Taste Scout
        </Heading>

        <Text fontSize="md" mb={6} color={textColor}>
          Taste Scout is your personal recipe explorer. It helps you discover
          delicious meals based on your preferences, dietary needs, and health
          goals. Whether you’re vegan, vegetarian, or just curious — Taste Scout
          finds recipes that match your taste.
        </Text>

        <Text fontSize="md" mb={6} color={textColor}>
          This project was originally developed as part of my training program.
          I’ve rebuilt and refined it to showcase in my portfolio. Every
          component from structure to visual detail is designed with care to
          reflect my growth as a developer.
        </Text>

        <Stack spacing={4}>
          <Feature
            icon={SearchIcon}
            title="Smart Suggestions"
            description="Get recipe ideas tailored to your diet and health labels."
          />
          <Feature
            icon={StarIcon}
            title="Favorites"
            description="Save your favorite recipes and revisit them anytime."
          />
          <Feature
            icon={InfoIcon}
            title="Nutrition Insights"
            description="Understand the nutritional value of each recipe at a glance."
          />
        </Stack>

        <Heading size="lg" mt={10} mb={4} color={headingColor}>
          About Me
        </Heading>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          align="start"
        >
          <Avatar name="Gudo" src="/me.png" size="xl" />
          <Text fontSize="md" color={textColor}>
            My name is Gudo. I’m a technically skilled professional with a broad
            background in electrical engineering, machine control, and
            logistics. I combine years of hands-on experience in technical
            environments with a strong interest in software development. I’m
            currently training to become a Full Stack Developer, actively
            building knowledge in HTML, CSS, JavaScript, Node.js, and React. My
            strengths in problem-solving, independent work, and quickly
            mastering new technologies make me a versatile all-rounder. Driven
            by a passion for software development, I’m motivated to transition
            into a dynamic IT environment where learning and contribution go
            hand in hand.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

const Feature = ({ icon, title, description }) => {
  const iconColor = useColorModeValue("teal.500", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Stack direction="row" align="start" spacing={4}>
      <Icon as={icon} boxSize={6} color={iconColor} mt={1} />
      <Box>
        <Text fontWeight="bold" color={iconColor}>
          {title}
        </Text>
        <Text fontSize="sm" color={textColor}>
          {description}
        </Text>
      </Box>
    </Stack>
  );
};
