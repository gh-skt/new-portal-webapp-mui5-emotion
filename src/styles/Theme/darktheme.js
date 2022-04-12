import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "black",
        },
      },
    },
  },
});
