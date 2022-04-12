import {Grid,Box} from "@mui/material";
import styled from "@emotion/styled";
import DashboardListItem from "./DashboardListItem";

const DashListWrapper = styled(Box)(({  }) => {
  return {
    "& .root": {
      height: "70px",
      backgroundColor: "#ffffff",
      fontSize: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .showReports": {
      textAlign: "center",
    },
  };
});


const DashboardList = (props) => {
  const {
    reports: { requests },
    expandReport,
  } = props;
  const reportListContainer = requests.map((request,index) => (
    <DashboardListItem key={index} {...{ request, expandReport }} />
  ));
  return (
    <DashListWrapper>
      <div>
        {expandReport ? (
          <>{reportListContainer}</>
        ) : (
          <div className="root">
            <Grid container>
              <Grid item xs={12} className="showReports">
                Show Reports
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </DashListWrapper>
  );
};
export default DashboardList;
