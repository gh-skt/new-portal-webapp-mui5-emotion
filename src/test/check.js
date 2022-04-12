import { Grid, Box, Container } from "@mui/material";
import styled from "@emotion/styled";

const stylesObject = {};

const BoxWrapper = styled(Box)(({ theme }) => {
  return {
    box: { bgcolor: "#cfe8fc", height: "100vh" },
  };
});

function Check() {
  return (
    <Grid>
      <Container maxWidth="sm">
        <Box sx={stylesObject.box}></Box>
      </Container>
    </Grid>
  );
}

export default Check;
