import { FormLabel, Switch, useColorMode } from "@chakra-ui/react";

export const ThemeToggler = ({ showLabel = false, ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <>
      {showLabel && (
        <FormLabel htmlFor="theme-toggler" mb={0}>
          Enable Light Theme
        </FormLabel>
      )}
      <Switch
        id="theme-toggler"
        size="sm"
        isChecked={colorMode === "light"}
        isDisabled={false}
        value={colorMode}
        colorScheme="green"
        mr={2}
        onChange={toggleColorMode}
        {...rest}
      />
    </>
  );
};
