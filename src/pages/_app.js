import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../utility/createEmotionCache";
import themeLight from "../styles/Theme/lighttheme";
import themeDark from "../styles/Theme/darktheme";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const [theme, setTheme] = useState(themeLight);
  const [themeMode, setThemMode] = useState("light");
  const toggleTheme = () => {
    setThemMode(themeMode === "light" ? "dark" : "light");
  };
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useEffect(() => {
    setTheme(themeMode === "light" ? themeLight : themeDark);
  }, [themeMode]);
  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component
          {...pageProps}
          toggleTheme={toggleTheme}
          themeMode={themeMode}
        />
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
