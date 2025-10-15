import {
  Box,
  Flex,
  IconButton,
  Button,
  Text,
  useColorMode,
  useColorModeValue,
  Image,
  Link as ChakraLink,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const StickyHeader = ({ onSuggest, title }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "About", path: "/about" },
  ];

  const activeColor = useColorModeValue("teal.600", "teal.300");
  const inactiveColor = useColorModeValue("gray.600", "gray.300");

  const handleSuggest = () => {
    if (onSuggest) {
      onSuggest();
      navigate("/recipe");
    }
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg={useColorModeValue("white", "gray.800")}
      px={{ base: 4, md: 6 }}
      py={3}
      boxShadow="sm"
    >
      <Flex
        align="center"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        textAlign="center"
      >
        {/* Linkerkant: logo + merknaam */}
        <Flex align="center" gap={3}>
          <Link to="/">
            <Image
              src="/TasteScoutLogo.png"
              alt="Taste Scout Logo"
              boxSize="50px"
              objectFit="contain"
              cursor="pointer"
            />
          </Link>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="teal.500"
            display={{ base: "block", md: "block" }}
          >
            Taste Scout
          </Text>
        </Flex>

        {/* Midden: paginatitel */}
        {title && (
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="teal.500"
            mx={6}
            display={{ base: "none", md: "block" }}
          >
            {title}
          </Text>
        )}

        {/* Rechterkant: navigatie + suggestie + theme */}
        <Flex gap={6} align="center" display={{ base: "none", md: "flex" }}>
          {navItems.map((item) => (
            <ChakraLink
              as={Link}
              to={item.path}
              key={item.path}
              fontWeight="medium"
              color={
                location.pathname === item.path ? activeColor : inactiveColor
              }
              _hover={{ textDecoration: "underline" }}
            >
              {item.label}
            </ChakraLink>
          ))}
          <Button
            onClick={handleSuggest}
            colorScheme="purple"
            size="sm"
            aria-label="Suggest me a recipe"
          >
            💡 Suggest
          </Button>
          <Button
            onClick={toggleColorMode}
            leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            variant="ghost"
            size="sm"
            colorScheme="gray"
          >
            {colorMode === "light" ? "Night Mode" : "Day Mode"}
          </Button>
        </Flex>

        {/* Mobiele hamburger */}
        <IconButton
          icon={<HamburgerIcon />}
          onClick={onOpen}
          aria-label="Open menu"
          display={{ base: "flex", md: "none" }}
          variant="ghost"
          mt={{ base: 2, md: 0 }}
        />
      </Flex>

      {/* Mobiele drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {navItems.map((item) => (
                <Button
                  as={Link}
                  to={item.path}
                  key={item.path}
                  onClick={onClose}
                  variant="ghost"
                  colorScheme={
                    location.pathname === item.path ? "teal" : "gray"
                  }
                  w="100%"
                  justifyContent="start"
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={() => {
                  handleSuggest();
                  onClose();
                }}
                colorScheme="purple"
                variant="ghost"
                w="100%"
                justifyContent="start"
              >
                💡 Suggest me a recipe
              </Button>
              <Button
                onClick={() => {
                  toggleColorMode();
                  onClose();
                }}
                leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                variant="ghost"
                w="100%"
                justifyContent="start"
              >
                {colorMode === "light" ? "Dark mode" : "Light mode"}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
