import { RootState } from './index';
import { createSelector } from '@reduxjs/toolkit';


const selectFormState = (state: RootState) => state.form;

export const selectSchemas = createSelector(
    [selectFormState],
    (formState) => formState.schemas
);

export const selectActiveFormId = createSelector(
    [selectFormState],
    (formState) => formState.activeFormId
);


export const selectActiveForm = createSelector(
    [selectSchemas, selectActiveFormId],
    (schemas, activeId) => {
        if (!activeId) return null;
        return schemas[activeId] || null;
    }
);

export const selectActiveFormFields = createSelector(
    [selectActiveForm],
    (form) => form?.fields ?? []
);
export const selectActiveFormTitle = createSelector(
    [selectActiveForm],
    (form) => form?.title ?? 'Untitled Form'
);


