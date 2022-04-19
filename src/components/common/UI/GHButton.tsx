import { Button } from "@mui/material";
import styled from "@emotion/styled";

const GHButton = styled(Button)((props: any) => {
  const { theme } = props;
  const { height = "auto" } = props;
  return {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(#007dc1,#0073b2)",
    borderColor: "#004b75 #004b75 #00456a",
    boxShadow: "0 1px 0 rgba(0,0,0,.15),inset 0 1px 0 0 hsla(0,0%,100%,.1)",
    height: height,
  };
});

export default GHButton;
