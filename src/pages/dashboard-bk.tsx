import withAuth from "../components/common/hoc/withAuth";
import styled from "@emotion/styled";
import { Container, Grid, Button } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { useRouter } from "next/router";

const DashboardLayoutRoot = styled("div")(() => {
  return {
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    paddingTop: 64,
    paddingBottom: 64,
  };
});

function Dashboard(props) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("./login");
  };
  return (
    <DashboardLayoutRoot>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Button
              variant="contained"
              size="medium"
              onClick={(e) => handleLogout()}
            >
              Logout
            </Button>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} title="Total Budget" />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} title="Total Sales" />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayoutRoot>
  );
}

export default withAuth(Dashboard);

export async function getServerSideProps() {
  return {
    props: {},
  };
}
