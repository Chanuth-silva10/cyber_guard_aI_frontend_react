import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  useColorModeValue,
  useDisclosure,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import Papa from "papaparse";
import { useState, useEffect } from "react";

export const AddUpdateTypeModal = ({
  editable = false,
  defaultValues = {},
  onSuccess = () => {},
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({});
  const [fileUploaded, setFileUploaded] = useState(false);

  const inputBackground = useColorModeValue("gray.300", "gray.600");

  const toast = useToast();
  const { Id } = useParams();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  useEffect(() => {
    if (fileUploaded) {
      Object.entries(formValues).forEach(([field, value]) => {
        setValue(field, value);
      });
    }
  }, [fileUploaded, formValues, setValue]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid CSV file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length === 0) {
          toast({
            title: "Empty CSV",
            description: "The CSV file has no data.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        // Filter out keys like '_1', '_2', etc.
        const validColumns = Object.fromEntries(
          Object.entries(results.data[0]).filter(
            ([key]) => !key.startsWith("_")
          )
        );

        setFormValues(validColumns); // Set only valid columns
        setFileUploaded(true);
      },
      error: () => {
        toast({
          title: "Parsing Error",
          description: "Failed to parse the CSV file.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const onSubmit = async (values) => {
    try {
      if (editable) {
        await axiosInstance.put(`/type/${Id}`, values);
      } else {
        await axiosInstance.post(`/type/create/`, values);
      }
      toast({
        title: editable ? "Attack Type Revised" : "Attack Type Check",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  return (
    <Box {...rest}>
      <Button w="100%" colorScheme="green" onClick={onOpen}>
        {editable ? "UPDATE CYBER ATTACK" : "CHECK CYBER ATTACK"}
      </Button>
      <Modal
        closeOnOverlayClick={false}
        size="7xl"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>
              {editable ? "UPDATE CYBER ATTACK" : "CHECK CYBER ATTACK"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* CSV File Upload Section */}
              <FormControl>
                <FormLabel>Upload CSV File</FormLabel>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  mb={4}
                />
              </FormControl>

              {/* Dynamically render text boxes based on CSV content */}
              {fileUploaded && Object.keys(formValues).length > 0 && (
                <>
                  {/* Grouping fields in a grid layout */}
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing={2}>
                    {Object.entries(formValues).map(([field, value]) => (
                      <FormControl key={field} isInvalid={errors[field]}>
                        <FormLabel textTransform="capitalize">{field}</FormLabel>
                        <Input
                          value={value}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          placeholder={field}
                          background={inputBackground}
                          type="text"
                          variant="filled"
                          size="lg"
                        />
                        <FormErrorMessage>{errors[field]?.message}</FormErrorMessage>
                      </FormControl>
                    ))}
                  </SimpleGrid>
                </>
              )}

              {/* Example of status switch
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <FormControl mt={6} display="flex" alignItems="center">
                    <FormLabel htmlFor="is-done">Status</FormLabel>
                    <Switch
                      onChange={(e) => field.onChange(e.target.checked)}
                      isChecked={field.value}
                      id="id-done"
                      size="lg"
                      name="status"
                      colorScheme="green"
                      variant="ghost"
                    />
                  </FormControl>
                )}
              /> */}
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting}>
                  Close
                </Button>

                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={editable ? "Updating" : "Creating"}
                >
                  {editable ? "Update" : "Create"}
                </Button>

                <Button
                  colorScheme="blue"
                  onChange={handleFileChange}
                  isLoading={false}
                  loadingText="Uploading"
                >
                  Upload
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
