import React, { useState } from "react";
import { Button, Grid, Menu, MenuItem,Box, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useTranslation from "next-translate/useTranslation";

const DashBoardListItemWrapper = styled(Box)(({ theme }) => {
  return {
    "& .root": {
      flexGrow: 1,
      backgroundColor: "#ffffff",
      minHeight: "100px",
      padding: "1.5rem 2rem 0rem",
      marginBottom: "0.5rem",
      fontSize: "0.8rem",
      paddingBottom: "10px",
    },
    "& .showReportsContainer": {
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
    "& .listItemContainer": {
      padding: "1rem 1rem",
    },
    "& .exportResults": {
      display: "flex",
    },
    "& .reportDateSts": {},
    "& .paper": {
      minWidth: "200px",
      borderRadius: 1,
    },
    "& .iconButtonDownload": {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    "& .iconButtonOptions": {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    "& .report": {},
    "& .resultButton": {
      padding: "0",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    "& .gridItem": {
      [theme.breakpoints.down("sm")]: {
        margin: "5px 0px !important",
      },
    },
    "& .gridContainer": {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
    "& .actionsButtons": {
      [theme.breakpoints.down("sm")]: {
        position: "relative",
      },
    },
    "& .actionsButtonsGrid": {
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        right: "-30px",
        top: "-20px",
      },
    },
    "& .buttonLabel": {
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
  };
});
const DashboardListItem = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElDownload, setAnchorElDownload] =useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDownloadClick = (event) => {
    setAnchorElDownload(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElDownload(null);
  };
  const displayReport = () => {};
  const {
    request,
    request: { report },
  } = props;
  return (
    <DashBoardListItemWrapper>
      <div className="root" id="ReportGrid">
        <Grid
          container
          spacing={1}
          onClick={displayReport}
          id="reportContainer"
        >
          <Grid item xs={6} md={8}>
            <Grid container classes={{ container: "gridContainer" }}>
              <Grid item xs={12} md={4} className="gridItem" justify="center">
                {report.patientNameFormatted}
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                classes={{ root: "report", item: "gridItem" }}
              >
                {report.cancerType}
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                classes={{
                  root: "reportDateSts",
                  item: "gridItem",
                }}
              >
                {report.reportDateStatus}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} md={2}>
            <div dangerouslySetInnerHTML={{ __html: request.trm }} />
          </Grid>
          <Grid item xs={3} md={2} className="actionsButtons">
            <Grid container id="ReportDownload" className="actionsButtonsGrid">
              <Grid item xs={6}>
                <Button
                  aria-controls="Export - Results"
                  classes={{
                    root: "resultButton",
                    label: "buttonLabel",
                  }}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <IconButton
                    aria-label="download"
                    classes={{ root: "iconButtonDownload" }}
                  >
                    <GetAppIcon />
                  </IconButton>
                </Button>
                <Menu
                  id="Download"
                  anchorEl={anchorEl}
                  classes={{ paper: "paper" }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    {request.report.downloadable
                      ? `${t("common:download")} :`
                      : null}{" "}
                  </MenuItem>
                  {request.report.urls.map((val) => {
                    return (
                      <>
                        <MenuItem onClick={handleClose}>
                          {val.display_name}
                        </MenuItem>
                      </>
                    );
                  })}
                </Menu>
              </Grid>
              <Grid item xs={6}>
                <Button
                  aria-controls="Export - Results"
                  className="resultButton"
                  aria-haspopup="true"
                  onClick={handleDownloadClick}
                >
                  <IconButton
                    aria-label="download"
                    classes={{ root: "iconButtonOptions" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Button>
                <Menu
                  id="Report"
                  anchorEl={anchorElDownload}
                  classes={{ paper: "paper" }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElDownload)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    {t("common:move to")} :
                  </MenuItem>
                  <MenuItem onClick={handleClose}>{t("common:read")}</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </DashBoardListItemWrapper>
  );
};
export default DashboardListItem;
