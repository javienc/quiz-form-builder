
import { useThemeState } from '../../hooks/useTheme';
import { useSelector, useDispatch } from 'react-redux';
import { useEditorState, useEditorDispatch } from '../../context/EditorStateContext';
import { updateField, deleteField } from '../../store/formSlice';
import { selectActiveFormId, selectActiveForm } from '../../store/selectors';

export function FormCanvas() {
    const activeFormId = useSelector(selectActiveFormId);
    const form = useSelector(selectActiveForm);
    const dispatch = useDispatch();

    const { focusedFieldId } = useEditorState();
    const { theme } = useThemeState();
    const { setFocusedFieldId } = useEditorDispatch();

    if (!form) {
        return <div>Loading form...</div>;
    }

    const canvasBg = theme === 'light' ? '#f0f0f0' : '#444';

    return (
        <div style={{ flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: canvasBg }}>
            <div style={{ maxWidth: '800px', color: 'black', padding: '40px', margin: '0 auto', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '500px' }}>
                <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                    {form.title}
                </h2>

                {form.fields.length === 0 && (
                    <p style={{ padding: '40px', border: '2px dashed #ddd', textAlign: 'center', color: '#999' }}>
                        Form empty. Add a field from the top right header.
                    </p>
                )}

                {form.fields.map(field => (
                    <div
                        key={field.id}
                        onClick={() => setFocusedFieldId(field.id)}
                        className={`p-4 mb-4 border rounded relative group transition-all ${focusedFieldId === field.id
                            ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >

                        <div className="flex items-center justify-between mb-2">
                            <input
                                value={field.label}
                                onChange={(e) => dispatch(updateField({
                                    formId: activeFormId!,
                                    fieldId: field.id,
                                    updates: { label: e.target.value }
                                }))}

                                className="font-bold bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none px-1 py-0.5 w-full mr-4"
                                placeholder="Field Label"
                            />

                            <div className="flex items-center gap-2 opacity-100 transition-opacity">
                                <label className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) => dispatch(updateField({
                                            formId: activeFormId!,
                                            fieldId: field.id,
                                            updates: { required: e.target.checked }
                                        }))}
                                    />
                                    Req
                                </label>

                                <button
                                    className="text-gray-400 hover:text-blue-500"
                                    title="Field Info"
                                >
                                    ℹ️
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(deleteField({ formId: activeFormId!, fieldId: field.id }));
                                    }}
                                    className="text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50"
                                    title="Delete Field"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>

                        <div className="opacity-75 pointer-events-none">
                            {field.type === 'text' && (
                                <input disabled placeholder="Input text..." className="w-full p-2 border rounded bg-white" />
                            )}
                            {field.type === 'checkbox' && (
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" disabled /> <span>Checkbox option</span>
                                </div>
                            )}
                            {field.type === 'dropdown' && (
                                <select disabled className="w-full p-2 border rounded bg-white">
                                    <option>Select option</option>
                                </select>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
