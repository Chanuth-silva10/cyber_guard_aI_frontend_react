import { Badge, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const TypeCard = ({ type }) => {
  const navigate = useNavigate();
  return (
    <Flex
      bg={useColorModeValue("gray.300", "gray.600")}
      minHeight="3rem"
      my={3}
      p={3}
      rounded="lg"
      alignItems="center"
      justifyContent="space-between"
      _hover={{
        opacity: 0.9,
        cursor: "pointer",
        transform: "translateY(-3px)",
      }}
      onClick={() => navigate(`/${type.type_id}`, { replace: true })}
    >
      <Text>{type.title}</Text>
      <Badge colorScheme={type.status ? "green" : "purple"}>
        {type.status ? "Complete" : "Pending"}
      </Badge>
    </Flex>
  );
};
