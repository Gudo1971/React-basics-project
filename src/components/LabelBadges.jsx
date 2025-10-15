import { Badge, Wrap, WrapItem, Box } from "@chakra-ui/react";

export const LabelBadges = ({ dietLabels = [], healthLabels = [] }) => {
  const allLabels = [
    ...dietLabels,
    ...(healthLabels.includes("Vegetarian") ? ["Vegetarian"] : []),
    ...(healthLabels.includes("Vegan") ? ["Vegan"] : []),
  ];

  return (
    <Box mt={6} mb={3}>
      <Wrap spacing={3}>
        {allLabels.map((label) => (
          <WrapItem key={label}>
            <Badge
              colorScheme={
                label === "Vegetarian"
                  ? "purple"
                  : label === "Vegan"
                  ? "green"
                  : "teal"
              }
              px={3}
              py={1}
              borderRadius="md"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="semibold"
              fontSize="sm"
            >
              {label}
            </Badge>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
