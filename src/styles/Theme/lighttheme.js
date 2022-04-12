import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#EEEFF1",
        },
      },
    },
  },
});
