import { useState, useMemo, useCallback, createContext } from 'react';
import type { ThemeState, ThemeDispatch, ThemeSelection, ThemeProviderProps } from '../types/theme';

export const ThemeReadContext = createContext<ThemeState | null>(null);
export const ThemeDispatchContext = createContext<ThemeDispatch | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeSelection>('light');

    const toggleThemeAction = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    const setThemeAction = useCallback((newTheme: ThemeSelection) => {
        setTheme(newTheme);
    }, []);

    // Memoize State
    const themeState = useMemo(() => ({
        theme
    }), [theme]);

    // Memoize Actions
    const ThemeDispatch = useMemo(() => ({
        toggleTheme: toggleThemeAction,
        setTheme: setThemeAction
    }), [toggleThemeAction, setThemeAction]);

    return (
        <ThemeReadContext.Provider value={themeState}>
            <ThemeDispatchContext.Provider value={ThemeDispatch}>
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeReadContext.Provider>
    );
}
