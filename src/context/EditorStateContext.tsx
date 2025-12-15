import {
    createContext,
    useContext,
    useState,
    useMemo,
    ReactNode
} from 'react';

const EditorStateContext = createContext<EditorState | null>(null);
const EditorDispatchContext = createContext<EditorActions | null>(null);

export function EditorStateProvider({ children }: { children: ReactNode }) {

    const [focusedFieldId, setFocusedFieldId] = useState<string | null>(null);
    const state = useMemo(() => ({ focusedFieldId }), [focusedFieldId]);

    const actions = useMemo(() => ({
        setFocusedFieldId
    }), []);

    return (
        <EditorStateContext.Provider value={state}>
            <EditorDispatchContext.Provider value={actions}>
                {children}
            </EditorDispatchContext.Provider>
        </EditorStateContext.Provider>
    );
}

export function useEditorState() {
    const context = useContext(EditorStateContext);
    if (!context) throw new Error('no state context');
    return context;
}

export function useEditorDispatch() {
    const context = useContext(EditorDispatchContext);
    if (!context) throw new Error('no dispatch context');
    return context;
}



interface EditorState {
    focusedFieldId: string | null;
}

interface EditorActions {
    setFocusedFieldId: (id: string | null) => void;
}