import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system", //  volgt systeemvoorkeur
  useSystemColorMode: true, //  activeert systeemdetectie
};

const theme = extendTheme({ config });

export default theme;
