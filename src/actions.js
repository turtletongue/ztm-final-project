import { SUBMIT, ADD_FACE_BOX } from './constants';

export const buttonSubmit = (text) => {
    return {
        type: SUBMIT,
        payload: text
    };
}

export const addingFaceBox = (box) => {
    return {
        type: ADD_FACE_BOX,
        payload: box
    };
}