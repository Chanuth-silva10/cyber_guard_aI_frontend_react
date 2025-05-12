import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Progress,
  Text,
  useColorModeValue,
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { FaNetworkWired, FaShieldAlt, FaUser, FaFileAlt } from "react-icons/fa";
import axiosInstance from "../../services/axios";
import Step1NetworkData from "./Steps/Step1NetworkData";
import Step2ThreatAnalysis from "./Steps/Step2ThreatAnalysis";
import Step3UserDeviceInfo from "./Steps/Step3UserDeviceInfo";
import Step4LogsAlerts from "./Steps/Step4LogsAlerts";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    Timestamp: "",
    Source_IP_Address: "",
    Destination_IP_Address: "",
    Source_Port: "",
    Destination_Port: "",
    Protocol: "",
    Packet_Length: "",
    Packet_Type: "",
    Anomaly_Scores: "",
    Traffic_Type: "",
    Payload_Data: "",
    Malware_Indicators: "",
    Alerts_Warnings: "",
    Action_Taken: "",
    Severity_Level: "",
    User_Information: "",
    Device_Information: "",
    Network_Segment: "",
    Geo_location_Data: "",
    Firewall_Logs: "",
    IDS_IPS_Alerts: "",
    Log_Source: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prediction, setPrediction] = useState({ attackType: "", severity: "" });
  const toast = useToast();

  const steps = [
    { label: "Network Data", icon: FaNetworkWired, component: <Step1NetworkData formData={formData} setFormData={setFormData} /> },
    { label: "Threat Analysis", icon: FaShieldAlt, component: <Step2ThreatAnalysis formData={formData} setFormData={setFormData} /> },
    { label: "User & Device Info", icon: FaUser, component: <Step3UserDeviceInfo formData={formData} setFormData={setFormData} /> },
    { label: "Logs & Alerts", icon: FaFileAlt, component: <Step4LogsAlerts formData={formData} setFormData={setFormData} /> },
  ];

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  /**
   * Submit form data to backend and log the payload.
   */
  const handleSubmit = async () => {
    console.log("%cForm Data Payload:", "color: #48bb78; font-weight: bold;", formData);

    try {
      const response = await axiosInstance.post("/data/submit", formData);

      console.log("%cBackend Response:", "color: #3182ce; font-weight: bold;", response.data);

      toast({
        title: "Data submitted successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      const severityLevels = ["Low", "Medium", "High", "Critical"];
      const attackTypes = ["Malware", "DDoS", "Phishing", "SQL Injection", "Ransomware"];

      const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
      const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];

      setPrediction({ attackType, severity });
      onOpen();

    } catch (error) {
      console.error("%cSubmission Error:", "color: #e53e3e; font-weight: bold;", error);

      toast({
        title: "Error submitting data.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const progressValue = (currentStep / steps.length) * 100;

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Flex justify="center" align="center" minH="100vh" bg={bgColor} p={6}>
      <Box bg={cardBg} p={8} rounded="lg" shadow="lg" width="850px" maxWidth="100%">
        <Flex justify="center" align="center" mb={6}>
          <Heading as="h2" size="lg" color="green.400">
            Cyber Analysis
          </Heading>
        </Flex>

        <HStack justify="space-between" mb={4}>
          {steps.map((step, index) => (
            <Flex key={index} direction="column" align="center">
              <Icon as={step.icon} boxSize={6} color={currentStep === index + 1 ? "green.500" : "gray.400"} />
              <Text>{step.label}</Text>
            </Flex>
          ))}
        </HStack>

        <Progress value={progressValue} colorScheme="green" mb={6} />

        <VStack spacing={6}>
          {steps[currentStep - 1].component}
        </VStack>

        <Flex mt={6} justify="space-between">
          <Button onClick={handleBack} isDisabled={currentStep === 1}>
            Back
          </Button>
          {currentStep === steps.length ? (
            <Button colorScheme="green" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button colorScheme="green" onClick={handleNext}>
              Next
            </Button>
          )}
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prediction Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              **Predicted Attack Type:**{" "}
              <Badge colorScheme="red">{prediction.attackType}</Badge>
            </Text>
            <Text>
              **Severity Level:**{" "}
              <Badge colorScheme={prediction.severity === "Critical" ? "red" : "green"}>
                {prediction.severity}
              </Badge>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MultiStepForm;
