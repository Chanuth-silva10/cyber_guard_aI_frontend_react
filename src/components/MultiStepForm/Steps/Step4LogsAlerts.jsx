import { Input, Select, VStack, FormControl, FormLabel, Grid, GridItem } from "@chakra-ui/react";

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
            <Input
              name="Firewall_Logs"
              value={formData.Firewall_Logs}
              onChange={handleChange}
              placeholder="Enter Firewall Logs"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>IDS/IPS Alerts</FormLabel>
            <Input
              name="IDS_IPS_Alerts"
              value={formData.IDS_IPS_Alerts}
              onChange={handleChange}
              placeholder="Enter IDS/IPS Alerts"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Log Source</FormLabel>
            <Select
              name="Log_Source"
              value={formData.Log_Source}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Log Source</option>
              <option value="Firewall">Firewall</option>
              <option value="IDS/IPS">IDS/IPS</option>
              <option value="SIEM">SIEM</option>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Step4LogsAlerts;
