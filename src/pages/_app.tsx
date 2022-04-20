import React, { useEffect, useState } from "react";
//import PropTypes from "prop-types";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Provider as NextAuthProvider } from "next-auth/client";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../utility/createEmotionCache";
import themeLight from "../styles/Theme/lighttheme";
import { AuthProvider } from "../components/common/auth/context/AuthContext";
import themeDark from "../styles/Theme/darktheme";
import "../styles/globals.css";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const [theme, setTheme] = useState(themeLight);
  const [themeMode, setThemMode] = useState(
    (typeof window !== "undefined" && localStorage.getItem("themeMode")) ||
      "light"
  );
  const toggleTheme = () => {
    setThemMode(themeMode === "light" ? "dark" : "light");
  };
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useEffect(() => {
    setTheme(themeMode === "light" ? themeLight : themeDark);
    typeof window !== "undefined" &&
      localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);
  return (
    <AuthProvider>
      <CacheProvider value={emotionCache}>
        <MuiThemeProvider theme={theme}>
          <NextAuthProvider session={pageProps.session}>
            <CssBaseline />
            <Component
              {...pageProps}
              toggleTheme={toggleTheme}
              themeMode={themeMode}
            />
          </NextAuthProvider>
        </MuiThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
};

export default MyApp;

// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   emotionCache: PropTypes.object,
//   pageProps: PropTypes.object.isRequired,
// };
