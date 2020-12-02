import { SUBMIT, ADD_FACE_BOX, USER_AUTH, USER_LOGOUT } from './constants';

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
    login: ''
};

export const setAuth = (state=initialStateAuthorization, action={}) => {
    switch(action.type) {
        case USER_AUTH:
            return {...state, login: action.payload, isAuthenticated: true};
        case USER_LOGOUT:
            return initialStateAuthorization;
        default:
            return state;
    }
}