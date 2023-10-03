import { createContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  SwitchTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (localStorage.getItem("color-theme"))
      setTheme(localStorage.getItem("color-theme") as Theme);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function SwitchTheme() {
    // if set via local storage previously
    let localTheme: Theme = ["light", "dark"].includes(
      localStorage.getItem("color-theme") || ""
    )
      ? (localStorage.getItem("color-theme") as Theme)
      : "light";

    localTheme = localTheme === "dark" ? "light" : "dark";

    localStorage.setItem("color-theme", localTheme);
    setTheme(localTheme);
  }
  return (
    <ThemeContext.Provider value={{ theme, SwitchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
