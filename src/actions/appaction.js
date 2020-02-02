import { LOAD_FORM_DATA, UPDATE_FIELD_VALUE } from "../constants/actions";

export const loadFormData = (data) => ({
    type: LOAD_FORM_DATA,
    data
});

export const updateFieldValue = (data) => ({
    type: UPDATE_FIELD_VALUE,
    data
});