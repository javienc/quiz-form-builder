
import { ThemeProvider } from './context/ThemeContext'
import { useThemeState, useThemeDispatch } from './hooks/useTheme'
import { createRoot } from 'react-dom/client'
import { StrictMode, useEffect, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'

import './index.css'

// Exercise A
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
            <button style={{ marginTop: '5px' }} className="px-2 py-1 bg-blue-500 text-white rounded" onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}

// Exercise B
import { FormBuilder } from './components/FormBuilder'

function useViewMode() {
    const [view, setView] = useState<'home' | 'form'>(() => {

        const params = new URLSearchParams(window.location.search);
        return params.get('view') === 'form' ? 'form' : 'home';
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (view === 'form') {
            params.set('view', 'form');
        } else {
            params.delete('view');
        }

        console.log(params.toString());
        const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

        window.history.pushState({}, '', newUrl);
        console.log(newUrl);
    }, [view]);

    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setView(params.get('view') === 'form' ? 'form' : 'home');
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return { view, setView };
}



function HomeView({ onNavigate }: { onNavigate: () => void }) {
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

            {/* Link to Exercise B */}
            <h1 style={{ textAlign: 'center' }}>Exercise B: Form Builder</h1>
            <div style={{ margin: '20px', padding: '5px', border: '1px solid black' }}>
                <button
                    onClick={onNavigate}
                    style={{ marginTop: '5px' }} className="px-2 py-1 bg-green-500 text-white rounded"
                >
                    Go to Form Builder
                </button>

            </div>
        </div>
    );
}


export function App() {
    const { view, setView } = useViewMode();

    return (
        <StrictMode>
            <ReduxProvider store={store}>
                <ThemeProvider>
                    {view === 'home' ? (
                        <HomeView onNavigate={() => setView('form')} />
                    ) : (
                        <FormBuilder onPrev={() => setView('home')} />
                    )}
                </ThemeProvider>
            </ReduxProvider>
        </StrictMode>
    )
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = createRoot(rootElement)
    root.render(<App />)
}
