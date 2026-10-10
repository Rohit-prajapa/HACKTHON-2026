import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("treasury-pulse-theme");

    document.documentElement.dataset.theme =
      savedTheme === "light" ? "light" : "dark";
  }, []);

  return null;
}
