import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import { Appearance } from "react-native";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    deviceColorScheme === "dark"
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("themePreference");
        if (storedTheme !== null) {
          setIsDarkMode(storedTheme === "dark");
        }
      } catch (error) {
        console.error("Failed to load theme preference", error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(
          "themePreference",
          isDarkMode ? "dark" : "light"
        );
      } catch (error) {
        console.error("Failed to save theme preference", error);
      }
    };

    saveTheme();
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (value: boolean) => {
    setIsDarkMode(value);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
