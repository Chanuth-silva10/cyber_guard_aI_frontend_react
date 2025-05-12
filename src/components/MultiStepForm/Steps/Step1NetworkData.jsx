import { Select, Input, VStack, FormControl, FormLabel, Grid, GridItem } from "@chakra-ui/react";

const Step1NetworkData = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem>
          <FormControl>
            <FormLabel>Timestamp</FormLabel>
            <Input
              name="Timestamp"
              value={formData.Timestamp}
              onChange={handleChange}
              type="datetime-local"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Source IP</FormLabel>
            <Input
              name="Source_IP_Address"
              value={formData.Source_IP_Address}
              onChange={handleChange}
              placeholder="Enter Source IP"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Destination IP</FormLabel>
            <Input
              name="Destination_IP_Address"
              value={formData.Destination_IP_Address}
              onChange={handleChange}
              placeholder="Enter Destination IP"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Source Port</FormLabel>
            <Input
              name="Source_Port"
              value={formData.Source_Port}
              onChange={handleChange}
              type="number"
              min="1"
              max="65535"
              placeholder="Enter Source Port"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Destination Port</FormLabel>
            <Input
              name="Destination_Port"
              value={formData.Destination_Port}
              onChange={handleChange}
              type="number"
              min="1"
              max="65535"
              placeholder="Enter Destination Port"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Protocol</FormLabel>
            <Select
              name="Protocol"
              value={formData.Protocol}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Protocol</option>
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
              <option value="ICMP">ICMP</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Packet Length</FormLabel>
            <Input
              name="Packet_Length"
              value={formData.Packet_Length}
              onChange={handleChange}
              type="number"
              min="1"
              placeholder="Enter Packet Length"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Packet Type</FormLabel>
            <Select
              name="Packet_Type"
              value={formData.Packet_Type}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Packet Type</option>
              <option value="Data">Data</option>
              <option value="Control">Control</option>
              <option value="Management">Management</option>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Step1NetworkData;
