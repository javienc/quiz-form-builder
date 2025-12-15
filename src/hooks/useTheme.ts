import { useContext } from 'react';
import type { ThemeState, ThemeDispatch } from '../types/theme';
import { ThemeReadContext, ThemeDispatchContext } from '../context/ThemeContext';

export function useThemeState(): ThemeState {
    const context = useContext(ThemeReadContext);

    if (!context) {
        throw new Error('no state context');
    }

    return context;
}

export function useThemeDispatch(): ThemeDispatch {
    const context = useContext(ThemeDispatchContext);

    if (!context) {
        throw new Error('no dispatch context');
    }

    return context;
}
