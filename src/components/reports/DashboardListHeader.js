import { useState } from "react";
import { IconButton, Grid, Paper,Box } from "@mui/material";
import styled from "@emotion/styled";
import GridOnIcon from "@mui/icons-material/GridOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const DashBoardWrapper = styled(Box)(({ theme }) => {
  return {
    "& .root": {
      flexGrow: 1,
    },
    "& .paper": {
      padding: theme.spacing(2),
      backgroundColor: "transparent",
      color: theme.palette.text.secondary,
      boxShadow: "none",
      paddingLeft: "0",
      fontSize: "0.8rem",
    },
    "& .viewTable": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& .iconButtonLabel": {
      fontSize: "1rem",
      marginLeft: "0.5rem",
      color: "#8B939C",
      "&:hover": {
        color: "#1A5EA7",
      },
    },
    "& .iconButton": {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    "& .iconButtonFloat": {
      float: "right",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  };
});

const DashboardListHeader = (props) => {
  const { t } = useTranslation("dashboard");
  const { reportOpenHandler, showTable } = props;
  const [expandReport, setExpandReport] = useState(true);
  const reportRequestOpenClose = () => {
    setExpandReport(!expandReport);
    reportOpenHandler(!expandReport);
  };
  const router = useRouter();
  return (
    <DashBoardWrapper>
      <Grid container id="ReportGrid" xs={12}>
        <Grid item xs={12} md={6}>
          <Paper className="paper">
            <IconButton
              classes={{
                label: "iconButtonLabel",
                root: "iconButton",
              }}
              onClick={() => reportRequestOpenClose()}
            >
              {expandReport ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
              Burton, Jack (Southern Oncology Specialists)
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={6} className="viewTable">
          <Paper className="paper">
            {showTable && (
              <IconButton
                classes={{
                  label: "iconButtonLabel",
                  root: "iconButtonFloat",
                }}
                size="small"
                onClick={() => {
                  router.push(`${router.route}/requests`);
                }}
              >
                <GridOnIcon style={{ marginRight: "10px" }} />
                {t("viewAllReportsInTable")}
              </IconButton>
            )}
          </Paper>
        </Grid>
      </Grid>
    </DashBoardWrapper>
  );
};
export default DashboardListHeader;
