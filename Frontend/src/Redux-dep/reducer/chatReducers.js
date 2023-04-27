import {
    ACCEPT_DEMANDE_FAIL,
    ACCEPT_DEMANDE_REQUEST,
    ACCEPT_DEMANDE_SUCCESS,
    FETCH_DEMANDE_FAIL,
    FETCH_DEMANDE_REQUEST,
    FETCH_DEMANDE_SUCCESS
} from "../constant/chatConstant";

export const fetchReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_DEMANDE_REQUEST:
            return {
                loading: true
            };

        case FETCH_DEMANDE_SUCCESS:
            return {
                loading: false, Users: action.payload
            };

        case FETCH_DEMANDE_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const AcceptReducer = (state = {}, action) => {
    switch (action.type) {
        case ACCEPT_DEMANDE_REQUEST:
            return {
                loading: true
            };

        case ACCEPT_DEMANDE_SUCCESS:
            return {
                loading: false, success: action.payload
            };

        case ACCEPT_DEMANDE_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}