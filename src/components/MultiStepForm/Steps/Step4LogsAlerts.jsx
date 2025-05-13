import {
  Input,
  Select,
  VStack,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const Step4LogsAlerts = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl>
            <FormLabel>Firewall Logs</FormLabel>
            <Select
              name="Firewall_Logs"
              value={formData.Firewall_Logs}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Firewall Log</option>
              <option value="Log Data">Log Data</option>
              <option value="No Log">No Log</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>IDS/IPS Alerts</FormLabel>
            <Select
              name="IDS_IPS_Alerts"
              value={formData.IDS_IPS_Alerts}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select IDS/IPS Alert</option>
              <option value="Alert Data">Alert Data</option>
              <option value="No Data">No Data</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Attack Signature</FormLabel>
            <Select
              name="Attack_Signature"
              value={formData.Attack_Signature}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              focusBorderColor="green.500"
            >
              <option value="">Select Attack Signature</option>
              <option value="Known Pattern A">Known Pattern A</option>
              <option value="Known Pattern B">Known Pattern B</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Log Source</FormLabel>
            <Select
              name="Log_Source"
              value={formData.Log_Source}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Log Source</option>
              <option value="Server">Server</option>
              <option value="Firewall">Firewall</option>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Step4LogsAlerts;
