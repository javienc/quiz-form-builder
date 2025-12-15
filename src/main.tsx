
import { ThemeProvider } from './context/ThemeContext'
import { useThemeState, useThemeDispatch } from './hooks/useTheme'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import './index.css'

function ThemeDisplay() {
    const { theme } = useThemeState();
    return (
        <div style={{ margin: '20px', padding: '5px', border: '1px solid black' }}>
            <h3>Theme Display Component Demo</h3>
            <h4 style={{ marginTop: '5px' }}>Current Theme: <b>{theme}</b></h4>
        </div>
    );
}

function ThemeToggler() {
    const { toggleTheme } = useThemeDispatch();
    return (
        <div style={{ margin: '20px', padding: '5px', border: '1px solid black' }}>
            <h3>Theme Toggler Component</h3>
            <button style={{ marginTop: '5px' }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}

function AppContent() {
    const { theme } = useThemeState();

    const customStyle = {
        color: theme === 'light' ? '#000' : '#fff',
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        transition: 'all 0.1s ease-in-out',
        padding: '20px',
        minHeight: '100vh',
    };

    return (
        <div style={customStyle}>
            <h1 style={{ textAlign: 'center' }}>Exercise A: Theme Manager</h1>
            <ThemeDisplay />
            <ThemeToggler />
        </div>
    );
}


export function App() {
    return (
        <StrictMode>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </StrictMode>
    )
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = createRoot(rootElement)
    root.render(<App />)
}
