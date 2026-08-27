import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light" | "system";

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
}

export const useThemeStore = create<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },
    }),
    { name: "almashareq-theme" },
  ),
);

// Initialize on load
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("almashareq-theme");
  const parsed = stored ? JSON.parse(stored) : null;
  const theme: Theme = parsed?.state?.theme || "system";
  applyTheme(theme);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const current = useThemeStore.getState().theme;
      if (current === "system") applyTheme("system");
    });
}
