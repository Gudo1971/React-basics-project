import { Badge, Stack } from "@chakra-ui/react";

export const LabelBadges = ({ dietLabels = [], healthLabels = [] }) => {
  const allLabels = [
    ...dietLabels,
    ...(healthLabels.includes("Vegetarian") ? ["Vegetarian"] : []),
    ...(healthLabels.includes("Vegan") ? ["Vegan"] : []),
  ];

  return (
    <Stack direction="row" spacing={2} wrap="wrap" mb={4}>
      {allLabels.map((label) => (
        <Badge
          key={label}
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
      ))}
    </Stack>
  );
};
