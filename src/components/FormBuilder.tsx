import { useThemeState } from '../hooks/useTheme';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addForm,
    selectForm,
    pushField,
    FormField
} from '../store/formSlice';
import { selectActiveFormId } from '../store/selectors';
import { EditorStateProvider } from '../context/EditorStateContext';

import { FormCanvas } from './form-builder/FormCanvas';
import { FormPreview } from './form-builder/FormPreview';

export function FormBuilder({ onPrev }: { onPrev: () => void }) {

    const { theme } = useThemeState();
    const dispatch = useDispatch();

    const [mode, setMode] = useState<'edit' | 'preview'>(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('mode') === 'preview' ? 'preview' : 'edit';
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (mode === 'preview') {
            params.set('mode', 'preview');
        } else {
            console.log('mode', mode);
            params.delete('mode');

        }
        const newUrl = `?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);

    }, [mode]);

    const activeFormId = useSelector(selectActiveFormId);

    useEffect(() => {

        if (!activeFormId) {
            dispatch(addForm({ id: 'default-form', title: 'My Form' }));
            dispatch(selectForm('default-form'));
        }

    }, [dispatch, activeFormId]);

    const handleAddField = (type: FormField['type']) => {

        if (!activeFormId) return;
        dispatch(pushField({
            formId: activeFormId,
            field: {
                id: crypto.randomUUID(),
                type,
                label: `New ${type}`,
                required: false
            }
        }));
    };

    const containerStyle = {
        color: theme === 'light' ? '#000' : '#fff',
        backgroundColor: theme === 'light' ? '#fff' : '#222',
    };

    const headerStyle = {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 20px',
        borderBottom: '1px solid #ccc',
        backgroundColor: theme === 'light' ? '#f8f8f8' : '#222'
    };

    return (
        <EditorStateProvider>
            <div style={containerStyle}>
                <header style={headerStyle}>
                    <div className="flex items-center gap-4">
                        <button onClick={onPrev} className="text-gray-500 hover:text-gray-900 dark:text-gray-300">
                            ← Back
                        </button>
                        <span className="h-6 w-px bg-gray-300 mx-2">|</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMode('edit')}
                                className={`px-3 py-1 rounded ${mode === 'edit' ? 'bg-blue-100 text-blue-700' : ''}`}
                            >
                                Editor
                            </button>
                            <button
                                onClick={() => setMode('preview')}
                                className={`px-3 py-1 rounded ${mode === 'preview' ? 'bg-blue-100 text-blue-700' : ''}`}
                            >
                                Preview
                            </button>
                        </div>
                    </div>

                    {mode === 'edit' && (
                        <div className="flex gap-2">
                            <span className="self-center mr-2 font-bold">Add Field:</span>
                            <button onClick={() => handleAddField('text')} className="bg-white border hover:bg-gray-50 px-2 py-1 rounded text-sm text-black">Text</button>
                            <button onClick={() => handleAddField('checkbox')} className="bg-white border hover:bg-gray-50 px-2 py-1 rounded text-sm text-black">Checkbox</button>
                            <button onClick={() => handleAddField('dropdown')} className="bg-white border hover:bg-gray-50 px-2 py-1 rounded text-sm text-black">Dropdown</button>
                        </div>
                    )}
                </header>

                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    {mode === 'edit' ? (
                        <FormCanvas />
                    ) : (
                        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f0f0f0' }}>
                            <FormPreview />
                        </div>
                    )}
                </div>
            </div>
        </EditorStateProvider>
    )
}
