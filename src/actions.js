import { SUBMIT, ADD_FACE_BOX, USER_AUTH, USER_LOGOUT } from './constants';

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

export const userAuthorization = (login) => {
    return {
        type: USER_AUTH,
        payload: login
    };
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT,
        payload: ''
    }
}