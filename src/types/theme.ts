import type { ReactNode } from 'react';

export type ThemeSelection = 'light' | 'dark';

export interface ThemeState {
    theme: ThemeSelection;
}

export interface ThemeDispatch {
    toggleTheme: () => void;
    setTheme: (theme: ThemeSelection) => void;
}

export interface ThemeProviderProps {
    children: ReactNode;
}
