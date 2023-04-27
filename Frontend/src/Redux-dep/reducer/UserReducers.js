import {
    ACCEPTER_GROUP_FAIL,
    ACCEPTER_GROUP_REQUEST,
    ACCEPTER_GROUP_SUCCESS,
    DEMANDE_GROUP_FAIL,
    DEMANDE_GROUP_REQUEST,
    DEMANDE_GROUP_SUCCESS,
    GET_STADE_FAIL,
    GET_STADE_REQUEST,
    GET_STADE_SUCCESS,
    REJETER_GROUP_FAIL,
    REJETER_GROUP_REQUEST,
    REJETER_GROUP_SUCCESS,
    RESERVER_ADD_FAIL,
    RESERVER_ADD_REQUEST,
    RESERVER_ADD_SUCCESS,
    RESERVER_CANCEL_FAIL,
    RESERVER_CANCEL_REQUEST,
    RESERVER_CANCEL_SUCCESS,
    SEARCH_GROUP_FAIL,
    SEARCH_GROUP_REQUEST,
    SEARCH_GROUP_SUCCESS,
    SEARCH_STADE_FAIL,
    SEARCH_STADE_REQUEST,
    SEARCH_STADE_SUCCESS,
} from "../constant/UserConstant";



export const SearchSatdeReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_STADE_REQUEST:
            return {
                loading: true
            };

        case SEARCH_STADE_SUCCESS:
            return {
                loading: false, Stade: action.payload
            };

        case SEARCH_STADE_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const getStadeReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_STADE_REQUEST:
            return {
                loading: true
            };

        case GET_STADE_SUCCESS:
            return {
                loading: false, stade: action.payload
            };

        case GET_STADE_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const AddReservationUserReducer = (state = {}, action) => {
    switch (action.type) {
        case RESERVER_ADD_REQUEST:
            return {
                loading: true
            };

        case RESERVER_ADD_SUCCESS:
            return {
                loading: false, reservation: action.payload
            };

        case RESERVER_ADD_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const CancelReservationReducer = (state = {}, action) => {
    switch (action.type) {
        case RESERVER_CANCEL_REQUEST:
            return {
                loading: true
            };

        case RESERVER_CANCEL_SUCCESS:
            return {
                loading: false, Success: true
            };

        case RESERVER_CANCEL_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const SearchGroupReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_GROUP_REQUEST:
            return {
                loading: true
            };

        case SEARCH_GROUP_SUCCESS:
            return {
                loading: false, Groups: action.payload
            };

        case SEARCH_GROUP_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const AccepterGroupReducer = (state = {}, action) => {
    switch (action.type) {
        case ACCEPTER_GROUP_REQUEST:
            return {
                loading: true
            };

        case ACCEPTER_GROUP_SUCCESS:
            return {
                loading: false, success: action.payload
            };

        case ACCEPTER_GROUP_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const RejeterGroupReducer = (state = {}, action) => {
    switch (action.type) {
        case REJETER_GROUP_REQUEST:
            return {
                loading: true
            };

        case REJETER_GROUP_SUCCESS:
            return {
                loading: false, success: action.payload
            };

        case REJETER_GROUP_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}

export const DemandeGroupReducer = (state = {}, action) => {
    switch (action.type) {
        case DEMANDE_GROUP_REQUEST:
            return {
                loading: true
            };

        case DEMANDE_GROUP_SUCCESS:
            return {
                loading: false, success: action.payload
            };

        case DEMANDE_GROUP_FAIL:
            return {
                loading: false, error: action.payload
            };

        default:
            return state;
    }
}