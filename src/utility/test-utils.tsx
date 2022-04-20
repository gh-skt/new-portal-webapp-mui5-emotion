import React from "react";
import "@testing-library/jest-dom";
import { RenderResult } from "@testing-library/react";
import { render, RenderOptions } from "@testing-library/react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "./createEmotionCache";
import 'mutationobserver-shim';

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
            <CssBaseline />
            {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

const customRender =  (ui: any, options?: RenderOptions): RenderResult =>{
   return render(ui, { wrapper: AllProviders, ...options });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
