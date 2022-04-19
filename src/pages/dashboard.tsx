import { Grid, Container } from "@mui/material";
import GHButton from "../components/common/UI/GHButton";
import { useRouter } from "next/router";
import styles from "../styles/dashboard.module.scss";

function Dashboard() {
  const router = useRouter();
  return (
    <Container>
      <Grid container spacing={3}>
        <h1 className={styles.dashboardHeader}>
          I am dashboard, my style is driven through css modules
        </h1>
        <h2>We are styled button components driven by run time css</h2>
        <Grid item lg={12}>
          {" "}
          <GHButton
            variant="contained"
            height="100px"
            onClick={(e) => router.push("/login")}
          >
            Logout fat button
          </GHButton>
        </Grid>

        <Grid item lg={12}>
          {" "}
          <GHButton variant="contained" onClick={(e) => router.push("/login")}>
            Logout default Button
          </GHButton>
        </Grid>

        <Grid item lg={12}>
          <GHButton
            variant="contained"
            height="50px"
            onClick={(e) => router.push("/login")}
          >
            Logout Button with height of 50px{" "}
          </GHButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
