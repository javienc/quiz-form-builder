import { useThemeState } from '../hooks/useTheme'

export function FormBuilder({ onPrev }: { onPrev: () => void }) {

    const { theme } = useThemeState();

    const customStyle = {
        color: theme === 'light' ? '#000' : '#fff',
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        transition: 'all 0.1s ease-in-out',
        padding: '20px',
    };

    return (
        <div style={customStyle}>
            <button onClick={onPrev} style={{ marginBottom: '20px' }}>← Back to Home</button>
            <h1>Exercise B: Redux Form Builder</h1>
        </div>
    )
}
