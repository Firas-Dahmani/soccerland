import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_EMAIL_VERIFICATION_SEND_REQUEST,
    USER_EMAIL_VERIFICATION_SEND_FAIL,
    USER_RESET_PASSWORD_SEND_REQUEST,
    USER_RESET_PASSWORD_SEND_SUCCESS,
    USER_RESET_PASSWORD_SEND_FAIL,
} from './../constant/authConstant';

export const authLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            };

        case USER_LOGIN_SUCCESS:
            return {
                loading: false, userDATA: action.payload
            };

        case USER_LOGIN_FAIL:
            return {
                loading: false, error: action.payload
            };

        case USER_LOGOUT:
            return {};

        default:
            return state;
    }
}

export const authRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            };

        case USER_REGISTER_SUCCESS:
            return {
                loading: false, userInfo: action.payload
            };

        case USER_REGISTER_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const authEmailVerifReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_EMAIL_VERIFICATION_SEND_REQUEST:
            return {
                loading: true
            };

        case USER_EMAIL_VERIFICATION_SEND_FAIL:
            return {
                loading: false, error: action.error
            };

        default:
            return state;
    }
}

export const authResetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_SEND_REQUEST:
            return {
                loading: true
            };

        case USER_RESET_PASSWORD_SEND_SUCCESS:
            return {
                loading: false, message: action.payload
            };

        case USER_RESET_PASSWORD_SEND_FAIL:
            return {
                loading: false, error: action.error
            };

        default:
            return state;
    }
}