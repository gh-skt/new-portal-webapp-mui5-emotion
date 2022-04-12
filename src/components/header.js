import React, { useEffect, useState } from "react";
import {
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
  AppBar,
  Menu,
  Box,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import styled from "@emotion/styled";
import { signOut, useSession } from "next-auth/client";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import HamburgerMenu from "./HamburgerMenu";
import LanguageSelect from "./LanguageSelect";
import Navigation from "./Navigation";

const HeaderWrapper = styled(Box)(({ theme }) => {
  return {
    "& .root": {
      flexGrow: 2,
    },
    "& .header": {
      backgroundColor: "#ffffff",
      color: "#8B939C",
      boxShadow: "none",
    },
    "& .brandImage": {
      flexGrow: 2,
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
    "& .userProfile": {
      flexGrow: 2,
      textAlign: "right",
      display: "inline-flex",
      placeContent: "flex-end",
    },
    "& .menuItem": {
      color: "#8B939C",
    },
    "& .login": {
      color: "#8B939C",
    },
  };
});

const Header = () => {
  const [session] = useSession();
  const authUser = session && session.user.name;
  const [userInfo, setUserInfo] = useState("user");
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
  }, []);
  useEffect(() => {
    setAnchorEl(null);
  }, [isMatch]);

  const logout = async () => {
    // localStorage.removeItem("userInfo");
    // logOut();
    // let callbackUrl = "/" + (router.locale !== "en-US" ? router.locale : "");
    // const authURL = `https://guardant.oktapreview.com/login/signout?fromURI=${location.origin}/login`;
    // await router.push(authURL);
    // await signOut({ redirect: false });
    router.push('./login');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuHandleClick = (page) => {
    setAnchorEl(null);
    router.push(`/${page}`);
  };
  return (
    <HeaderWrapper>
        <header className="root">
          <AppBar position="sticky" className="header" id="AppBar">
            <Toolbar>
              {isMatch && session ? (
                <>
                  <HamburgerMenu userInfo={userInfo} authUser={authUser} />
                  <div className="brandImage" id="GuardantLogo">
                    <img
                      alt="Guardant-Logo"
                      height="32"
                      className="brandImage"
                      src="../guardant-logo-with-text-564a398b2f545f7fb2a1c9e82542da7704e6d255991469e9806fb7147aa34ce6.svg"
                    />
                  </div>
                  <div>
                    <LanguageSelect />
                  </div>
                </>
              ) : (
                <>
                  <div className="brandImage" id="GuardantLogo">
                    <img
                      alt="Guardant-Logo"
                      height="32"
                      className="brandImage"
                      src="../guardant-logo-with-text-564a398b2f545f7fb2a1c9e82542da7704e6d255991469e9806fb7147aa34ce6.svg"
                    />
                  </div>
                  {session && (
                    <div>
                      <Navigation userInfo={userInfo} />
                    </div>
                  )}
                  <div className="userProfile">
                    <LanguageSelect />
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      classes={{
                        label: "iconButtonLabel",
                        root: "iconButton",
                      }}
                    >
                      <div className="iconButtonLabel">{authUser}</div>
                      <AccountCircle style={{ marginLeft: 10 }} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      style={{ marginTop: "60px" }}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      classes={{
                        list: "menuItem",
                      }}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem onClick={() => onMenuHandleClick("profile")}>
                        {t("common:profile")}
                      </MenuItem>
                      {userInfo?.accessInfo?.authorities?.featureClaims
                        ?.Settings && (
                        <MenuItem onClick={() => onMenuHandleClick("setting")}>
                          {t("common:settings")}
                        </MenuItem>
                      )}
                      <MenuItem onClick={() => onMenuHandleClick("help")}>
                        {t("common:help")}
                      </MenuItem>
                      <MenuItem onClick={() => onMenuHandleClick("TAndC")}>
                        {t("common:TAndC")}
                      </MenuItem>
                      <MenuItem onClick={() => logout()}>
                        {t("common:logout")}
                      </MenuItem>
                    </Menu>
                  </div>
                </>
              )}
            </Toolbar>
          </AppBar>
        </header>
    </HeaderWrapper>
  );
};
export default Header;
