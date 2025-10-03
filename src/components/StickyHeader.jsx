import {
  Box,
  Flex,
  Heading,
  Image,
  IconButton,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const StickyHeader = ({ title = "Taste Scout", onSuggest }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="5"
      bg={colorMode === "light" ? "white" : "gray.700"}
      px={{ base: 4, md: 6 }}
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center">
        <Image
          src="/TasteScoutLogo.png"
          alt="Taste Scout Logo"
          boxSize="80px"
          objectFit="contain"
        />
        <Box flex="1" textAlign="center">
          <Heading color="teal.500" mb="0">
            {title}
          </Heading>
        </Box>
        <Flex align="center" gap={3}>
          {onSuggest && (
            <Button
              onClick={onSuggest}
              colorScheme="purple"
              size="sm"
              aria-label="Suggest me a recipe"
            >
              💡 Suggest me a recipe
            </Button>
          )}
          <Flex align="center" gap={2}>
            <Text fontSize="sm" color="gray.500">
              {colorMode === "light" ? "Light mode" : "Dark mode"}
            </Text>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle light/dark mode"
              variant="ghost"
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
