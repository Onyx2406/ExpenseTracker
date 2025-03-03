import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Light blue
    },
    secondary: {
      main: "#f50057", // Pink
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
});

export default theme;
