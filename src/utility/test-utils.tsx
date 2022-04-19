import React from "react";
import "@testing-library/jest-dom";
import { RenderResult } from "@testing-library/react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider as NextAuthProvider } from "next-auth/client";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {AuthProvider} from "../components/common/auth/context/AuthContext";
import createEmotionCache from "./createEmotionCache";
//import themeLight from "../src/styles/Theme/lighttheme";

import { createTheme } from "@mui/material";

const theme = createTheme({});
interface AllTheProvidersProps {
  children?: any;
}

const clientSideEmotionCache = createEmotionCache();

const AllProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <NextAuthProvider session={{}}>
            <CssBaseline />
            {children}
          </NextAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

const customRender = (ui: any, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
