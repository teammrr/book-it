import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#f5f9fc", // lightest
      100: "#e1e7ee",
      200: "#ccd6e2",
      300: "#b7c5d6",
      400: "#a3b4ca",
      500: "#8ea3be", // default color
      600: "#7a92b2",
      700: "#657fa5",
      800: "#506c99",
      900: "#3c598d", // darkest
    },
  },
});

export default customTheme;
