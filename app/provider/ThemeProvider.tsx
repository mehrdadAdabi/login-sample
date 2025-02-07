"use client";
import { createContext, useState, useContext, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BaseButton } from "../components/base";

export const ThemeContext = createContext({
  toggleTheme: () => {},
  darkMode: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#bb86fc" : "#1976d2" },
      background: { default: darkMode ? "#121212" : "#ffffff" },
    },
    direction: "rtl",
    typography: {
      fontFamily: "Shabnam",
    },

    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            right: -100,
            textAlign: "right",
            transformOrigin: "top right",
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          dir: "rtl",
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BaseButton onClick={toggleTheme} className="!absolute top-3">
          تغییر تم
        </BaseButton>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
