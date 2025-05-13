import {
  Select,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const Step2ThreatAnalysis = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem>
          <FormControl>
            <FormLabel>Anomaly Scores</FormLabel>
            <Input
              name="Anomaly_Scores"
              value={formData.Anomaly_Scores}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
              placeholder="34.67"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Traffic Type</FormLabel>
            <Select
              name="Traffic_Type"
              value={formData.Traffic_Type}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Traffic Type</option>
              <option value="HTTP">HTTP</option>
              <option value="DNS">DNS</option>
              <option value="FTP">FTP</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Payload Data</FormLabel>
            <Input
              name="Payload_Data"
              value={formData.Payload_Data}
              onChange={handleChange}
              placeholder="Enter Payload Data"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Malware Indicators</FormLabel>
            <Select
              name="Malware_Indicators"
              value={formData.Malware_Indicators}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Indicator</option>
              <option value="IoC Detected">IoC Detected</option>
              <option value="IoC Not Detected">IoC Not Detected</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Alerts/Warnings</FormLabel>
            <Select
              name="Alerts_Warnings"
              value={formData.Alerts_Warnings}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Alert Status</option>
              <option value="Alert Triggered">Alert Triggered</option>
              <option value="Not Triggered">Not Triggered</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Action Taken</FormLabel>
            <Select
              name="Action_Taken"
              value={formData.Action_Taken}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Action</option>
              <option value="Logged">Logged</option>
              <option value="Blocked">Blocked</option>
              <option value="Ignored">Ignored</option>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Step2ThreatAnalysis;
