import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}: any) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%,${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600 `} padding="40px" align="end">
        <Box padding="20px">
          <Image
            alt="profile"
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="50px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="sm" fontWeight="bold">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
