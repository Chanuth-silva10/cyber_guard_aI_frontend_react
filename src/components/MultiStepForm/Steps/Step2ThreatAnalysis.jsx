import { Select, Input, VStack, FormControl, FormLabel, Grid, GridItem } from "@chakra-ui/react";

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
              placeholder="Enter Anomaly Score"
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
              <option value="Normal">Normal</option>
              <option value="Malicious">Malicious</option>
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
              <option value="None">None</option>
              <option value="Malicious IP">Malicious IP</option>
              <option value="Suspicious Payload">Suspicious Payload</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Alerts/Warnings</FormLabel>
            <Input
              name="Alerts_Warnings"
              value={formData.Alerts_Warnings}
              onChange={handleChange}
              placeholder="Enter Alerts/Warnings"
              focusBorderColor="green.500"
            />
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
              <option value="Blocked">Blocked</option>
              <option value="Allowed">Allowed</option>
              <option value="Quarantined">Quarantined</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem colSpan={3}>
          <FormControl>
            <FormLabel>Severity Level</FormLabel>
            <Select
              name="Severity_Level"
              value={formData.Severity_Level}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Severity Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Step2ThreatAnalysis;
