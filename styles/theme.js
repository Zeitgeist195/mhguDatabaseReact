import { createTheme } from "@mui/material/styles";
import { cyan, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: cyan[600],
      under: cyan[300],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;
