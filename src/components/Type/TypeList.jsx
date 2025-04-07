import { Box, Center, Container, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { AddUpdateTypeModal } from "./AddUpdateTypeModal";
import { TypeCard } from "./TypeCard";

export const TypeList = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchTypes();
    isMounted.current = true;
  }, []);

  const fetchTypes = () => {
    setLoading(true);
    axiosInstance
      .get("/type/")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container mt={9}>
      <AddUpdateTypeModal onSuccess={fetchTypes} />
      {loading ? (
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      ) : (
        <Box mt={6}>
          {types?.map((type) => (
            <TypeCard type={type} key={type.id} />
          ))}
        </Box>
      )}
    </Container>
  );
};
