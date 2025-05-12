import { Input, Select, VStack, FormControl, FormLabel, Grid, GridItem } from "@chakra-ui/react";

const Step3UserDeviceInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl>
            <FormLabel>User Information</FormLabel>
            <Input
              name="User_Information"
              value={formData.User_Information}
              onChange={handleChange}
              placeholder="Enter User Info"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Device Information</FormLabel>
            <Input
              name="Device_Information"
              value={formData.Device_Information}
              onChange={handleChange}
              placeholder="Enter Device Info"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Network Segment</FormLabel>
            <Select
              name="Network_Segment"
              value={formData.Network_Segment}
              onChange={handleChange}
              focusBorderColor="green.500"
            >
              <option value="">Select Network Segment</option>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="DMZ">DMZ</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel>Geo-location Data</FormLabel>
            <Input
              name="Geo_location_Data"
              value={formData.Geo_location_Data}
              onChange={handleChange}
              placeholder="Enter Location"
              focusBorderColor="green.500"
            />
          </FormControl>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Step3UserDeviceInfo;
