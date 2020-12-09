import { SUBMIT, ADD_FACE_BOX, USER_AUTH, USER_LOGOUT, USER_UPDATE, INCORRECT, REGISTRATION, REGISTRATION_LEAVE } from './constants';

const initialStateSubmit = {
    imgURL: ''
};

export const setImgURL = (state=initialStateSubmit, action={}) => {
    switch(action.type) {
        case SUBMIT:
            return {...state, imgURL: action.payload};
        case USER_LOGOUT:
            return initialStateSubmit;
        default:
            return state;
    }
}

const initialStateFaceBox = {
    box: {}
};

export const setFaceBox = (state=initialStateFaceBox, action={}) => {
    switch(action.type) {
        case ADD_FACE_BOX:
            return {...state, box: action.payload};
        case USER_LOGOUT:
            return initialStateFaceBox;
        default:
            return state;
    }
}

const initialStateAuthorization = {
    isAuthenticated: false,
    user: {},
    isCorrect: true
};

export const setAuth = (state=initialStateAuthorization, action={}) => {
    switch(action.type) {
        case USER_AUTH:
            return {...state, isAuthenticated: true, user: action.payload, isCorrect: true};
        case USER_UPDATE:
            return {...state, user: action.payload};
        case USER_LOGOUT:
            return initialStateAuthorization;
        case INCORRECT:
            return {...state, isCorrect: false}
        default:
            return state;
    }
}

const initialStateRegistration = {
    isRegistration: false
};

export const register = (state=initialStateRegistration, action={}) => {
    switch(action.type) {
        case REGISTRATION:
            return {...state, isRegistration: true};
        case REGISTRATION_LEAVE:
            return {...state, isRegistration: false};
        case USER_LOGOUT:
            return initialStateRegistration;
        default:
            return state;
    }
}