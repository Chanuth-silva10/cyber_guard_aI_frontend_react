import {
  Button,
  Center,
  Container,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { AddUpdateTypeModal } from "./AddUpdateTypeModal";

export const TypeDetail = () => {
  const [type, setType] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { Id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const background = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    if (isMounted.current) return;
    fetchType();
    isMounted.current = true;
  }, [Id]);

  const fetchType = () => {
    setLoading(true);
    axiosInstance
      .get(`/type/${Id}`)
      .then((res) => {
        setType(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const delateType = () => {
    setLoading(true);
    axiosInstance
      .delete(`/type/${Id}`)
      .then(() => {
        toast({
          title: "Attack Type deleted successfully",
          status: "success",
          isClosable: true,
          diration: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Could'nt delete Details",
          status: "error",
          isClosable: true,
          diration: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Container mt={6}>
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Container mt={6}>
        <Button
          colorScheme="gray"
          onClick={() => navigate("/", { replace: true })}
        >
          Back
        </Button>
      </Container>
      <Container
        bg={background}
        minHeight="7rem"
        my={3}
        p={3}
        rounded="lg"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={22}>{type.title}</Text>
        <Text bg="gray.500" mt={2} p={2} rounded="lg">
          {type.description}
        </Text>
        <AddUpdateTypeModal
          my={3}
          editable={true}
          defaultValues={{
            title: type.title,
            description: type.description,
            status: type.status,
          }}
          onSuccess={fetchType}
        />
        <Button
          isLoading={loading}
          colorScheme="red"
          width="100%"
          onClick={delateType}
        >
          Delete
        </Button>
      </Container>
    </>
  );
};
