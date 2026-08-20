import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: (theme: Theme) => {
        let resolved: 'dark' | 'light' = 'dark';
        if (theme === 'light') {
          resolved = 'light';
        } else if (theme === 'system') {
          resolved = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light' : 'dark';
        }
        set({ theme, resolvedTheme: resolved });
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', resolved);
        }
      },
    }),
    { name: 'secflow-theme' }
  )
);
