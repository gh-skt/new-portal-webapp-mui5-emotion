import React, { useState } from "react";
import {
  Toolbar,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";
import GetAppIcon from "@mui/icons-material/GetApp";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import useTranslation from "next-translate/useTranslation";
import SearchInput from "./SearchInput";

const DashBoardHeaderWrapper = styled(Box)(({ theme, status }) => {
  console.log("status inside Dash wrapper Header", status);
  const changeColors = () => {
    let colorCode;
    switch (status) {
      case "warning":
        colorCode = theme.palette.warning.main;
        break;
      case "primary":
        colorCode = theme.palette.primary.main;
        break;
      case "secondary":
        colorCode = theme.palette.secondary.main;
        break;
      case "error":
        colorCode = theme.palette.error.main;
        break;
      case "info":
        colorCode = theme.palette.info.main;
        break;
      case "success":
        colorCode = theme.palette.success.main;
        break;
      default:
        colorCode = theme.palette.success.main;
    }
    return colorCode;
  };
  return {
    "& .SearchBar": {
      width: "60%",
      height: "50px",
      borderRight: "1px solid #EEEFF1",
      [theme.breakpoints.down("xs")]: {
        // width: '100%',
        // borderRight: '0',
      },
    },
    "& .exportResults": {
      flexGrow: 2,
      textAlign: "center",
      height: "50px",
      borderRight: "1px solid #EEEFF1",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .c": {
      flexGrow: 2,
      textAlign: "center",
      // [theme.breakpoints.down('xs')]: {
      //   display: 'none',
      // },
    },
    "& .resultButton": {
      padding: "0",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    "& .iconButtonLabel": {
      fontSize: "1rem",
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
    "& .dashboardSearchButtons": {
      backgroundColor: changeColors(),
      height: "50px",
      width: "100%",
      boxShadow: "0px 1px 0 0 rgb(0 0 0 / 10%)",
      borderRadius: "4px",
    },
    "& .paper": {
      minWidth: "200px",
      borderRadius: 1,
      marginTop: 50,
    },
  };
});

const DashboardHeader = ({ status }) => {
  console.log("status inside Dash Header", status);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <DashBoardHeaderWrapper status={status}>
      <div className="dashboardSearchButtons">
        <Toolbar className="dashboardToolBar">
          <div className="SearchBar">
            <SearchInput />
          </div>
          <div className="exportResults">
            <Button
              aria-controls="Export - Results"
              className="resultButton"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <IconButton
                aria-label="download"
                classes={{
                  label: "iconButtonLabel",
                  root: "iconButton",
                }}
              >
                <GetAppIcon style={{ marginRight: 10 }} />
                {t("dashboard:exportResults")}
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
                {t("common:downloadExcel")}
              </MenuItem>
            </Menu>
          </div>
          <div className="grantButton">
            <Button
              aria-controls="Grant Access"
              className="resultButton"
              aria-haspopup="true"
            >
              <IconButton
                aria-label="model"
                classes={{
                  label: "iconButtonLabel",
                  root: "iconButton",
                }}
              >
                <LockOpenIcon style={{ marginRight: 10 }} />
                {t("dashboard:grantAccess")}
              </IconButton>
            </Button>
          </div>
        </Toolbar>
      </div>
    </DashBoardHeaderWrapper>
  );
};
export default DashboardHeader;
