import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box minHeight="100vh">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg={useColorModeValue("green.300", "green.600")}
        color="white"
      >
        <Text as="h2" fontSize={24} fontWeight="bold">
          CyberGuard AI
        </Text>
        <Stack direction="row" align="center" spacing={4}>
          <ThemeToggler size="lg" />
          <Button colorScheme="green" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button colorScheme="green" onClick={() => navigate("/prediction")}>
            Prediction
          </Button>
          <Button onClick={logout} colorScheme="green">
            Logout
          </Button>
        </Stack>
      </Flex>
      <Outlet />
    </Box>
  );
};
