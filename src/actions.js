import { SUBMIT, ADD_FACE_BOX, USER_AUTH, USER_LOGOUT, USER_UPDATE, INCORRECT, REGISTRATION, REGISTRATION_LEAVE } from './constants';

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

export const userAuthorization = (user) => {
    return {
        type: USER_AUTH,
        payload: user
    };
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT,
        payload: ''
    }
}

export const updateUser = (user) => {
    return {
        type: USER_UPDATE,
        payload: user
    }
}

export const incorrectData = () => {
    return {
        type: INCORRECT,
        payload: ''
    }
}

export const userRegistration = () => {
    return {
        type: REGISTRATION,
        payload: ''
    }
}

export const leaveRegistration = () => {
    return {
        type: REGISTRATION_LEAVE,
        payload: ''
    }
}
