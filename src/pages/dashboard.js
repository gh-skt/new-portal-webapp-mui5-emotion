import { useState } from "react";
import { Typography, Pagination, Box } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Layout from "../components/Layout";
import CountTile from "../components/CountTile";
import DashboardHeader from "../components/DashboardHeader";
import DashboardListContainer from "../components/reports/DashboardListContainer";
import reports2 from "../mocks/reports.json";
import reports1 from "../mocks/reports2.json";
import styles from "../styles/dashboard.module.scss";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const DashBoardWrapper = styled(Box)(({}) => {
  return {
    "& .title": {
      fontSize: "1rem",
      textAlign: "center",
      marginTop: "40px",
      color: "#142840",
    },
    "& .requestCountTiles": {
      marginTop: "1.8rem",
      marginBottom: "5rem",
      display: "flex",
      justifyContent: "center",
    },
  };
});

const Dashboard = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const allReports = [reports1, reports2, reports1, reports2, reports1];
  const count =
    allReports.length % 4 === 0
      ? allReports.length / 4
      : Math.floor(allReports.length / 4) + 1;
  const DashboardListContent = allReports.map((reports, index) => (
    <DashboardListContainer
      key={index}
      reports={reports}
      showTable={index % 4 === 0}
    />
  ));
  const [paginatedPatientReport, setPaginatedPatientReport] = useState(
    DashboardListContent.slice(0, 4)
  );
  const handleChange = (event, value) => {
    setPage(value);
    setPaginatedPatientReport(() => {
      const paginatedReport = DashboardListContent.slice(
        (value - 1) * 4,
        value * 4
      );
      return paginatedReport;
    });
  };
  const [selectedTile, setSelectedTile] = useState("new");
  const tileClickHandler = (tile) => {
    setSelectedTile(tile);
  };
  const {
    query: { status },
  } = useRouter();
  console.log("inside dashboard", status);
  return (
    <DashBoardWrapper>
      <Layout>
        <Head>
          <title>Guardant Health</title>
          <link
            rel="icon"
            href="https://portal-sqa.guardanthealth.com/assets/favicon-204343dd7dfea0d717bb78198114a04d3083d814c5ba2ba70463bbb60e016c1d.ico"
          />
        </Head>

        <div className={styles.dashboardContainer} id="MainDashboardHeader">
          <DashboardHeader status={status} />
          <div id="patientReportStatus">
            <Typography className="title" id="PatientReportsTitle">
              {t("dashboard:View patients by report status")}
            </Typography>
            <div className="requestCountTiles" id="requestCount">
              <CountTile
                handleClick={tileClickHandler}
                selected={selectedTile === "new"}
                count="3"
                label="new"
                url=""
              />
              <CountTile
                handleClick={tileClickHandler}
                selected={selectedTile === "read"}
                count="0"
                label="read"
                url=""
              />
              <CountTile
                handleClick={tileClickHandler}
                selected={selectedTile === "inProgress"}
                count="4"
                label="inProgress"
                url=""
              />
            </div>
          </div>
          <div className="dashboardListContainer">
            <div className="root">
              <Typography>{paginatedPatientReport}</Typography>
              <Pagination
                style={{ display: "flex", justifyContent: "center" }}
                count={count}
                page={page}
                color="primary"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </Layout>
    </DashBoardWrapper>
  );
};
export default Dashboard;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
