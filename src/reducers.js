import { SUBMIT, ADD_FACE_BOX } from './constants';

const initialStateSubmit = {
    imgURL: ''
};

export const setImgURL = (state=initialStateSubmit, action={}) => {
    switch(action.type) {
        case SUBMIT:
            return {...state, imgURL: action.payload};
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
        default:
            return state;
    }
}