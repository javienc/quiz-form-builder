import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: FormState = {
    schemas: {
        'default-form': {
            id: 'default-form',
            title: 'My Form',
            fields: [],
            lastModified: Date.now(),
        }
    },
    activeFormId: null,
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addForm: (state, action: PayloadAction<{ id: string; title: string }>) => {
            state.schemas[action.payload.id] = {
                id: action.payload.id,
                title: action.payload.title,
                fields: [],
                lastModified: Date.now(),
            };
        },
        selectForm: (state, action: PayloadAction<string>) => {
            state.activeFormId = action.payload;
        },
        pushField: (state, action: PayloadAction<{ formId: string; field: FormField }>) => {
            const form = state.schemas[action.payload.formId];
            if (form) {
                form.fields.push(action.payload.field);
                form.lastModified = Date.now();
            }
        },
        renameForm: (state, action: PayloadAction<{ formId: string; title: string }>) => {
            const form = state.schemas[action.payload.formId];
            if (form) {
                form.title = action.payload.title;
                form.lastModified = Date.now();
            }
        },
        updateField: (state, action: PayloadAction<{ formId: string; fieldId: string; updates: Partial<FormField> }>) => {
            const form = state.schemas[action.payload.formId];
            if (form) {
                const fieldIndex = form.fields.findIndex(f => f.id === action.payload.fieldId);
                if (fieldIndex !== -1) {
                    form.fields[fieldIndex] = { ...form.fields[fieldIndex], ...action.payload.updates };
                    form.lastModified = Date.now();
                }
            }
        },
        deleteField: (state, action: PayloadAction<{ formId: string; fieldId: string }>) => {
            const form = state.schemas[action.payload.formId];
            if (form) {
                form.fields = form.fields.filter(f => f.id !== action.payload.fieldId);
                form.lastModified = Date.now();
            }
        }
    },
});



export const {
    addForm,
    selectForm,
    pushField,
    renameForm,
    updateField,
    deleteField
} = formSlice.actions;

export default formSlice.reducer;


export interface FormField {
    id: string;
    type: 'text' | 'checkbox' | 'dropdown';
    label: string;
    required: boolean;
    options?: string[];
}

export interface FormSchema {
    id: string;
    title: string;
    fields: FormField[];
    lastModified: number;
}

export interface FormState {
    schemas: Record<string, FormSchema>;
    activeFormId: string | null;
}