import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { ThemeToggler } from "../Theme/ThemeToggler";

export const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      // Post the values to the backend to create a user
      await axiosInstance.post("/users/create", values);
      toast({
        title: "Account created successfully.",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      // Handle error and show appropriate toast message
      const errorDetail = err.response?.data?.detail || "Something went wrong!";
      toast({
        title: errorDetail,
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue("gray.300", "gray.600")}
              type="email"
              size="lg"
              mt={6}
              {...register("email", {
                required: "This is required field",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/* Username input */}
          <FormControl isInvalid={errors.username}>
            <Input
              placeholder="Username"
              background={useColorModeValue("gray.300", "gray.600")}
              type="text"
              variant="filled"
              size="lg"
              mt={6}
              {...register("username", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                maxLength: {
                  value: 24,
                  message: "Username must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          {/* Password input */}
          <FormControl isInvalid={errors.password}>
            <Input
              placeholder="Password"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              size="lg"
              mt={6}
              {...register("password", {
                required: "This is required field",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Password must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/* Submit Button */}
          <Button
            isLoading={isSubmitting}
            loadingText="Creating account..."
            width="100%"
            colorScheme="green"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Register
          </Button>
        </form>

        {/* Theme Toggler */}
        <ThemeToggler showLabel={true} />

        {/* Login Button */}
        <Button
          onClick={() => navigate("/login", { replace: true })}
          width="100%"
          colorScheme="gray"
          variant="outline"
          mt={6}
        >
          Login Instead
        </Button>
      </Flex>
    </Flex>
  );
};
