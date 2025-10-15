import {
  Box,
  Flex,
  Stack,
  Heading,
  Image,
  IconButton,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

export const StickyHeader = ({ title = "Taste Scout", onSuggest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleSuggest = () => {
    if (onSuggest) {
      onSuggest(); // zet recipe in state
      navigate("/recipe"); // navigeer naar recipepagina
    }
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="5"
      bg={colorMode === "light" ? "white" : "gray.700"}
      px={{ base: 4, md: 6 }}
      py={3}
      boxShadow="sm"
    >
      <Stack
        direction={["column", "row"]}
        spacing={4}
        align="center"
        justify="space-between"
      >
        {/* Klikbaar logo */}
        <Link to="/">
          <Image
            src="/TasteScoutLogo.png"
            alt="Taste Scout Logo"
            boxSize="80px"
            objectFit="contain"
            cursor="pointer"
          />
        </Link>

        {/* Titel */}
        <Box flex="1" textAlign="center">
          <Heading color="teal.500" mb="0">
            {title}
          </Heading>
        </Box>

        {/* Suggestieknop + dark mode */}
        <Flex align="center" gap={3}>
          <Button
            onClick={handleSuggest}
            colorScheme="purple"
            size="sm"
            aria-label="Suggest me a recipe"
          >
            💡 Suggest me a recipe
          </Button>

          <Flex align="center" gap={2}>
            <Text fontSize="sm" color="gray.500">
              {colorMode === "light" ? "Light mode" : "Dark mode"}
            </Text>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle light/dark mode"
              variant="ghost"
              size="sm"
            />
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
};
